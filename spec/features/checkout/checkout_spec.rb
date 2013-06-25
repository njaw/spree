require 'spec_helper'

feature "Checkout", :js => true do
  before do
    binding.pry
    reset_spree_preferences
    # So the config endpoint has something to load when determining
    # if it should cache its response or not
    Spree::Config[:currency] = "USD"
    FactoryGirl.create(:base_product, :name => "iPad")
  end

  let!(:country) { Spree::Country.first }
  let!(:state) { country.states.first }

  def fill_in_address_for(type)
    field_prefix = "order_#{type}_address_attributes"
    within(type == "bill" ? "#billing" : "#shipping") do
      fill_in "First Name", :with => "Ryan"
      fill_in "Last Name", :with => "Bigg"
      fill_in "Street Address", :with => "1 Nowhere Lane"
      fill_in "City", :with => "Nowhere"
      select country.name, :from => "Country"
      binding.pry
      select state.name, :from => "State"
    end
  end

  it "can add a product to the cart" do
    visit "/"
    click_link "iPad"
    fill_in "quantity", :with => 2
    click_button 'Add To Cart'
    fill_in 'Email', :with => "me@ryanbigg.com"
    click_button 'Checkout'
    fill_in_address_for("bill")
    binding.pry
  end

  it "can jump back to a previous state"

  it "cannot navigate to an invalid state"
end