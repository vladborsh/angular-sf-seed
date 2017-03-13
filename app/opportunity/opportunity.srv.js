OpportunitySrv.$inject = ['SfRemote'];

function OpportunitySrv (SfRemote) {

	this.getAllOpportunities = function() {
		return SfRemote.do('FruitsCtrl.getAllOpportunities');
	};

};

angular.module('App').service('OpportunitySrv', OpportunitySrv); 