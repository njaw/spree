SpreeStore.module('Models',function(Models, SpreeStore, Backbone,Marionette,$,_){
  Models.Variant = Backbone.Model.extend({

  })

  Models.Variants = Backbone.Collection.extend({
    model: Models.Variant,
    url: function() {
      return '/store/api/products/' + this.product.id + '/variants' 
    }
  })
});