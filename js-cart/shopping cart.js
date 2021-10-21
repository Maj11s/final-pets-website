var cart = {
  // the null indicate that the variable does not refer to any object 
  hPdt : null, // HTML pet list
  hItems : null, // HTML current cart
  items : {}, // Current pets in cart
  iURL : "../images/", // Pets images URL folder

  //Thhsi function will save information in the session storage//
  save : function () {
    sessionStorage.setItem("cart", JSON.stringify(cart.items));
  },

  // This will load the cart from session storage //
  loadpets : function () {
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
    cart.hPdt = document.getElementById("cart-petlist");
    cart.hItems = document.getElementById("cart-items");

    // This will create the lists of pets
    cart.hPdt.innerHTML = "";
    let p, item, part;
    for (let id in petlist) {
<<<<<<< HEAD
      // WRAPPER
=======
      // This part of the code creates the list of pets
>>>>>>> 976538c9ce29dc71c83653d00788cffa0f47f7c0
      p = petlist[id];
      item = document.createElement("div");
      // ClassName is referenced from: https://developer.mozilla.org/en-US/docs/Web/API/Element/className
      //The class name gets and sets the value of the class attribute of the specified element
      item.className = "p-list";
      cart.hPdt.appendChild(item);

      // Pet Images
      part = document.createElement("img");
      part.src = cart.iURL + p.img;
      part.className = "p-img";
      //An appendChild allows you to add a node to the end of the list.
      item.appendChild(part);

      // The type of pets
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
      part.className = "p-prices";
      item.appendChild(part);

      // This allows add pets into the cart//
      part = document.createElement("input");
      // they type Returns the content type of the object.
      part.type = "button";
<<<<<<< HEAD
      part.value = "Add to Shopping Cart";
=======
      // the value Returns the value of the data at the cursor's current position
      part.value = "Add to Cart";
>>>>>>> 976538c9ce29dc71c83653d00788cffa0f47f7c0
      part.className = "cart p-add";
      // The onClick triggers when the user clicks the left mouse button on the object
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
      // hasOwnProperty tag identfies whether an object has a property with the specified name.
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
      //This will dislay the total in £
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

      // This will create a checkout button
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

  // This part of the code will change the quanitity of pets added into the shopping cart
  change : function () {
    // this will if statement will remove items out of the shopping cart
    if (this.value <= 0) { //if the value is equal to or less than 0 it remove pets from the shopping cart
      delete cart.items[this.dataset.id]; 
      cart.save();
      cart.list();
    }

    // the else if statemnt will only update the total
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
    alert("Thanks for your purchase!");

    
    var data = new FormData();
    data.append('cart', JSON.stringify(cart.items));
    data.append('products', JSON.stringify(petlist));
    //  can retrieve data from a URL without having to do a full page refresh.
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "SERVER-SCRIPT");
    xhr.onload = function(){  };
    xhr.send(data);
  }
};
window.addEventListener("DOMContentLoaded", cart.init);

