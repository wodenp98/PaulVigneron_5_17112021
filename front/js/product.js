// lien entre un produit de la page accueil et la page produit
let url = new URL(window.location.href);

// Récupération de l'id du produit à afficher
let idProduct = url.searchParams.get("id");
console.log(idProduct);

// Récupérer les détails du produit
    fetch(`http://localhost:3000/api/products/${idProduct}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);

// Sélection des éléments html 
    let image = document.querySelector(".item__img");
    let title =  document.getElementById("title");
    let price = document.getElementById("price");
    let description = document.getElementById("description"); 
    let colors = document.getElementById("colors");

//Ajout des détails du produit
    image.innerHTML = `<img id="image" src="${data.imageUrl}" alt="${data.altTxt}">`
    title.innerHTML = `<h1 id="title">${data.name}</h1>`
    price.innerHTML = `<span id="price">${data.price}</span>`
    description.innerHTML = `<p id="description">${data.description}</p>`

//Boucle pour les couleurs 
    for(let i in data.colors) {
        colors.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`
    }
});

//Ecoute de l'evenement au clic du bouton
let addShop = document.getElementById("addToCart");
addShop.addEventListener("click", (event)=> {
event.preventDefault();

//Création d'un objet à ajouter au panier
let quantityProduct = document.getElementById("quantity").value;
let colorProduct = document.getElementById("colors").value;
let imageProduct = document.getElementById("image").src;
let titleProduct = document.getElementById("title").textContent;
let priceProduct = document.getElementById("price").textContent;

console.log(imageProduct);

// Affectation des éléments html
let productShop = {
   id: idProduct,
   quantity: quantityProduct,
   color: colorProduct,
   img: imageProduct,
   name: titleProduct,
   price: priceProduct
};

//Local storage
// conversion des données au format json qui sont dans le local storage
 let stockProductStorage = JSON.parse(localStorage.getItem("products"));

//Si le panier contient un produit
 if(stockProductStorage) {
   let productFind = stockProductStorage.find((product) => product.id === idProduct && product.color === colorProduct);

//Si le produit est le même que dans le panier 
   if(productFind) {
     productFind.quantity = parseInt(productShop.quantity) + parseInt(productFind.quantity);
   }
   
//Si le produit n'est pas dans le panier
   else {
   stockProductStorage.push(productShop);
   }
   localStorage.setItem("products", JSON.stringify(stockProductStorage));
   
 }

 //Si il n'y a pas de produit dans le panier
 else {
   stockProductStorage = [];
   stockProductStorage.push(productShop);
   localStorage.setItem("products", JSON.stringify(stockProductStorage));
 }

});

