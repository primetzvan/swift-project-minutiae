const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode');

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
  console.log(elem);

  var result;
  //nexte zeile userID aus elem usw.
  if (db.accessTable.findIndex(access => access.userID === userID && access.doorID === doorID && access.startdate === startdate && access.enddate === enddate)){
    console.log(true)
    result = true
    res.status(200).json(result)
  }else {
    console.log(false)
    result = false
    res.status(200).json(result)
  }

})

server.post('/addaccess', (req, res) => {

  console.log(req.body.token)
  var token = req.body.token;
   var elem = jwt_decode(token);
   console.log(elem);

   fs.readFile("./database.json", (err, data) => {
     if (err) {
       const status = 401
       const message = err
       res.status(status).json({status, message})
       return
     }

     var data = JSON.parse(data.toString());

     console.log(data)

     //TODO: prüfen
    // console.log(data.get("doorID"))
    res.status(200)

     //data.accessTable.push({userID: data.get("userID"), doorID: data.get("doorID"), startDate: data.get("startDate"), endDate: data.get("endDate")}); //add some data
     fs.writeFile("./database.json", JSON.stringify(data, null, 2), (err, result) => {  // WRITE
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

