function GeneralFct() {

  var model = {
    portalSettings       : portalSettings,
    portalSettingsKeySet : portalSettingsKeySet,
    mainFruit            : mainFruit,
    mainFruitIsApple     : mainFruitIsApple
  };

  console.log(model);

  return {
    get : function(key) {
      return model[key];
    },
    getCopy : function(key) {
      return angular.copy(model[key]);
    },
    getModel : function() {
      return model;
    },
    getModelCopy : function() {
      return angular.copy(model);
    }
  };
};

angular.module('App').factory('GeneralFct', GeneralFct); 
