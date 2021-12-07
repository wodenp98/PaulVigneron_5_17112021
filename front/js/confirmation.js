let orderId = new URL(window.location.href).searchParams.get('id')
let showId = () => {
	let idCommand = document.querySelector('#orderId')
	if (document.URL.includes('confirmation.html')) {
		idCommand.innerHTML = orderId
	}
}


showId()
localStorage.clear()