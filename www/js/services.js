angular.module('starter.services', [])

/**
 * Service containing methods to login or signup a user.
 * @param $q
 */
.service('AuthService', function($q) {

    var ref = new Firebase("https://hopsa.firebaseio.com");

    var deferred = $q.defer();
    var promise = deferred.promise;

    return {
        loginUser: function(email, pw) { 
            if (!email) {
                deferred.reject("Please enter an email.");
            } else if (!pw) {
                deferred.reject("Please enter a password.");
            } else {
                ref.authWithPassword({
                    email : email,
                    password : pw
                }, function(error, authData) {
                    if (error) {
                        deferred.reject("Login Failed.");
                    } else {
                        deferred.resolve("Welcome " + email + "!");
                    }
                });
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },
        loginUserFacebook: function() {
            ref.authWithOAuthPopup("facebook", function(error, authData) {
                if (error) {
                    deferred.reject("Login Failed.");
                } else {
                    deferred.resolve("Welcome " + authData + "!");
                }
            });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },
        createUser: function(email, pw) {
            if (!email) {
                deferred.reject("Please enter an email.");
            } else if (!pw) {
                deferred.reject("Please enter a password.");
            } else {
                ref.createUser({
                    email    : email,
                    password : pw
                }, function(error, userData) {
                    if (error) {
                        deferred.reject("Signup Failed.");
                    } else {
                        deferred.resolve("Successfully created user account with uid: " + userData.uid);
                    }
                });
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

/**
 * Collection of events, stored in Firebase
 * @param $firebaseArray
 */
.factory('Events', function($firebaseArray) {
    // Acces events stored in Firebase
    var events = new Firebase("https://hopsa.firebaseio.com/events");
    return $firebaseArray(events);
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});

