SpreeStore.module('Entities',function(Entities, SpreeStore, Backbone,Marionette,$,_){
  Entities.Product = Backbone.Model.extend({
    idAttribute: "permalink",
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
      this.total_count = data.total_count;
      this.per_page = data.per_page;
      return data.products;
    },
  });

  Entities.Variant = Backbone.Model.extend({

  })

  Entities.Variants = Backbone.Collection.extend({
    model: Entities.Variant,
    url: function() {
      return '/store/api/products/' + this.product.id + '/variants' 
    }
  })

  Entities.Taxonomy = Backbone.Model.extend({})

  Entities.Taxonomies = Backbone.Collection.extend({
    model: Entities.Taxonomy,
    url: '/store/api/taxonomies',

    parse: function(data) {
      return data.taxonomies;
    }
  })

  Entities.Order = Backbone.Model.extend({
    url: function() {
      return '/store/api/orders/' + this.id
    }
  })

  Entities.LineItem = Backbone.Model.extend({
    url: function() {
      return '/store/api/orders/' + SpreeStore.current_order_id + '/line_items/' + this.id
    },

    setQuantity: function(quantity) {
      this.set('quantity', quantity);
      var total = quantity * this.get('price');
      this.set('display_total_amount', Spree.Money.format(total))
      this.set('total', total)
    },

    paramRoot: 'line_item'
  })

  Entities.LineItems = Backbone.Collection.extend({
    model: Entities.LineItem,
    url: function() {
      return '/store/api/orders/' + SpreeStore.current_order_id + '/line_items'
    }
  })
})