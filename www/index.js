angular.module('app', ['ngAnimate'])
.controller('IndexController', function ($scope, $http, $timeout) {

  // The default interval for all slides
  $scope.defaultInterval = 10000;
  // The interval for refreshing the whole page to invalidate the cache
  $scope.refreshInterval = 60000;
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

  // Refresh the whole page every 10s invalidating the cache
  $timeout(function () {
    window.location.reload(true);
  }, $scope.refreshInterval);

  $http.get('/slides').success(function (slides) {
    $scope.slides = slides;
    $scope.changeSlide();
  });

});
