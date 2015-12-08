// Refresh the whole page every 10s invalidating the cache
setTimeout(function () {
  window.location.reload(true);
}, 60000);

angular.module('app', ['ngAnimate'])
.controller('IndexController', function ($scope, $http, $timeout) {

  // The default interval for all slides
  $scope.defaultInterval = 10000;
  $scope.index = 0;

  var currentTimeout;

  $scope.changeSlide = function () {
    if (currentTimeout) {
      $timeout.cancel(currentTimeout);
    }
    if (($scope.index + 1) >= $scope.slides.length) {
      $scope.index = 0;
    } else {
      $scope.index++;
    }
    currentTimeout = $timeout($scope.changeSlide, $scope.defaultInterval);
  };

  $http.get('/slides').success(function (slides) {
    $scope.slides = slides;
    $scope.changeSlide();
  });

});
