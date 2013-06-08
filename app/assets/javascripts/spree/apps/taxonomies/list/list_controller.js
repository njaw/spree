SpreeStore.module('Taxonomies.List',function(TaxonomiesList, SpreeStore, Backbone,Marionette,$,_){
  TaxonomiesList.Controller = {
    listTaxonomies: function() {
      var taxonomies = new SpreeStore.Entities.Taxonomies;
      taxonomies.fetch();
      var taxonomies_list_view = new TaxonomiesList.Taxonomies({
        collection: taxonomies
      });
      SpreeStore.sidebar.show(taxonomies_list_view)

      // taxonomies_list_view.on("itemview:product:view", function(childView, model){
      //   SpreeStore.Taxonomies.Show.Controller.showTaxonomy(model.id)
      // });
    }
  }
});