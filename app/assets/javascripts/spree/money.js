Spree.Money = {}

Spree.Money.format = function(amount) {
  // Round up to 2 decimal places.
  amount = parseFloat(amount).toFixed(2)
  if (Spree.Money.Settings.symbol_position == "before") {
    return Spree.Money.Settings.symbol + amount;
  } else {
    return amount + ' ' + Spree.Money.Settings.symbol;
  }
}