function buildForm (parentDiv) {
  // eslint-disable-next-line no-undef
  function buildFieldGroupLocationDiv (parentForm) {
    const formFieldGroupLocationDiv = document.createElement('div')
    formFieldGroupLocationDiv.classList.add('form__field-group')

    const formFieldGroupCityInput = document.createElement('input')
    formFieldGroupCityInput.classList.add('form__field')
    formFieldGroupCityInput.setAttribute('type', 'text')
    formFieldGroupCityInput.setAttribute('id', 'city')
    formFieldGroupCityInput.setAttribute('placeholder', 'Enter City')
    formFieldGroupLocationDiv.appendChild(formFieldGroupCityInput)

    const formFieldGroupCountryInput = document.createElement('input')
    formFieldGroupCountryInput.classList.add('form__field')
    formFieldGroupCountryInput.setAttribute('type', 'text')
    formFieldGroupCountryInput.setAttribute('id', 'country')
    formFieldGroupCountryInput.setAttribute('placeholder', 'Enter Country Code')

    formFieldGroupLocationDiv.appendChild(formFieldGroupCountryInput)
    parentForm.append(formFieldGroupLocationDiv)
  }
  function buildFieldGroupDatesDiv (parentForm) {
    const formFieldGroupDatesDiv = document.createElement('div')
    formFieldGroupDatesDiv.classList.add('form__field-group')

    const formFieldGroupStartDateInput = document.createElement('input')
    formFieldGroupStartDateInput.classList.add('form__field')
    formFieldGroupStartDateInput.setAttribute('type', 'date')
    formFieldGroupStartDateInput.setAttribute('id', 'startDate')
    formFieldGroupStartDateInput.setAttribute('placeholder', 'Start Date')
    formFieldGroupDatesDiv.appendChild(formFieldGroupStartDateInput)

    const formFieldGroupEndDateInput = document.createElement('input')
    formFieldGroupEndDateInput.classList.add('form__field')
    formFieldGroupEndDateInput.setAttribute('type', 'date')
    formFieldGroupEndDateInput.setAttribute('id', 'endDate')
    formFieldGroupEndDateInput.setAttribute('placeholder', 'End Date')
    formFieldGroupDatesDiv.appendChild(formFieldGroupEndDateInput)
    parentForm.append(formFieldGroupDatesDiv)
  }
  function buildFormButton (parentForm) {
    const buttonElm = document.createElement('button')
    buttonElm.classList.add('btn-primary')
    buttonElm.setAttribute('type', 'submit')
    buttonElm.setAttribute('id', 'generate')
    buttonElm.setAttribute('value', 'submit')
    buttonElm.innerHTML = 'Search'
    parentForm.appendChild(buttonElm)
  }
  function buildFormDiv (parentDiv) {
    const formElm = document.createElement('form')
    formElm.classList.add('form')
    formElm.setAttribute('id', 'myForm')
    formElm.setAttribute('onsubmit', 'return Client.handleSubmit(event)')
    buildFieldGroupLocationDiv(formElm)
    buildFieldGroupDatesDiv(formElm)
    buildFormButton(formElm)
    parentDiv.append(formElm)
  }
  function buildFormWrapper (parentDiv) {
    const formFragment = new DocumentFragment()
    const formWrapper = document.createElement('section')
    formWrapper.classList.add('form-wrapper')
    formWrapper.setAttribute('id', 'formWrapper')
    buildFormDiv(formWrapper)
    formFragment.append(formWrapper)
    parentDiv.prepend(formFragment)
  }
  buildFormWrapper(parentDiv)
}

export { buildForm }

// const addTripButton = document.getElementById('buildForm')
// addTripButton.addEventListener('click', addTripForm)
//
// function addTripForm (event) {
//   event.preventDefault()
//
//   const formFragment = new DocumentFragment()
//   const formWrapper = document.querySelector('#formWrapper')
//   const trips = document.querySelector('#trips')
//   const tripHeadline = document.querySelector('#tripHeadline')
//
//   function buildForm (docFragment) {
//     function buildFieldGroupLocationDiv (parentForm) {
//       const formFieldGroupLocationDiv = document.createElement('div')
//       formFieldGroupLocationDiv.classList.add('form__field-group')
//
//       const formFieldGroupCityInput = document.createElement('input')
//       formFieldGroupCityInput.classList.add('form__field')
//       formFieldGroupCityInput.setAttribute('type', 'text')
//       formFieldGroupCityInput.setAttribute('id', 'city')
//       formFieldGroupCityInput.setAttribute('placeholder', 'Enter City')
//       formFieldGroupLocationDiv.appendChild(formFieldGroupCityInput)
//
//       const formFieldGroupCountryInput = document.createElement('input')
//       formFieldGroupCountryInput.classList.add('form__field')
//       formFieldGroupCountryInput.setAttribute('type', 'text')
//       formFieldGroupCountryInput.setAttribute('id', 'country')
//       formFieldGroupCountryInput.setAttribute('placeholder', 'Enter Country Code')
//
//       formFieldGroupLocationDiv.appendChild(formFieldGroupCountryInput)
//       parentForm.append(formFieldGroupLocationDiv)
//     }
//     function buildFieldGroupDatesDiv (parentForm) {
//       const formFieldGroupDatesDiv = document.createElement('div')
//       formFieldGroupDatesDiv.classList.add('form__field-group')
//
//       const formFieldGroupStartDateInput = document.createElement('input')
//       formFieldGroupStartDateInput.classList.add('form__field')
//       formFieldGroupStartDateInput.setAttribute('type', 'date')
//       formFieldGroupStartDateInput.setAttribute('id', 'startDate')
//       formFieldGroupStartDateInput.setAttribute('placeholder', 'Start Date')
//       formFieldGroupDatesDiv.appendChild(formFieldGroupStartDateInput)
//
//       const formFieldGroupEndDateInput = document.createElement('input')
//       formFieldGroupEndDateInput.classList.add('form__field')
//       formFieldGroupEndDateInput.setAttribute('type', 'date')
//       formFieldGroupEndDateInput.setAttribute('id', 'endDate')
//       formFieldGroupEndDateInput.setAttribute('placeholder', 'End Date')
//       formFieldGroupDatesDiv.appendChild(formFieldGroupEndDateInput)
//       parentForm.append(formFieldGroupDatesDiv)
//     }
//     function buildFormButton (parentForm) {
//       const buttonElm = document.createElement('button')
//       buttonElm.classList.add('btn-primary')
//       buttonElm.setAttribute('type', 'submit')
//       buttonElm.setAttribute('id', 'generate')
//       buttonElm.setAttribute('value', 'submit')
//       buttonElm.innerHTML = 'Search'
//       parentForm.appendChild(buttonElm)
//     }
//     const formElm = document.createElement('form')
//     formElm.classList.add('form')
//     formElm.setAttribute('id', 'myForm')
//     formElm.setAttribute('onsubmit', 'return Client.handleSubmit(event)')
//     buildFieldGroupLocationDiv(formElm)
//     buildFieldGroupDatesDiv(formElm)
//     buildFormButton(formElm)
//     docFragment.append(formElm)
//   }
//   buildForm(formFragment)
//   // trips.append(formFragment)
//   formWrapper.append(formFragment)
// }
//
// export { addTripForm }
