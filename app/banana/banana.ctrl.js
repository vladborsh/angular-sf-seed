BananaCtrl.$inject = ['BananaSrv', 'BananaFct', '$scope', '$timeout'];

function BananaCtrl (BananaSrv, BananaFct, $scope, $timeout) {

	var vm = this;

	vm.model = {
		_BananaFct : BananaFct.getModel()
	};

	vm.utils = {
		alerts : []
	};

	vm.init();

	vm.init = function() {
		
	};

};

angular.module('App').controller('BananaCtrl', BananaCtrl); 