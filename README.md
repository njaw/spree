# Spree + [Backbone.Marionette](https://github.com/marionettejs/backbone.marionette) = :heart:

This application uses Backbone.Marionette and Spree's API to provide a basic
frontend for Spree. At the moment, what can be done is:

* Viewing a list of products
* Viewing a single product
* Adding a product to a cart, which is persisted in localStorage

More features coming soon.

## Demo

If you want to demo this application yourself, run these commands:

    git clone git://github.com/radar/spree-marionette
    cd spree-marionette
    bundle install
    rake db:drop db:create db:migrate db:seed AUTO_ACCEPT=true
    rake spree_sample:load
    rails s


