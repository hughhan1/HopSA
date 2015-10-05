angular.module('starter.controllers', ['ui.router', 'ionic'])

/**
 * Controller for the login view. On a successful login, this redirects to the tab-map view.
 * @param $scope
 * @param $state
 * @param $ionicPopup
 * @param AuthService authentication service that sends and retrieves data from a Firebase collection of users
 */
.controller('SignupCtrl', function($scope, $state, $ionicPopup, AuthService) {
    $scope.data = {};

    $scope.signup = function() {
        AuthService.createUser(
            $scope.data.firstName, 
            $scope.data.lastName, 
            $scope.data.email, 
            $scope.data.password
        ).success(function(data) {
            $state.go('tab.map');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed.',
                template: 'Please check your credentials.'
            });
        });
    }

    $scope.signupFacebook = function() {
        AuthService.loginUserFacebook().success(function(data) {
            $state.go('tab.map');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed.',
                template: 'Please check your credentials.'
            });
        });
    }

    $scope.login = function() {
        $state.go('login');
    }
})

/**
 * Controller for the login view. On a successful login, this redirects to the tab-map view.
 * @param $scope
 * @param $state
 * @param $ionicPopup
 * @param AuthService
 */
.controller('LoginCtrl', function($scope, $state, $ionicPopup, AuthService) {
    $scope.data = {};
 
    $scope.login = function() {
        AuthService.loginUser($scope.data.email, $scope.data.password).success(function(data) {
            $state.go('tab.map');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed.',
                template: 'Please check your credentials.'
            });
        });
    }

    $scope.loginFacebook = function() {
        AuthService.loginUserFacebook().success(function(data) {
            $state.go('tab.map');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed.',
                template: 'Please check your credentials.'
            });
        });
    }

    $scope.signup = function() {
        $state.go('signup');
    }
})

/**
 * Controller for the tab-map view. This is a map with all of the existing events.
 * @param $scope
 * @param $state
 * @param $ionicLoading
 * @param Events reference to a collection of events from Firebase
 */
.controller('MapCtrl', function($scope, $state, $ionicLoading, Events) {

    $scope.events = Events;

    $scope.addEvent = function() {
        var name = prompt("Create an event.");
        var description = prompt("Add a description.");
        if (name) {
            $scope.events.$add({
                "name": name,
                "description": description
            });
        }
    }

    $scope.remove = function(eventId) {
        Events.remove(eventId);
    }

    $scope.mapCreated = function(map) {
        $scope.map = map;
    };

    $scope.centerOnMe = function () {
        console.log("Centering");
        if (!$scope.map) {
            return;
        }

        $scope.loading = $ionicLoading.show({
            content: 'Getting current location...',
            showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function (pos) {
            console.log('Got pos', pos);
            $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            $scope.loading.hide();
        }, function (error) {
            alert('Unable to get location: ' + error.message);
        });
    };
})

/**
 * Controller for the tab-events view. This is a list of all of the existing events.
 * @param $scope
 * @param Events reference to a collection of events from Firebase
 */
.controller('ListCtrl', function($scope, Events) {

    $scope.events = Events;

    $scope.addEvent = function() {
        var name = prompt("Create an event.");
        var description = prompt("Add a description.");
        if (name) {
            $scope.events.$add({
                "name": name,
                "description": description
            });
        }
    }

    $scope.remove = function(event) {
        Events.remove(event);
    }
})

.controller('EventDetailCtrl', function($scope, $stateParams, Events) {
    $scope.events = Events;
    $scope.event = Events.get($stateParams.eventId);
})

.controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    // $scope.$on('$ionicView.enter', function(e) {
    // });

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});