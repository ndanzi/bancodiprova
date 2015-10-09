angular.module('firebase.config', [])
  .constant('FBURL', 'https://bancodiprova.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password','anonymous','facebook'])

  .constant('loginRedirectPath', '/login');
