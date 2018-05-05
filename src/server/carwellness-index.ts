import App from './App'

const port = 4040
const app = App

app.listen(port, (err) => {
  if (err) return console.log(err)
  else return console.log(`server is listening on ${port}`)
})