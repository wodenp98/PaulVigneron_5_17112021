// Confirmation du numéro de commande
let orderId = new URL(window.location.href).searchParams.get('id')
let showId = () => {
	let idCommand = document.querySelector('#orderId')
	if (document.URL.includes('confirmation.html')) {
		// Injection de l'id de commande dans le DOM 
		idCommand.innerHTML = orderId
	}
}


showId()
// Vider le localstorage
localStorage.clear()