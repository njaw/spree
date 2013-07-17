require 'spec_helper'

feature "Checkout", :js => true do
  before do
    reset_spree_preferences
  end

  let!(:country) { Spree::Country.first || FactoryGirl.create(:country) }
  let!(:state) { country.states.first || FactoryGirl.create(:state, :country => country) }
  let!(:shipping_category) { FactoryGirl.create(:shipping_category) }
  let!(:product) { FactoryGirl.create(:base_product, :name => "iPad", :shipping_category => shipping_category) }
  let!(:shipping_method) do
    FactoryGirl.create(:shipping_method).tap do |sm|
      sm.calculator.preferred_amount = 10
      sm.calculator.save
    end
  end
  let!(:payment_method) { FactoryGirl.create(:bogus_simple_payment_method) }

  def fill_in_address_for(type)
    field_prefix = "order_#{type}_address_attributes"
    within(type == "bill" ? "#billing" : "#shipping") do
      fill_in "First Name", :with => "Ryan"
      fill_in "Last Name", :with => "Bigg"
      fill_in "Street Address", :with => "1 Nowhere Lane"
      fill_in "City", :with => "Nowhere"
      select country.name, :from => "Country"
      select state.name, :from => "State"
      fill_in "Zip", :with => "3000"
      fill_in "Phone", :with => "(555) 555-5555"
    end
  end

  def walkthrough_to_address
    visit "/"
    click_link "iPad"
    fill_in "quantity", :with => 2
    click_button 'Add To Cart'
    wait_for_ajax
    fill_in 'Email', :with => "me@ryanbigg.com"
    click_button 'Checkout'
    wait_for_ajax
    page.current_url.should include("checkout/address")
    page.find(".progress-steps .current").text.should == 'ADDRESS'
    page.find(".progress-steps .next").text.should == 'DELIVERY'
  end

  def walkthrough_to_delivery
    walkthrough_to_address
    fill_in_address_for("bill")
    check "Use Billing Address"
    click_button "Save and Continue"
    wait_for_ajax
    page.current_url.should include("checkout/delivery")
    page.find(".progress-steps .current").text.should == 'DELIVERY'
    page.find(".progress-steps .next").text.should == 'PAYMENT'
  end

  def walkthrough_to_payment
    walkthrough_to_delivery
    choose shipping_method.name
    click_button "Save and Continue"
    wait_for_ajax
    page.current_url.should include("checkout/payment")
    page.find(".progress-steps .current").text.should == 'PAYMENT'
    page.find(".progress-steps .next").text.should == 'COMPLETE'
  end

  it "can walk through the entire cart" do
    walkthrough_to_payment
    fill_in "Card Number", :with => "4111111111111111"
    select 1.month.from_now.month, :from => "card_month"
    select 1.month.from_now.year, :from => "card_year"
    fill_in "Card Code", :with => "123"
    click_button "Save and Continue"
    wait_for_ajax
    page.current_url.should include("orders/#{Spree::Order.last.number}")
  end

  it "is politely asked to select a shipping rate" do
    walkthrough_to_address
    fill_in_address_for("bill")
    check "Use Billing Address"
    click_button "Save and Continue"
    wait_for_ajax
    page.current_url.should include("checkout/delivery")
    within(".shipping-methods") do
      page.should_not have_content("Please select a shipping rate.")
    end
    click_button "Save and Continue"
    within(".shipping-methods") do
      page.should have_content("Please select a shipping rate.")
    end
    choose shipping_method.name
    within(".shipping-methods") do
      page.should_not have_content("Please select a shipping rate.")
    end
    click_button "Save and Continue"
    page.current_url.should include("checkout/payment")
  end

  it "is shown errors about a credit card" do
    walkthrough_to_payment
    click_button "Save and Continue"
    within("#errorExplanation") do
      page.should have_content("Number can't be blank")
      page.should have_content("Verification Value can't be blank")
      page.should have_content("Card has expired")
    end
    page.should have_selector(".continue", :visible => true)
    page.should have_selector("#loading", :visible => false)

  end

  it "can update items in the cart" do
    walkthrough_to_address
    find("#link-to-cart a").click
    page.should have_content("Shopping Cart")
    fill_in "order[line_items_attributes][1][quantity]", :with => 10
    click_button "Checkout"
    wait_for_ajax
    page.current_url.should include("checkout/address")
    within("#checkout-summary") do
      page.should have_content("10 x iPad")
    end
  end

  it "can jump back to a previous state"

  it "cannot navigate to an invalid state"

  # Maybe put an error message here?
  it "reroutes to homepage when cart is blank"
end