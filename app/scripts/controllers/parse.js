'use strict';

/**
 * @ngdoc function
 * @name provaApp.controller:ParseCtrl
 * @description
 * # ParseCtrl
 * Controller of the provaApp
 */
angular.module('provaApp')
  .controller('ParseCtrl', ['$scope', 'articoliParse', function ($scope, articoliParse) {

  	articoliParse.getAll().success(function(data) {
  		$scope.articoli = data.results;
  	})

  	$scope.salvaArticolo = function() {
  		articoliParse.create($scope.articolo).success(function(data) {
  			console.log(data);
  		});
  	}

  }]);
