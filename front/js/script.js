// Connexion à l'API
fetch('http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    // afficher les produits
    let items = document.getElementById('items')
    for(let i in data){
      items.innerHTML += `<a href="./product.html?id=${data[i]._id}">
      <article>
        <img src="${data[i].imageUrl}" alt="${data[i].altTxt}">
        <h3 class="productName">${data[i].name}</h3>
        <p class="productDescription">${data[i].description}</p>
      </article>
    </a>`
    }
  })
