'use strict';

/**
 * @ngdoc function
 * @name provaApp.controller:ScegliimmaginectrlCtrl
 * @description
 * # ScegliimmaginectrlCtrl
 * Controller of the provaApp
 */
angular.module('provaApp')
  .controller('ScegliimmaginectrlCtrl', ['$scope', 'articoliParse', '$modalInstance', 'filepickerService',
    function ($scope, articoliParse, $modalInstance, filepickerService) {
      articoliParse.getAllImages().success(function(data) {
        $scope.immagini = data.results;
        console.log('immagini', $scope.immagini)
      })

      $scope.pickFile = pickFile;

      $scope.onSuccess = onSuccess;

      function pickFile(){
        filepickerService.pick(
          {
            mimetype: 'image/*',
            language: 'it',
            cropRatio: 16/9,
            cropForce: true
          },
          onSuccess
        );
      };

      function onSuccess(Blob){
        console.log(Blob);
        articoliParse.insertImage(Blob);
        articoliParse.getAllImages().success(function(data) {
          $scope.immagini = data.results;
          console.log('images', $scope.immagini)
        })
      };

      $scope.sescelta = false;
      $scope.scelta = {};
      $scope.choose = function(immagine) {
        $scope.scelta = immagine;
        $scope.sescelta = true;
        console.log($scope.scelta);
      }

      var params = $modalInstance.params; // get from the params in the options

      $scope.ok = function() {
        console.log($scope.scelta);
        $modalInstance.close($scope.scelta);
      }
       // resolve the promise
      //$modalInstance.dismiss('reason') // rejects the promise
    }]);
