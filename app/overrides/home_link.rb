Deface::Override.new(:virtual_path => "spree/shared/_main_nav_bar", 
                     :name => "home_link", 
                     :replace => "li#home-link") do
  "<li><a href='/'><%= Spree.t(:home) %></a></li>"
end