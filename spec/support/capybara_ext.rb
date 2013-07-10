module CapybaraExt
  def wait_for_ajax
    counter = 0
    while page.execute_script("return $.active").to_i > 0
      counter += 1
      sleep(0.1)
      raise "AJAX request took longer than 5 seconds." if counter >= 50
    end
  end

  def assert_no_sidebar_or_pagination
    page.all(".pagination").should be_empty
    page.all("#sidebar").should be_empty
  end
end

RSpec.configure do |c|
  c.include CapybaraExt
end