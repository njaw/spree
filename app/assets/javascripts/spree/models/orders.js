SpreeStore.module('Models',function(Models, SpreeStore, Backbone,Marionette,$,_){
  Models.Order = Backbone.Model.extend({
    idAttribute: "number",
    url: function() {
      return '/store/api/orders/' + this.attributes.number
    }
  })
});