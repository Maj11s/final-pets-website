var cart = {
  // (A) PROPERTIES
  hPdt : null, // HTML pet list
  hItems : null, // HTML current cart
  items : {}, // Current pets in cart
  iURL : "../images/", // Pets images URL folder

  save : function () {
    sessionStorage.setItem("cart", JSON.stringify(cart.items));
  },

  // This will load the cart from session storage //
  load : function () {
    cart.items = sessionStorage.getItem("cart");
    // The if and the else statement executes a code if a specific condition is true //
    if (cart.items == null) { cart.items = {}; }
    else { cart.items = JSON.parse(cart.items); }
  },

  // This function will clear and empty entire cart with a pop-up diolog//
  nuke : function () {
    if (confirm("Empty cart?")) {
      cart.items = {};
      // sessionStorage will store data only for a session/temporary this will clear data when the browser is closed//
      sessionStorage.removeItem("cart");
      cart.list();
    }
  },

  //  
  init : function () {
    // the getElement returns a reference to the first object with the specified value.
    cart.hPdt = document.getElementById("cart-products");
    cart.hItems = document.getElementById("cart-items");

    // (C2) DRAW PRODUCTS LIST
    cart.hPdt.innerHTML = "";
    let p, item, part;
    for (let id in products) {
      // WRAPPER
      p = products[id];
      item = document.createElement("div");
      item.className = "p-item";
      cart.hPdt.appendChild(item);

      // Pet Images
      part = document.createElement("img");
      part.src = cart.iURL + p.img;
      part.className = "p-img";
      //An appendChild allows you to add a node to the end of the list.
      item.appendChild(part);

      // The type of pet
      part = document.createElement("div");
      part.innerHTML = p.name;
      part.className = "p-name";
      item.appendChild(part);

      // The description of pets
      part = document.createElement("div");
      part.innerHTML = p.desc;
      part.className = "p-desc";
      item.appendChild(part);

      // The price of the pets//
      part = document.createElement("div");
      part.innerHTML = "£" + p.price;
      part.className = "p-price";
      item.appendChild(part);

      // This allows add pets into the cart//
      part = document.createElement("input");
      part.type = "button";
      part.value = "Add to Cart";
      part.className = "cart p-add";
      part.onclick = cart.add;
      part.dataset.id = id;
      item.appendChild(part);
    }

  },

  // The list of current pets that are in the cart
  list : function () {
    cart.hItems.innerHTML = "";
    let item, part, pdt;
    let empty = true;
    for (let key in cart.items) {
      if(cart.items.hasOwnProperty(key)) { empty = false; break; }
    }

    // The cart is empty when no pets are added
    if (empty) {
      item = document.createElement("div");
      item.innerHTML = "Cart is empty";
      cart.hItems.appendChild(item);
    }

    // This shows the pets inside the cart
    else {
      let p, total = 0, subtotal = 0;
      for (let id in cart.items) {
        // The type of pet
        p = products[id];
        item = document.createElement("div");
        item.className = "c-item";
        cart.hItems.appendChild(item);

        // The desc of pets//
        part = document.createElement("div");
        part.innerHTML = p.name;
        part.className = "c-name";
        item.appendChild(part);

        // Remove pets from cart
        part = document.createElement("input");
        part.type = "button";
        part.value = "X";
        part.dataset.id = id;
        part.className = "c-del cart";
        // an event listener waites for an even to occure for example waiting for a user to click
        part.addEventListener("click", cart.remove);
        item.appendChild(part);

        // The amount/quantity of pets
        part = document.createElement("input");
        part.type = "number";
        part.min = 0;
        part.value = cart.items[id];
        part.dataset.id = id;
        part.className = "c-qty";
        part.addEventListener("change", cart.change);
        item.appendChild(part);

        // calculates the sub total of pets//
        subtotal = cart.items[id] * p.price;
        total += subtotal;
      }

      // Adds up the total amount
      item = document.createElement("div");
      item.className = "c-total";
      item.id = "c-total";
      item.innerHTML ="TOTAL: $" + total;
      cart.hItems.appendChild(item);

      // This creates a empty button to click
      // the createElement creates an instance of the element for the specified tag.
      item = document.createElement("input");
      item.type = "button";
      item.value = "Empty";
      item.addEventListener("click", cart.nuke);
      item.className = "c-empty cart";
      cart.hItems.appendChild(item);

      // CHECKOUT BUTTONS
      item = document.createElement("input");
      item.type = "button";
      item.value = "Checkout";
      item.addEventListener("click", cart.checkout);
      item.className = "c-checkout cart";
      cart.hItems.appendChild(item);
    }
  },

  // (E) ADD ITEM INTO CART
  add : function () {
    if (cart.items[this.dataset.id] == undefined) {
      cart.items[this.dataset.id] = 1;
    } else {
      cart.items[this.dataset.id]++;
    }
    cart.save();
    cart.list();
  },

  // (F) CHANGE QUANTITY
  change : function () {
    // (F1) REMOVE ITEM
    if (this.value <= 0) {
      delete cart.items[this.dataset.id];
      cart.save();
      cart.list();
    }

    // (F2) UPDATE TOTAL ONLY
    else {
      cart.items[this.dataset.id] = this.value;
      var total = 0;
      for (let id in cart.items) {
        total += cart.items[id] * products[id].price;
        document.getElementById("c-total").innerHTML ="TOTAL: £" + total;
      }
    }
  },

  // This function removes items from the cart//
  remove : function () {
    delete cart.items[this.dataset.id];
    cart.save();
    cart.list();
  },

  // This pop-up with a diolog that the purchase is complete//
  checkout : function () {
    // SEND DATA TO SERVER
    // CHECKS
    // SEND AN EMAIL
    // RECORD TO DATABASE
    // PAYMENT
    // WHATEVER IS REQUIRED
    alert("Thanks for your purchase!");

    /*
    var data = new FormData();
    data.append('cart', JSON.stringify(cart.items));
    data.append('products', JSON.stringify(products));
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "SERVER-SCRIPT");
    xhr.onload = function(){ ... };
    xhr.send(data);
    */
  }
};
window.addEventListener("DOMContentLoaded", cart.init);

