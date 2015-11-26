angular.module('app', ['ngAnimate'])
.controller('IndexController', function ($scope, $http, $timeout) {

  var INTERVAL = 4000;
  $scope.index = 0;

  function changeSlide() {
    if (($scope.index + 1) >= $scope.slides.length) {
      $scope.index = 0;
    } else {
      $scope.index++;
    }
    $timeout(changeSlide, INTERVAL);
  }

  $scope.changeSlide = changeSlide;

  // Refresh the whole page every 10s invalidating the cache
  setTimeout(function () {
    window.location.reload(true);
  }, 10000);

  $http.get('/api/db').success(function (response) {
    $scope.slides = response.slides;
    changeSlide();
  });

});
