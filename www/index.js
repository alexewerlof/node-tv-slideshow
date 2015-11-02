angular.module('app', [])
.controller('IndexController', function ($scope, $http) {
  $scope.foo = 'bars';
  $http.get('/api/slides')
  .success(function (slides) {
    $scope.foo = slides;
  });
});
