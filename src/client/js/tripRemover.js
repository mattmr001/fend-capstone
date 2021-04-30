function removeTrip (event) {
  event.preventDefault()
  const mainElm = document.querySelector('#mainContainer')
  // eslint-disable-next-line no-undef
  Client.buildForm(mainElm)
  // const addTripButton = document.getElementById('buildForm')
  // addTripButton.addEventListener('click', buildNewTrip)
  const headlineRow = document.getElementById('headlineRow')
  headlineRow.remove()
}

export { removeTrip }
