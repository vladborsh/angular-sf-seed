SfRemote.$inject = ['$q', '$log'];

function SfRemote($q, $log) {

  /* Explicit remote method invocation */
  this.do = function(name, arg) {
    var deffered = $q.defer();
    $log.debug('\n I ~ '+ name);
    /* Middleware */
    Visualforce.remoting.Manager.invokeAction(name, arg,
      function(result,event){
        if(event.status){
          deffered.resolve(result);
        } else {
          deffered.reject(event);
        }
      },
      {buffer: true,escape :false}
    );
    return deffered.promise;
  }

};

angular.module('App').service('SfRemote', SfRemote); 