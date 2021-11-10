// instantiate json object
const json = new JSONObject();
// instantiate ui object
const ui = new UI();

/* check if json and ui objects are in this particular page */
if ((json, ui)) {
  json.getProducts().then((products) => {
    products.forEach((product) => {
      //function that shows products in Home
      ui.showProducts(product);
    });
  });
}

// get input[type=text] from DOM
const textInput = document.getElementById('textInput');

// check if textInput is in this particular page
if (textInput) {
  /* event that filters products based on the value of textInput */
  textInput.addEventListener('keyup', function (e) {
    // get value of input
    const text = e.target.value;

    // function that filter products
    ui.filterProducts(text);
  });
}
