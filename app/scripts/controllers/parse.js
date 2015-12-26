'use strict';

/**
 * @ngdoc function
 * @name provaApp.controller:ParseCtrl
 * @description
 * # ParseCtrl
 * Controller of the provaApp
 */
angular.module('provaApp')
  .controller('ParseCtrl', ['$scope', 'articoliParse', 'filepickerService', '$window', '$modal',
    function ($scope, articoliParse, filepickerService, $window, $modal) {

      articoliParse.getAll().success(function(data) {
        $scope.articoli = data.results;
      })

      articoliParse.getAllImages().success(function(data) {
        $scope.immagini = data.results;
        console.log('images', $scope.immagini)
      }).success(
        function() {
          $('.slider').slider({full_width: true});
        }
      )
      $scope.salvaArticolo = function() {
        articoliParse.create($scope.articolo).success(function(data) {
          console.log(data);
        });
      }



      $scope.pickFile = pickFile;

      $scope.onSuccess = onSuccess;

      $scope.launch = launch;


      // in the launch function
      function launch(name, finishFunction, wrapSelection){
        // do whatever you were doing with the modal

        var sel = rangy.getSelection();
        var modalOptions = {
          controller: 'ScegliimmaginectrlCtrl',
          templateUrl: '../../views/scegliimmagine.html',
          fixedFooter: true
        };

        var modale = $modal.open(modalOptions);

        modale.then(function(selectedImage) {
          sel.collapseToEnd();
          console.log('hai selezionato', selectedImage);
          wrapSelection('insertImage', selectedImage.url, true);
          finishFunction();
        }, function() {
          console.log('dismissed');
        });

        //return false;
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
        console.log(Blob);
        articoliParse.insertImage(Blob);
        articoliParse.getAllImages().success(function(data) {
          $scope.immagini = data.results;
          console.log('images', $scope.immagini)
        })
      };

    }]).config(function($provide){
    $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions){
      // $delegate is the taOptions we are decorating
      // register the tool with textAngular
      var imgOnSelectAction = function(event, $element, editorScope){
        // setup the editor toolbar
        // Credit to the work at http://hackerwins.github.io/summernote/ for this editbar logic/display
        var finishEdit = function(){
          editorScope.updateTaBindtaTextElement();
          editorScope.hidePopover();
        };
        event.preventDefault();
        editorScope.displayElements.popover.css('width', '375px');
        var container = editorScope.displayElements.popoverContainer;
        container.empty();
        var buttonGroup = angular.element('<div class="btn-group" style="padding-right: 6px;">');
        var fullButton = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">100% </button>');
        fullButton.on('click', function(event){
          event.preventDefault();
          $element.css({
            'width': '100%',
            'height': ''
          });
          finishEdit();
        });
        var halfButton = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">50% </button>');
        halfButton.on('click', function(event){
          event.preventDefault();
          $element.css({
            'width': '50%',
            'height': ''
          });
          finishEdit();
        });
        var quartButton = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">25% </button>');
        quartButton.on('click', function(event){
          event.preventDefault();
          $element.css({
            'width': '25%',
            'height': ''
          });
          finishEdit();
        });
        var resetButton = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">Reset</button>');
        resetButton.on('click', function(event){
          event.preventDefault();
          $element.css({
            width: '',
            height: ''
          });
          finishEdit();
        });
        buttonGroup.append(fullButton);
        buttonGroup.append(halfButton);
        buttonGroup.append(quartButton);
        buttonGroup.append(resetButton);
        container.append(buttonGroup);

        buttonGroup = angular.element('<div class="btn-group" style="padding-right: 6px;">');
        var floatLeft = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-left"></i></button>');
        floatLeft.on('click', function(event){
          event.preventDefault();
          // webkit
          $element.css('float', 'left');
          // firefox
          $element.css('cssFloat', 'left');
          // IE < 8
          $element.css('styleFloat', 'left');
          finishEdit();
        });
        var floatRight = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-right"></i></button>');
        floatRight.on('click', function(event){
          event.preventDefault();
          // webkit
          $element.css('float', 'right');
          // firefox
          $element.css('cssFloat', 'right');
          // IE < 8
          $element.css('styleFloat', 'right');
          finishEdit();
        });
        var floatNone = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-justify"></i></button>');
        floatNone.on('click', function(event){
          event.preventDefault();
          // webkit
          $element.css('float', '');
          // firefox
          $element.css('cssFloat', '');
          // IE < 8
          $element.css('styleFloat', '');
          finishEdit();
        });
        buttonGroup.append(floatLeft);
        buttonGroup.append(floatNone);
        buttonGroup.append(floatRight);
        container.append(buttonGroup);

        buttonGroup = angular.element('<div class="btn-group">');
        var remove = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-trash-o"></i></button>');
        remove.on('click', function(event){
          event.preventDefault();
          $element.remove();
          finishEdit();
        });
        buttonGroup.append(remove);
        container.append(buttonGroup);

        editorScope.showPopover($element);
        editorScope.showResizeOverlay($element);
      };
      taRegisterTool('myInsertImage', {
        iconclass: "fa fa-image",
        action: function($deferred){
          // It's better to use $editor().$parent not $parent.$parent as this means you are targeting the parent scope of the editor, not the parent of the parent of the button
          this.$editor().$parent.launch('insertImage', $deferred.resolve, this.$editor().wrapSelection);
        },
        onElementSelect: {
          element: 'img',
          action: imgOnSelectAction
        }

      });
      // add the button to the default toolbar definition
      taOptions.toolbar[1].push('colourRed');
      return taOptions;
    }]);
  });;
