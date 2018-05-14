import Http from './App'

const port = 4040
const http = Http

Http.listen(port, (err) => {
  if (err) return console.log(err)
  else return console.log(`server is listening on ${port}`)
})