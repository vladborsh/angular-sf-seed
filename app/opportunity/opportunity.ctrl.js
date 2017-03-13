BananaCtrl.$inject = ['OpportunitySrv', 'OpportunityFct', '$scope', '$timeout'];

function OpportunityCtrl (OpportunitySrv, OpportunityFct, $scope, $timeout) {

	var vm = this;

	vm.model = {
		_OpportunityFct : OpportunityFct.getModel()
	};

	vm.utils = {
		alerts : []
	};

	vm.init();

	vm.init = function() {
		
	};

};

angular.module('App').controller('OpportunityCtrl', OpportunityCtrl); 