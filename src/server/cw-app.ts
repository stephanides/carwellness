import Http from './App'
import { Init } from './init'

const port = 3434
const http = Http
const initApp = new Init()

Http.listen(port, (err) => {
  if (err) return console.log(err)
  else {
  	initApp.run()
  	return console.log(`server is listening on ${port}`)
  }
})