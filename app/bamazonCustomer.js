var customerInput = function(dbCon) {
  var that = {};
  const prompt = require('./prompt');
  var columnify = require('columnify');
  var allProductInfo;

  function getProducts() {
    // return new Promise((resolve, reject) => {
      dbCon.query('SELECT * FROM products', function(err, results, fields) {
        if(err)
        console.warn(err);

        var columns = columnify(results, {columnSplitter: ' | '})
        console.log(columns);
        allProductInfo = results;
        purchaseId(results);
      })
  }
  function purchaseId() {
    var productPrompt = {
      type: 'input',
      message: 'What would you like to purchase?',
      name: 'item_id'
    };
    prompt(productPrompt).then(product => {
      askQuantity(product.item_id);
    })
}
function askQuantity(item_id) {
  var quantityPrompt = {
    type: 'input',
    message: 'How many would you like to purchase?',
    name: 'quantity'
  };
  prompt(quantityPrompt).then(answer => {
    console.log(answer);
    checkProductAvailability(item_id, answer.quantity);
  })
}

  function checkProductAvailability(item_id, quantity) {
    console.log("this is the item id: ", item_id, " and the quantity: ", quantity);
    allProductInfo.filter(function(item) {
      var parsedId = parseInt(item_id, 10)
      if (item.id === parsedId) {
        console.log("item: ", item);

      }
    })
  }
  that.getProducts = getProducts;

  return that;
};

module.exports = customerInput;
