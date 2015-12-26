'use strict';

/**
 * @ngdoc service
 * @name provaApp.articoliParse
 * @description
 * # articoliParse
 * Factory in the provaApp.
 */
angular.module('provaApp')
  .factory('articoliParse', ['$http', 'PARSE_CREDENTIALS', function ($http, PARSE_CREDENTIALS) {

    return {
      getAll:function() {
        return $http.get('https://api.parse.com/1/classes/Articoli',{
            headers:{
                'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
            }
        });
      },
      create:function(data){
          return $http.post('https://api.parse.com/1/classes/Articoli',data,{
              headers:{
                  'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                  'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                  'Content-Type':'application/json'
              }
          });
      },
      insertImage:function(data){
        return $http.post('https://api.parse.com/1/classes/immagini',data,{
          headers:{
            'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
            'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
            'Content-Type':'application/json',
          }
        });
      },
      getAllImages:function() {
        return $http.get('https://api.parse.com/1/classes/immagini',{
          headers:{
            'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
            'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
          }
        });
      }
    }

  }]).value('PARSE_CREDENTIALS',{
    APP_ID: '8Npu0yRNzLJdeTWiLtYSJt5rugcPwMfcVsJ67cwh',
    REST_API_KEY:'AvacydwUwhtnKKD2y81Kj2upYbY4WWsj8mjkkQ3y'
});
