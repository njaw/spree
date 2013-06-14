require 'spec_helper'

feature "Viewing products", :js => true do
  before do
    FactoryGirl.create(:product, :name => "iPad")
  end

  scenario "can see a list of products" do
    visit '/'
    page.should have_content('iPad')
  end

  scenario "can paginate through products results" do
    50.times do |i|
      FactoryGirl.create(:product, :name => "iPhone #{i}")
    end

    visit '/'
    page.should have_content('iPad')
    within("#top-pagination") do
      click_link '2'
    end
    page.should_not have_content('iPad')
    page.should have_content('iPhone')

    within("#top-pagination") do
      click_link '1'
    end
  end
end