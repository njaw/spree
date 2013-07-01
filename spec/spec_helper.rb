# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV["RAILS_ENV"] ||= 'test'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec/rails'
require 'rspec/autorun'
require 'spree/testing_support/factories'
require 'spree/testing_support/preferences'

# Requires supporting ruby files with custom matchers and macros, etc,
# in spec/support/ and its subdirectories.
Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }

# ActiveSupport::Notifications.subscribe("sql.active_record") do |_, _, _, _, details|
#   if details[:sql] =~ /INSERT INTO "spree_states"/
#     puts caller.join("\n")
#     puts "*" * 50
#   end
# end

RSpec.configure do |config|
  config.include Spree::TestingSupport::Preferences
  config.fixture_path = "#{::Rails.root}/spec/fixtures"
  config.use_transactional_fixtures = false


  config.before(:each) do
    if example.metadata[:js]
      page.driver.execute_script("window.localStorage.clear()")
      DatabaseCleaner.strategy = :truncation
    else
      DatabaseCleaner.strategy = :transaction
    end
  end

  config.before(:each) do
    DatabaseCleaner.start
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end

  config.infer_base_class_for_anonymous_controllers = false

  config.order = "random"
end