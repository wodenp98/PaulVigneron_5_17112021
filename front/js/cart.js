// Récupération des données du local storage
let stockProductStorage= JSON.parse(localStorage.getItem("products")) ;
console.log(stockProductStorage)

// Injecter l'html dans le DOM
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
  }

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

  // Additionner les prix du tableaux
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

// Modifier la quantité d'un produit
function modifyQuantity() {
  let quantityModify = document.querySelectorAll(".itemQuantity");

  for (let k = 0; k < quantityModify.length; k++) {
      quantityModify[k].addEventListener("change", (event) => {

          event.preventDefault();

          //intégrer la nouvelle quantité dans un tableau 
          let quantityModif = quantityModify[k].value;
          const newLocalStorage = {
              id: stockProductStorage[k].id,
              img: stockProductStorage[k].img,
              altTxt: stockProductStorage[k].altTxt,
              name: stockProductStorage[k].name,
              color: stockProductStorage[k].color,
              price: stockProductStorage[k].price,
              quantity: quantityModif
          };

          stockProductStorage[k] = newLocalStorage;


          localStorage.setItem("products", JSON.stringify(stockProductStorage));
          location.reload();

      })

  }
}
modifyQuantity();
}


// Formulaire 

let form = document.querySelector('.cart__order__form')
console.log(form)




// Ecouter la modification du prénom
form.firstName.addEventListener('change', function() {
  validFirstName(this);
});

// Ecouter la modification du nom 
form.lastName.addEventListener('change', function() {
  validLastName(this);
})

// Ecouter la modification de l'adresse
form.address.addEventListener('change', function() {
  validAddress(this);
})

// Ecouter la modification de la ville 
form.city.addEventListener('change', function() {
  validCity(this);
})

// Ecouter la modification de l'email
form.email.addEventListener('change', function() {
  validEmail(this);
});


// Ecouter la soumission du formulaire
form.addEventListener('submit', function(e){
  e.preventDefault();
  if(validFirstName(form.firstName) && validLastName(form.lastName) && validAddress(form.address) && validCity(form.city) && validEmail(form.email)){
    form.submit();
  }else{
    alert('Veuillez remplir le formulaire')
  }
})




// Validation prénom

const validFirstName = function(inputFirstName){

  // création de la reg exp pour le prénom
  let firstNameRegExp = new RegExp (/^[a-zA-ZÀ-ÿ_-]{2,50}$/);
 
  // Récupération du message de validation ou d'erreur
  let errorFirstName = inputFirstName.nextElementSibling;
  let checkFirstName = firstNameRegExp.test(inputFirstName.value)

  // On teste l'expression régulière
  if (checkFirstName){
    errorFirstName.innerHTML = 'Prénom Valide';
    return inputFirstName.value
  }
  else{
    errorFirstName.innerHTML = 'Prénom Non Valide' ; 
  }
  console.log(checkFirstName)
  return checkFirstName
  
};

// Validation nom

const validLastName = function(inputLastName) {
  // Création de la reg exp pour validation du nom
  let lastNameRegExp = new RegExp (/^[a-zA-ZÀ-ÿ_-]{2,50}$/);


  // Récupération du message de validation ou d'erreur
  let errorLastName = inputLastName.nextElementSibling;
  let checkLastName = lastNameRegExp.test(inputLastName.value)

  // On teste l'expression régulière
  if(checkLastName){
    errorLastName.innerHTML = 'Nom Valide';
    return inputLastName.value
  }else {
    errorLastName.innerHTML = 'Nom Non Valide';
  }
  console.log(checkLastName)
  return checkLastName
}

// Validation de l'adresse

const validAddress = function(inputAddress) {
  // Création de la reg exp pour validation de l'adresse
  let addressRegExp = new RegExp ("^[-'a-zA-Z0-9À-ÖØ-öø-ÿ\s_ ]{3,}$", "g");

  // Récupération du message de validation ou d'erreur
  let errorAddress = inputAddress.nextElementSibling;
  checkAddress = addressRegExp.test(inputAddress.value)

  // On teste l'expression régulière
  if(checkAddress){
    errorAddress.innerHTML = 'Adresse Valide';
    return inputAddress.value
  }else {
    errorAddress.innerHTML = 'Adresse Non Valide';
  }
  console.log(checkAddress)
  return checkAddress
}

// Validation Ville

const validCity = function(inputCity) {
  // Création de la reg exp pour validation de la ville
  let cityRegExp = new RegExp ("^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s_ ]{3,}$", "g");

  // Récupération du message de validation ou d'erreur
  let errorCity = inputCity.nextElementSibling;
  let checkCity = cityRegExp.test(inputCity.value)

  // On teste l'expression régulière
  if(checkCity){
    errorCity.innerHTML = 'Ville Valide';
    return inputCity.value
  }else {
    errorCity.innerHTML = 'Ville Non Valide';
  }
  console.log(checkCity)
  return checkCity
}


// Validation Email

const validEmail = function(inputEmail) {
  // Création de la reg exp pour validation de l'email
  let emailRegExp = new RegExp ('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-zA-Z]{2,3}$', 'g');

  // Récupération du message de validation ou d'erreur
  let errorEmail = inputEmail.nextElementSibling;
  let checkEmail = emailRegExp.test(inputEmail.value)

  // On teste l'expression régulière
  if(checkEmail){
    errorEmail.innerHTML = 'Email Valide';
    return inputEmail.value
  }else {
    errorEmail.innerHTML = 'Email Non Valide';
  }
  console.log(checkEmail)
  return checkEmail
}




// Récupération des valeurs du formulaire

let buttonOrder = document.getElementById('order')

buttonOrder.addEventListener('click', (e) => {
  e.preventDefault();

// Récupération des éléments sous le format contact comme indiqué dans le back end
  let contact = {
    firstName: validFirstName(form.firstName),
    lastName: validLastName(form.lastName),
    address: validAddress(form.address),
    city: validCity(form.city),
    email: validEmail(form.email)

  }
 
// Injections des produits présents dans le localstorage sous la variable products pour respecter le back end
  let products = [];
  for (i = 0; i < stockProductStorage.length; i++){
    let productId = stockProductStorage[i].id;
    products.push(productId)
  }



  // Mettre les valeurs du formulaire dans le localstorage

  localStorage.setItem("contact",JSON.stringify(contact))

  // Envoie des valeurs vers le serveur
  let sendForm = {
    contact, products
  }

console.log(sendForm)

// Envoie de la variable sendForm vers le serveur

  let promiseForm = fetch('http://localhost:3000/api/products/order', {
    method: "POST",
    headers: {"Content-Type": "application/json"},  
    body: JSON.stringify(sendForm),
    
})

  // Pour voir le résultat du serveur dans la console 
  promiseForm.then(async(response) => {
    try{
      const content = await response.json();

      if (response.ok && stockProductStorage){

        // Aller vers la page de confirmation  
        window.location = `../html/confirmation.html?id=${content.orderId}`
      }else {
        console.log(response.status)
      }

    }catch(e){
      console.log(e);
    }
  })
  

})
