import { buildNewTrip } from './newTripBuilder'

function buildHeadlineRow (parentDiv) {
  const headlineFragment = new DocumentFragment()
  // const tripHeadline = document.querySelector('#tripHeadline')

  const headlineRow = document.createElement('section')
  headlineRow.classList.add('headline-row')
  headlineRow.setAttribute('id', 'headlineRow')

  const headerWrapper = document.createElement('div')
  headerWrapper.classList.add('headline-row__header-wrapper')
  const headerElm = document.createElement('h2')
  headerElm.innerHTML = 'My Trips:'
  headerElm.classList.add('headline-row__headline')
  headerWrapper.appendChild(headerElm)
  headlineRow.appendChild(headerWrapper)

  const tripButtonWrapper = document.createElement('div')
  tripButtonWrapper.classList.add('headline-row__button-wrapper')
  const buttonElm = document.createElement('button')
  buttonElm.classList.add('headline-row__button')
  buttonElm.classList.add('btn-primary')
  buttonElm.classList.add('btn-primary')
  buttonElm.setAttribute('id', 'buildForm')
  // eslint-disable-next-line no-undef
  buttonElm.addEventListener('click', Client.buildNewTrip)
  buttonElm.setAttribute('type', 'submit')
  buttonElm.setAttribute('value', 'submit')
  buttonElm.innerHTML = '+ ADD TRIP'
  tripButtonWrapper.appendChild(buttonElm)
  headlineRow.appendChild(tripButtonWrapper)

  headlineFragment.append(headlineRow)
  parentDiv.prepend(headlineFragment)
}

export { buildHeadlineRow }
