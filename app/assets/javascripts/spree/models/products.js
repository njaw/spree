SpreeStore.module('Models',function(Models, SpreeStore, Backbone,Marionette,$,_){
  Models.Product = Backbone.Model.extend({
    idAttribute: "permalink",
    url: function() {
      return '/store/api/products/' + this.id;
    },
    initialize: function(){
      this.build_associations();
    },

    build_associations: function(){
      this.variants = new SpreeStore.Models.Variants(this.get('variants'), {product: this});
    },
  });

  Models.Products = Backbone.Collection.extend({
    model: Models.Product,
    url: '/store/api/products',

    parse: function(data) {
      this.total_count = data.total_count;
      this.per_page = data.per_page;
      return data.products;
    },
  });
});