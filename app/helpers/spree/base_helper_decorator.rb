Spree::BaseHelper.class_eval do
  def logo(image_path=Spree::Config[:logo])
    link_to image_tag(image_path), '/'
  end
end