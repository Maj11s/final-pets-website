var cart = {
  hPdt : null, // HTML pet list
  hItems : null, // HTML current cart
  items : {}, // Current pets in cart
  iURL : "../images/", // Pets images URL folder

  //Thhsi function will save information in the session storage//
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
  delete : function () {
    if (confirm("Empty your shopping cart?")) {
      cart.items = {};
     // sessionStorage will store data only for a session/temporary this will clear data when the browser is closed,
     // this will also remove all the data from the session storage
      sessionStorage.removeItem("cart");
      cart.list();
    }
  },

 
  init : function () {
    // the getElement returns a reference to the first object with the specified value.
    cart.hPdt = document.getElementById("cart-products");
    cart.hItems = document.getElementById("cart-items");

    // This will create the lists of pets
    cart.hPdt.innerHTML = "";
    let p, item, part;
    for (let id in petlist) {
      // WRAPPER
      p = petlist[id];
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

      // The price of the pets
      part = document.createElement("div");
      part.innerHTML = "£" + p.price;
      part.className = "p-price";
      item.appendChild(part);

      // This allows add pets into the cart//
      part = document.createElement("input");
      part.type = "button";
      part.value = "Add to Shopping Cart";
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
    for (let key in cart.items) { //
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
      let p, total = 0, subtotal = 0; // this just creates three variables
      for (let id in cart.items) {
        // The type of pet
        p = petlist[id];
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

        // calculates the sub total of pets
        subtotal = cart.items[id] * p.price;
        total += subtotal; // This calculate overall pets prices in the shopping cart
      }

      // Adds up the total amount of pets and displaying that in a div
      item = document.createElement("div");
      item.className = "c-total";
      item.id = "c-total";
      item.innerHTML ="TOTAL: £" + total;
      cart.hItems.appendChild(item);

      // This creates a empty button to click
      // the createElement creates an instance of the element for the specified tag.
      item = document.createElement("input");
      item.type = "button";
      item.value = "Empty";
      item.addEventListener("click", cart.delete); //when clicking the delete button this will clear the pets
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

  // This will essentially add pets into the cart
  add : function () {
    if (cart.items[this.dataset.id] == undefined) { //if nothing 
      cart.items[this.dataset.id] = 1; // if this data set isnt empty it will then add 1 to it
    } else {
      cart.items[this.dataset.id]++; // This will keep adding pets into the shopping cart
    }
    cart.save();
    cart.list();
  },

  // (F) CHANGE QUANTITY
  change : function () {
    // (F1) REMOVE ITEM
    if (this.value <= 0) { //if the value is equal to or less than 0 it remove pets from the shopping cart
      delete cart.items[this.dataset.id]; 
      cart.save();
      cart.list();
    }

    // UPDATE TOTAL ONLY
    else {
      cart.items[this.dataset.id] = this.value;
      var total = 0; // creates a variable
      for (let id in cart.items) {
        total += cart.items[id] * petlist[id].price; // it gets the pet prices to the total amount and re-calculating it.
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

  // This will pop-up with an alert box that the purchase is complete//
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

