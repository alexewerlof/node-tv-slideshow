angular.module('admin', [])
.controller('AdminController', function ($scope, $http) {
	$scope.load = function () {
		$http.get('/api/db').success(function (db) {
			$scope.db = db;
		})
	}
	
	$scope.save = function () {
		alert('Cannot!');
	}
});