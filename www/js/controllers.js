angular.module('starter.controllers', ['ui.router', 'ionic'])

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
 
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.map');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed.',
                template: 'Please check your credentials.'
            });
        });
    }

    $scope.signup = function() {
        LoginService.createUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.map');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed.',
                template: 'Please check your credentials.'
            });
        });
    }
})

.controller('MapCtrl', function($state, $scope, $ionicLoading) {
    $scope.newPSA = function() {
        console.log("transferring")
        $state.go('addPSA')
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

.controller('EventsCtrl', function($scope, Events) {
    $scope.events = Events.all();
    $scope.remove = function(event) {
        Events.remove(event);
    }
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