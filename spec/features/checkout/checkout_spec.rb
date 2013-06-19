require 'spec_helper'

feature "Checkout", :js => true do
  before do
    FactoryGirl.create(:product, :name => "iPad")
    FactoryGirl.create(:country, :name => "Afghanistan")
    country = FactoryGirl.create(:country, :name => "Australia")
    country.states.create!(:name => "Victoria")
  end

  def fill_in_address_for(type)
    field_prefix = "order_#{type}_address_attributes"
    within(type == "bill" ? "#billing" : "#shipping") do
      fill_in "First Name", :with => "Ryan"
      fill_in "Last Name", :with => "Bigg"
      fill_in "Street Address", :with => "1 Nowhere Lane"
      fill_in "City", :with => "Nowhere"
      binding.pry
      select "Australia", :from => "Country"
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
end