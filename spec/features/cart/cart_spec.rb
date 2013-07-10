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
    page.should have_content("Your cart is empty")
  end

  context "with invalid order id" do
    before do
      visit "/"
      page.execute_script("window.localStorage.currentOrderId = 'totally-invalid-order-id'")
    end

    it "does not error out when an order has been deleted" do
      visit "/"
      page.should have_content("CART: EMPTY", :css => "#link-to-cart")
      page.should have_content("We couldn't find your cart. Please start again.", :css => ".error")
      visit "/"
      page.should_not have_content("We couldn't find your cart. Please start again.", :css => ".error")
    end

    it "clicking an invalid cart hides sidebar + pagination, shows empty cart page" do
      visit "/"
      page.execute_script("window.localStorage.currentOrderId = 'totally-invalid-order-id'")
      visit "/"
      click_link "Cart: Empty"
      page.should have_content("Your cart is empty")
      assert_no_sidebar_or_pagination
    end
  end
end