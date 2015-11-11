angular.module('admin', [])
.controller('AdminController', function ($scope, $http) {
	$scope.db = {
		slides: [
			{
				url: 'slides/1.png',
				interval: 1
			},
			{
				url: 'slides/2.jpg',
				interval: 3
			},
			{
				url: 'slides/3.jpg',
				interval: 1
			}
		]
	};
});