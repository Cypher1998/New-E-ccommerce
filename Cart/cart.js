class AddProductToCart {
  constructor(UIimage, UIname, UIprice) {
    this.image = UIimage;
    this.name = UIname;
    this.price = UIprice;
  }
}

let cartOutput = '';

class CART {
  // get products from localStorage
  static getItemFromLS() {
    let products;
    if (localStorage.getItem('products') === null) {
      products = [];
    } else {
      products = JSON.parse(localStorage.getItem('products'));
    }
    return products;
  }

  // function that paints the cart
  addItemToCart() {
    const products = CART.getItemFromLS();
    products.forEach((product) => {
      cartOutput += `
          <div class="card card-body d-inline-block mx-1 my-2">
            <div class="card-image image-top pb-2">
              <img src="${product.image}"/>
            </div>
            <div class="cart-item">
              <p class="h6 mt-2 bg-secondary text-light p-2">${product.name}</p>
              <span class="h6 text-secondary">${product.price}</span>
              <button class="btn btn-danger remove mt-1">Remove Item</button>
            </div>
          </div>
        `;

      // check if present
      if (document.getElementById('totalPrice')) {
        /* initialize a var to the cost of Items in cart */
        let initCartTotal = Number(
          document.getElementById('totalPrice').textContent
        );

        // cost of each items
        const itemPrice = parseFloat(product.price);

        //add costs to the initial total value
        const finalCartTotal = initCartTotal + itemPrice;

        //set finalValue as total costs of items
        document.getElementById('totalPrice').textContent = finalCartTotal;
      }
    });

    //check if it is in the page
    if (document.getElementById('cart')) {
      //paints cart
      document.getElementById('cart').innerHTML = cartOutput;
    }
  }

  // function that removes item from cart
  removeItemFromCart(target) {
    if (target.classList.contains('remove')) {
      target.parentElement.parentElement.remove();
    }
  }

  //function that shows alert in DOM
  showALert(message, color) {
    const div = document.createElement('div');
    div.className = 'alert-add text-center p-3';
    div.append(document.createTextNode(message));
    div.style.background = 'rgba(0,0,0,0.7)';
    div.style.color = color;

    document.querySelector('.show-alert').append(div);

    setTimeout(() => {
      document.querySelector('.alert-add').remove();
    }, 1500);
  }

  //function that add items to localStorage
  static addItemToLS(product) {
    const products = CART.getItemFromLS();
    products.push(product);

    localStorage.setItem('products', JSON.stringify(products));
  }

  /* function that paints the number of elements in cart */
  static addNumToLS(cart) {
    const products = CART.getItemFromLS();
    cart.textContent = products.length;
  }

  // function that removes item from LS
  static removeItemFromLS(name) {
    const products = CART.getItemFromLS();

    products.forEach((product, index) => {
      if (product.name === name) {
        products.splice(index, 1);
      }
    });
    localStorage.setItem('products', JSON.stringify(products));
  }
}

// showAlert(message, className) {
//   //create a div element
//   const div = document.createElement('div');
//   //set classNames
//   div.className = `alert ${className}`;
//   //create textNode and append
//   div.append(document.createTextNode(message));
//   //get container
//   const container = document.querySelector('.container');
//   //get form-book
//   const form = document.getElementById('form-book');
//   //insert div before form
//   container.insertBefore(div, form);
//   //set timeout
//   setTimeout(function () {
//     document.querySelector('.alert').remove();
//   }, 3000);
