BananaSrv.$inject = ['SfRemote'];

function BananaSrv (SfRemote) {

  this.getAllBananas = function(arg) {
    return SfRemote.do('FruitsCtrl.getAllBananas', arg);
  };

};

angular.module('App').service('BananaSrv', BananaSrv); 