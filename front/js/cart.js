// Récupération des données du local storage
let stockProductStorage= JSON.parse(localStorage.getItem("products")) ;
console.log(stockProductStorage)

let cartItems = document.getElementById("cart__items");

// Si le panier est vide
if (stockProductStorage === null) {
  cartItems.innerHTML +=`
   <div class="cart__item__img">
    <p>Merci de sélectionner un produit</p>
    </div>`
}

// Si le panier contient un produit
else {      
  for (let i in stockProductStorage){
   

    // Intégration des éléments dans le panier

    let priceProduct = stockProductStorage[i].price * stockProductStorage[i].quantity;
    
    cartItems.innerHTML +=` 
  
  <article class="cart__item" data-id=${stockProductStorage[i].id} data-color="${stockProductStorage[i].color}">
    <div class="cart__item__img">
      <img src=${stockProductStorage[i].img} alt=${stockProductStorage[i].altTxt}>

    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${stockProductStorage[i].name}</h2>
        <p>${priceProduct}€</p>
      </div>
      <div class="cart__item__content__settings">
      <p>Couleur : ${stockProductStorage[i].color}</p>
        <div class="cart__item__content__settings__quantity">
          <p>Qté :  </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${stockProductStorage[i].quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article> 
    `

    // Quantité total dans le panier 
  let priceTotal = [];
  let productQuantity = document.getElementsByClassName("itemQuantity");
  let productTotal = 0;

  for(let i = 0; i < productQuantity.length; i++) {
    productTotal += productQuantity[i].valueAsNumber;
  }

 let productTotalQuantity = document.getElementById("totalQuantity");
  productTotalQuantity.innerHTML = productTotal;

// Aller chercher les prix dans le panier
  for(let i in stockProductStorage) {
    let priceProductCart = stockProductStorage[i].price * stockProductStorage[i].quantity

  // Mettre les prix du panier dans la variable priceTotal
    priceTotal.push(priceProductCart)
  }

  //Aditionner les prix du tableaux
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  const priceTotalCalcul = priceTotal.reduce(reducer);
  
  document.getElementById("totalPrice").innerHTML = priceTotalCalcul

  

//Supprimer un produit

  let deleteProduct = document.querySelectorAll(".deleteItem");

  for (let i = 0; i < deleteProduct.length; i++) {
    deleteProduct[i].addEventListener("click", (event) => {
      event.preventDefault();
      stockProductStorage.splice(i, 1);
      localStorage.setItem("products", JSON.stringify(stockProductStorage));
      location.reload();
    });
  }

// Modifier la quantité

//  let modifyQuantity = document.getElementsByClassName('itemQuantity')

//  modifyQuantity.addEventListener('change', () => {
//    if (modifyQuantity[i].value > 100) {
//      modifyQuantity[i].value = 100
//      alert('Vous ne pouvez dépasser 100 unités pour ce produit')
//    }
//    else {
//      stockProductStorage[i].quantity = modifyQuantity[i].value
//      localStorage.setItem("products", JSON.stringify(stockProductStorage))
//    }
//  })


// Formulaire 


}}
