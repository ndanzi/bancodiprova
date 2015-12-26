'use strict';

/**
 * @ngdoc function
 * @name provaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the provaApp
 */
angular.module('provaApp')
  .controller('MainCtrl',["$scope", "Auth", 'filepickerService', '$window', 'Ref', '$firebaseArray', '$timeout',
    function($scope, Auth, filepickerService, $window, Ref, $firebaseArray, $timeout) {
      $scope.auth = Auth;

      // any time auth status updates, add the user data to scope
      $scope.auth.$onAuth(function(authData) {
        $scope.authData = authData;
        console.log(authData);
      });

      $scope.files = $firebaseArray(Ref.child('images'));

      $scope.articoli = $firebaseArray(Ref.child('articles'));

      $scope.files.$loaded(function(evento) {
        console.log(evento);
        $timeout($('.slider').slider({full_width: true}), 1000);
      });

      console.log($scope.files);

      $scope.pickFile = pickFile;

      $scope.onSuccess = onSuccess;

      $scope.aggiungiArticolo = function() {
        $scope.articoli.$add($scope.testo);
      }

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
        $scope.files.$add(Blob)
      };
    }
  ]);
