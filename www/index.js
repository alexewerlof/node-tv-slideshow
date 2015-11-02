angular.module('app', [])
.controller('IndexController', function ($scope, $http, $timeout) {
  $http.get('/api/slides').success(function (slides) {
    $scope.slides = slides;
    changeSlide();
  });

  var INTERVAL = 1000;
  var index = 0;
  $scope.getCurrentSlide = function () {
    return $scope.slides ? 'url(slides/' + $scope.slides[index] + ')' : '';
  }
  function changeSlide() {
    index++;
    if (index >= $scope.slides.length) {
      index = 0;
    }
    $timeout(changeSlide, INTERVAL);
  }
});
