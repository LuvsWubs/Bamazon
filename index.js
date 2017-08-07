var mysql = require('mysql');
var columnify = require('columnify');

var prompt = require('./app/prompt');
var config = require('./config.js');
var connection = mysql.createConnection(config);
var customer = require('./app/bamazonCustomer')(connection);

connection.connect((err) => {
  if(err) throw err;
  console.log("BAM!azon", init());
});

var init = function() {
  var identityQ = {
    type: 'list',
    message: 'Who the hell do you think you are?',
    choices: ['potential customer--be nice to me!', 'the Boss'],
    name: 'user'
  };
  prompt(identityQ).then((answer) =>{
    switch(answer.user) {
      case 'potential customer--be nice to me!':
        customer.getProducts();
        break;
      case 'the Boss':

        break;
        default:
    }
  })
};
