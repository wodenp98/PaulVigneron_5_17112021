// Récupération des données du local storage
let stockProductStorage= JSON.parse(localStorage.getItem("products")) ;
console.log(stockProductStorage)

let cartItems = document.getElementById("cart__items");
console.log(cartItems)


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

// Aller chercher les prix dans le panier
  for(let m in stockProductStorage) {
  let priceProductCart = stockProductStorage[m].price * stockProductStorage[m].quantity


  // Mettre les prix du panier dans la variable priceTotal
  priceTotal.push(priceProductCart)
  console.log(priceProductCart)
  }
  //Aditionner les prix du tableaux
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  const priceTotalCalcul = priceTotal.reduce(reducer);
  
  document.getElementById("totalQuantity").innerHTML = priceTotalCalcul

  console.log(priceTotalCalcul)

}
}

