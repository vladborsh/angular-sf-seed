BananaCtrl.$inject = [
  'GeneralFct',
  'BananaSrv',
  'OpportunitySrv',
  'BananaFct', 
  '$scope', 
  '$timeout'];

function BananaCtrl (
  GeneralFct,
  BananaSrv,
  OpportunitySrv, 
  BananaFct, 
  $scope, 
  $timeout) {

  var vm = this;

  vm.model = {
    _BananaFct    : BananaFct.getModel(),
    bananas       : [],
    opportunities : []
  };

  vm.utils = {
    alerts  : [],
    loading : false
  };

  init();

  function init () {
    vm.utils.loading = true;
    vm.utils.alerts = [];
    BananaSrv.getAllBananas({})
    .then(
      function (data) {
        vm.model.bananas = data.items;
        return OpportunitySrv.getAllOpportunities({})
      }
    ).then(
      function (data) {
        vm.model.opportunities = data.items;
        vm.utils.loading = false;
      }
    ).catch(
      function (err) {
        vm.utils.loading = false;
        if (err.type) {
          vm.utils.alerts.push(err);
        } else {
          vm.utils.alerts.push({type:'danger', msg: err.message});
        }
      }
    );
  };

  vm.doStuff = function() {
    /* Some stuff */
  }

};

angular.module('App').controller('BananaCtrl', BananaCtrl); 