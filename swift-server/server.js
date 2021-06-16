const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('./database.json')
const db = JSON.parse(fs.readFileSync('./database.json', 'UTF-8'))

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

server.get('/getAllDoors', (req, res) => {
  res.status(200).json(db.doorTable)
})

server.get('/getAllUsers', (req, res) => {
  res.status(200).json(db.userTable)
})

server.get('/fingerTable', (req, res) => {
  res.status(200).json(db.userTable)
})

server.get('/fingerTable', (req, res) => {
  res.status(200).json(db.userTable)
})

server.get('/fingerTable', (req, res) => {
  const token = req.query;

  //TODO: prüfen
  var elem = jwt_decode(req.body, { header: true });
  console.log(decodedHeader);

  //nexte zeile userID aus elem usw.
  if (db.accessTable.findIndex(access => access.userID === userID && access.doorID === doorID && access.startdate === startdate && access.enddate === enddate)){
    console.log(true)
    res.status(200).json(true)
  }else {
    console.log(false)
    res.status(200).json(false)
  }

})

server.post('/addaccess', (req, res) => {

  var elem = jwt_decode(req.body, { header: true });
  console.log(decodedHeader);

  fs.readFile("./database.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
    }

    var data = JSON.parse(data.toString());

    console.log(elem)

    //TODO: prüfen

    data.accessTable.push({userID: elem.get("userID"), doorID: elem.get("doorID"), startDate: elem.get("startDate"), endDate: elem.get("endDate")}); //add some data
    fs.writeFile("./database.json", JSON.stringify(data), (err, result) => {  // WRITE
      if (err) {
        const status = 401
        const message = err
        res.status(status).json({status, message})
        return
      }
    });
  })
});

server.listen(8000, () => {
  console.log('Run Auth API Server')
})

