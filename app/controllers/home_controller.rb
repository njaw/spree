class HomeController < Spree::StoreController
  layout 'spree/layouts/spree_application'
  def index
    @payment_method_types = Spree::PaymentMethod.select("DISTINCT type, deleted_at").all.map(&:method_type)
  end
end
