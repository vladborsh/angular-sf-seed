function OpportunityFct() {

	var model = {};

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
		},
		set : function(key, val) {
			model[key] = val;
		},
		setModel : function(_model) {
			model = _model;
		}
	}
}

angular.module('App').factory('OpportunityFct', OpportunityFct); 