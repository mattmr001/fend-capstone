const index = require('./index')

let port = process.env.PORT
if (port == null || port === '') {
  port = 8081
}
index.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
