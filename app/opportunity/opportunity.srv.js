OpportunitySrv.$inject = ['SfRemote'];

function OpportunitySrv (SfRemote) {

	this.getAllOpportunities = function(arg) {
		return SfRemote.do('FruitsCtrl.getAllOpportunities', arg);
	};

};

angular.module('App').service('OpportunitySrv', OpportunitySrv); 