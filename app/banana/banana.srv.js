BananaSrv.$inject = ['SfRemote'];

function BananaSrv (SfRemote) {

	this.getAllBannas = function() {
		return SfRemote.do('FruitsCtrl.getAllBannas');
	};

};

angular.module('App').service('BananaSrv', BananaSrv); 