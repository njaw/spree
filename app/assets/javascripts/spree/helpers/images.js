SpreeStore.helpers = {}
SpreeStore.helpers.displayImage = function(variant, type) {
  if (variant.images[0]) {
    return variant.images[0][type + '_url'];
  } else {
    return "/assets/noimage/" + type + ".png";
  }
}