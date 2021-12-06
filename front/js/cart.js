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


  // Nombre total de produit
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

// Prénom 

let formFirstName = document.getElementById('firstName');
let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");


// Ecouter la modification du prénom
  formFirstName.addEventListener('change', function(){
  validFirstName(this)
});

const validFirstName = function(inputFirstName){

  // création de la reg exp pour le prénom
  let firstNameRegExp = new RegExp (/^[a-zA-ZÀ-ÿ_-]{2,30}$/);

  // On teste l'expression régulière
  let testFirstName = firstNameRegExp.test(inputFirstName.value);
    console.log(testFirstName)

  if (testFirstName){
    firstNameErrorMsg.innerHTML = 'Prénom Valide';
  }
  else{
    firstNameErrorMsg.innerHTML = 'Prénom Non Valide' ; 
  }
};


// Nom de famille

let formLastName = document.getElementById('lastName');
let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');


// Ecouter la modification du nom
formLastName.addEventListener('change', function(){
  validLastName(this)
});

const validLastName = function(inputLastName){

  // création de la reg exp pour le nom
  let lastNameRegExp = new RegExp (/^[a-zA-ZÀ-ÿ_-]{2,50}$/);

  // On teste l'expression régulière
  let testLastName = lastNameRegExp.test(inputLastName.value);
    console.log(testLastName)

  if (testLastName){
    lastNameErrorMsg.innerHTML = 'Nom Valide';
  }
  else{
    lastNameErrorMsg.innerHTML = 'Nom Non Valide' ; 
  }
};


// Adresse 

let formAdress = document.getElementById('address');
let addressErrorMsg = document.getElementById('addressErrorMsg');


// Ecouter la modification de l'adresse
formAdress.addEventListener('change', function(){
  validAdress(this)
});

const validAdress = function(inputAdress){

  // création de la reg exp pour l'adresse
  let adressRegExp = new RegExp (/^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,100}$/);

  // On teste l'expression régulière
  let testAdress = adressRegExp.test(inputAdress.value);
    console.log(testAdress)

  if (testAdress){
    addressErrorMsg.innerHTML = 'Addresse Valide';
  }
  else{
    addressErrorMsg.innerHTML = 'Adresse Non Valide' ; 
  }
};


// Ville

let formCity = document.getElementById('city')
let cityErrorMsg = document.getElementById('cityErrorMsg')

// Ecouter la modification de la ville
formCity.addEventListener('change', function(){
  validCity(this)
});

const validCity = function(inputCity){

  // création de la reg exp pour le ville
  let cityRegExp = new RegExp (/^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,100}$/);

  // On teste l'expression régulière
  let testCity = cityRegExp.test(inputCity.value);
    console.log(testCity)

  if (testCity){
    cityErrorMsg.innerHTML = 'Ville Valide';
  }
  else{
    cityErrorMsg.innerHTML = 'Ville Non Valide' ; 
  }
};


// Email 

let formEmail = document.getElementById('email')
let emailErrorMsg = document.getElementById('emailErrorMsg')

// Ecouter la modification de l'email
formEmail.addEventListener('change', function(){
  validEmail(this)
});

const validEmail = function(inputEmail){

  // création de la reg exp pour l'email
  let emailRegExp = new RegExp ('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-zA-Z]{2,3}$', 'g');

  // On teste l'expression régulière
  let testEmail = emailRegExp.test(inputEmail.value);
    console.log(testEmail)

  if (testEmail){
    emailErrorMsg.innerHTML = 'Email Valide';
  }
  else{
    emailErrorMsg.innerHTML = 'Email Non Valide' ; 
  }
};
































}}
