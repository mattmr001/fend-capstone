function checkUrl (inputText) {
  console.log('::: Running checkForName :::', inputText)
  const url = /^(ftp|http|https):\/\/[^ "]+$/
  return url.test(inputText)
}

export { checkUrl }
