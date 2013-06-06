class HomeController < Spree::StoreController
  layout 'spree/layouts/spree_application'
  def index
    render :index
  end
end
