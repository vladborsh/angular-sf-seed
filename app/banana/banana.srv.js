BananaSrv.$inject = ['SfRemote'];

function BananaSrv (SfRemote) {

	this.getAllBannas = function(arg) {
		return SfRemote.do('FruitsCtrl.getAllBannas', arg);
	};

};

angular.module('App').service('BananaSrv', BananaSrv); 