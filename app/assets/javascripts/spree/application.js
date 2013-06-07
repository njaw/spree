//= require_self
//= require_tree ../spree/entities
//= require_tree ../spree/apps/store
//= require_tree ../spree/apps/cart
//= require_tree ../spree/apps/products/list
//= require_tree ../spree/apps/products/show
Spree = {}
SpreeStore = new Backbone.Marionette.Application()
SpreeStore.current_order_id = window.localStorage['current_order_id']

SpreeStore.addRegions({
    mainRegion: ".fast-freddy",
    cartInfo: '#link-to-cart'
});

SpreeStore.navigate = function(route, options) {
  options || (options = {});
  Backbone.history.navigate(route, options)
}

SpreeStore.getCurrentRoute = function() {
  return Backbone.history.fragment;
}

SpreeStore.on("initialize:after", function(){
  if (Backbone.history) {
    Backbone.history.start();
  }
  if (this.getCurrentRoute() === "") {
    SpreeStore.trigger("products:list")
  }
});
