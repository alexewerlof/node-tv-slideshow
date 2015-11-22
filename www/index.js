angular.module('app', ['ngAnimate'])
.controller('IndexController', function ($scope, $http, $timeout) {

  // The default interval for all slides
  $scope.defaultInterval = 1000;
  // The interval for refreshing the whole page to invalidate the cache
  $scope.refreshInterval = 60000;
  $scope.index = 0;

  function changeSlide() {
    if (($scope.index + 1) >= $scope.slides.length) {
      $scope.index = 0;
    } else {
      $scope.index++;
    }
    $timeout(changeSlide, $scope.defaultInterval);
  }

  setTimeout(function () {
    window.location.reload(true);
  }, $scope.refreshInterval);

  $http.get('/api/db').success(function (response) {
    $scope.defaultInterval = response.defaultInterval;
    $scope.refreshInterval = response.refreshInterval;
    $scope.slides = response.slides;
    changeSlide();
  });

});
