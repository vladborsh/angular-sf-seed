OpportunityCtrl.$inject = [
  'OpportunitySrv', 
  'OpportunityFct', 
  '$scope', 
  '$timeout',
  '$q'];

function OpportunityCtrl (
  OpportunitySrv, 
  OpportunityFct,
  $scope, 
  $timeout,
  $q) {

  var vm = this;

  vm.model = {
    _OpportunityFct : OpportunityFct.getModel(),
    bananas         : [],
    opportunities     : []
  };

  vm.utils = {
    alerts  : [],
    loading : false
  };

  init();

  function init() {
    vm.utils.loading = true;
    vm.utils.alerts = [];
    $q.all({
      'bananas'       : BananaSrv.getAllBannas({}),
      'opportunities' : OpportunitySrv.getAllOpportunities({})
    }).then(
      function(data){
        vm.model.bananas       = data.bananas.items;
        vm.model.opportunities = data.items;
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

};

angular.module('App').controller('OpportunityCtrl', OpportunityCtrl); 