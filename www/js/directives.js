angular.module('starter.directives', [])

/**
 * Mapbox
 */
.directive('map', function() {
    return {
        restrict: 'E',
        scope: {
            onCreate: '&'
        },
        link: function ($scope, $element, $attr) {
            function initialize() {

                L.mapbox.accessToken = 'pk.eyJ1IjoiaHVnaGhhbiIsImEiOiJjaWVtemZrZDEwM3VxczNrbWhmc3o3aHh5In0.GeKnNHzx-LbLOK7c-y22Qg';

                // Set coordinates to Johns Hopkins University
                var map = L.mapbox.map($element[0], 'mapbox.emerald')
                    .setView([39.3289, -76.6203], 15);
  
                $scope.onCreate({map: map});

                // Stop the side bar from dragging when mousedown/tapdown on the map
                L.DomEvent.addListener($element[0], 'mousedown', function (e) {
                    e.preventDefault();
                    return false;
                });

            }

            if (document.readyState === "complete") {
                initialize();
            } else {
                L.DomEvent.addListener(window, 'load', initialize);
            }
        }
    }
});

/**
 * Google Maps
 *
.directive('map', function() {
    return {
        restrict: 'E',
        scope: {
            onCreate: '&'
        },
        link: function ($scope, $element, $attr) {
            function initialize() {
                var mapOptions = {
                    center: new google.maps.LatLng(43.07493, -89.381388),
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map($element[0], mapOptions);
  
                $scope.onCreate({map: map});

                // Stop the side bar from dragging when mousedown/tapdown on the map
                google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
                    e.preventDefault();
                    return false;
                });
            }

            if (document.readyState === "complete") {
                initialize();
            } else {
                google.maps.event.addDomListener(window, 'load', initialize);
            }
        }
    }
});
*/
