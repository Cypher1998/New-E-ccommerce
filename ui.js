// set a var to empty sting
let output = '';

//es6 class
class UI {
  constructor() {
    // set parentElement from DOM
    this.product = document.querySelector('.product-display');
  }

  // functions in prototypes

  // function  that display items in Home(DOM)
  showProducts(product) {
    output += `
      <a href="${product.url}" class="product">
        <div class="card card-body mb-3 m-2 text-dark text-sm-center d-flex justify-content-center align-items-center">
          <img src="${product.image}" class="mb-3">
          <div class="pt-2 text-center">
            <p class="h6">${product.name}</p>
            <span class=card-subtitle>${product.price}</span>
          </div>
        </div>
      </a>
    `;
    this.product.innerHTML = output;
  }

  // function that filter products in Home(DOM)
  // where (text) is a value from a text input
  filterProducts(text) {
    // get all products to filter
    const parentElements = document.querySelectorAll('.product');

    parentElements.forEach((parentElement) => {
      /* set a var to the content of element to be used as filter paramater */
      const item =
        parentElement.firstElementChild.firstElementChild.nextElementSibling
          .firstElementChild.textContent;

      // check if (text) is present in (item)
      if (item.toLowerCase().indexOf(text) !== -1) {
        parentElement.style.display = 'inline-block';
      } else {
        parentElement.style.display = 'none';
      }
    });
  }
}

const button = document.querySelector('button.add');

// check is button is in this page
if (button) {
  // event that add item to cart
  button.addEventListener('click', addToCart);
}

//callback function of above event
function addToCart(e) {
  // get contents of an elements
  const UIimage = document.querySelector('.item img').getAttribute('src');
  const UIname = document.querySelector('.item p').textContent;
  const UIprice = document.querySelector('.item span').textContent;

  // instantiate addItem object
  const addItem = new AddProductToCart(UIimage, UIname, UIprice);

  // static function that add items to localStorage
  CART.addItemToLS(addItem);

  const cart = new CART();
  cart.showALert('Item added to cart', 'yellow');

  const cartNumber = document.querySelector('i span');

  /* static function that paints the number of elements in cart */
  CART.addNumToLS(cartNumber);

  e.preventDefault();
}

//DOM LOAD EVENT
document.addEventListener('DOMContentLoaded', repaintDOM);

/* callback function that repaints the number of elements in cart */
function repaintDOM() {
  const products = CART.getItemFromLS();

  const cartNumber = document.querySelector('i span');

  cartNumber.textContent = products.length;
}

// check if present
if (document.getElementById('cart')) {
  // event that removes item from cart
  document.getElementById('cart').addEventListener('click', function (e) {
    // instantiate new cart object
    const cart = new CART();

    // function that removes item from cart
    cart.removeItemFromCart(e.target);

    /* static function that removes item from localStorage */
    CART.removeItemFromLS(
      e.target.previousElementSibling.previousElementSibling.textContent
    );

    //alert
    cart.showALert('Item removed from cart', 'aqua');

    // display number of items in cart
    const cartNumber = document.querySelector('i span');

    // parent element of cart
    const cartItem = document.getElementById('cart');

    /* set display number to number of elements in cart */
    cartNumber.textContent = cartItem.childElementCount;

    // calculating costs of items in cart
    let initCartTotal = Number(
      document.getElementById('totalPrice').textContent
    );

    //
    const itemPrice = parseFloat(e.target.previousElementSibling.textContent);

    // console.log(itemPrice);
    const finalCartTotal = initCartTotal - itemPrice;

    document.getElementById('totalPrice').textContent = finalCartTotal || 0;

    e.preventDefault();
  });
}

//Display Item in LS in Cart
const cart = new CART();
// if (cart) {
cart.addItemToCart();
// }
