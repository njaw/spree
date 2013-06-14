require 'spec_helper'

feature "Cart", :js => true do
  before do
    FactoryGirl.create(:product, :name => "iPad")
  end

  it "can add a product to the cart" do
    visit "/"
    click_link "iPad"
    fill_in "quantity", :with => 2
    click_button 'Add To Cart'

    sleep(1)
    page.current_url.should include("#cart")
    page.should have_content("CART: (2) $39.98", :css => "#link-to-cart")

    within("#line_items") do
      page.should have_content("iPad", :css => ".cart-item-description")
      page.should have_content("$19.99", :css => ".cart-item-price")
      page.should have_content("$39.98", :css => ".cart-item-total")
    end
  end

  it "navigating to an empty cart does not fail" do
    visit "/#cart"
    page.should have_content("Your cart is empty.")
  end

end