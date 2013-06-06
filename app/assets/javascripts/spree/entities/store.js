SpreeStore.module('Entities',function(Entities, SpreeStore, Backbone,Marionette,$,_){
  Entities.Product = Backbone.Model.extend({
    url: function() {
      return '/store/api/products/' + this.id;
    },
    initialize: function(){
      this.build_associations();
    },

    build_associations: function(){
      this.variants = new SpreeStore.Entities.Variants(this.get('variants'), {product: this});
    },
  });

  Entities.Products = Backbone.Collection.extend({
    model: Entities.Product,
    url: '/store/api/products',

    parse: function(data) {
      return data.products;
    }
  });

  Entities.Variant = Backbone.Model.extend({

  })

  Entities.Variants = Backbone.Collection.extend({
    model: Entities.Variant,
    url: function() {
      return '/store/api/products/' + this.product.id + '/variants' 
    }
  })
})