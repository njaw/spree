//= require_self
//= require_tree ../spree/entities
//= require_tree ../spree/apps/store
//= require_tree ../spree/apps/products/list
//= require_tree ../spree/apps/products/show
Spree = {}
SpreeStore = new Backbone.Marionette.Application()

SpreeStore.addRegions({
    mainRegion: "#content"
});

SpreeStore.navigate = function(route, options) {
  options || (options = {});
  Backbone.history.navigate(route, options)
}

SpreeStore.getCurrentRoute = function() {
  return Backbone.history.fragment();
}

SpreeStore.on("initialize:after", function(){
  if (Backbone.history) {
    Backbone.history.start();
  }
  if (this.getCurrentRoute === "") {
    SpreeStore.trigger("products:list")
  }
});

$(document).ready(function() {
  SpreeStore.start();
})
