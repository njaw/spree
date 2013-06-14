SpreeStore.module('Models',function(Models, SpreeStore, Backbone,Marionette,$,_){
  Models.Order = Backbone.Model.extend({
    url: function() {
      return '/store/api/orders/' + this.id
    }
  })
});