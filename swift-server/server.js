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

//TODO: nur welche auf die er zugriff hat
server.get('/getAllDoors', (req, res) => {

  fs.readFile("./database.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
    }

    res.status(200)

    var data = JSON.parse(data.toString());

    res.status(200).json(data.doorTable)
  })
})

server.get('/getAllUsers', (req, res) => {
  res.status(200).json(db.userTable)
})

server.get('/fingerTable', (req, res) => {
  res.status(200).json(db.fingerTable)
})

server.get('/accessTable', (req, res) => {
  res.status(200).json(db.accessTable)
})

server.get('/getAllDoorsFromUser', (req, res) => {

  var {token} = req.query;
  var elem = jwt_decode(token);
  console.log(elem)
  var accessEl = [];

  fs.readFile("./database.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
    }

    res.status(200)

    var data = JSON.parse(data.toString());

    for (var i = 0; i < data.accessTable.length; i++) {
      if (data.accessTable[i] != null) {
        if (data.accessTable[i].userID == elem.userID ) {
          if (Date.parse(data.accessTable[i].enddate) > Date.now()) {
            accessEl.push(data.accessTable[i]);
          }
        }
      }
    }

    res.status(200).json(accessEl)
  })
})


server.get('/checkaccess', (req, res) => {

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

    res.status(200)

    var data = JSON.parse(data.toString());

    var result;
    //nexte zeile userID aus elem usw.
    console.log(elem.enddate)
    if (data.accessTable.findIndex(access => access.userID === elem.userID && access.doorID === elem.doorID && access.startdate === elem.startdate && access.enddate === elem.enddate) && elem.enddate >= Date.now()) {
      console.log(true)
      result = true
      res.status(200).json(result)
    } else {
      console.log(false)
      result = false
      res.status(200).json(result)
    }
  })
})

server.post('/addaccess', (req, res) => {

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

    //TODO: prüfen
    // console.log(data.get("doorID"))
    res.status(200)

    console.log("userid:", elem.userId);
    console.log("doorid:", elem.doorID);
    console.log("startDate:", elem.startDate);
    console.log("userid:", elem.endDate);

    data.accessTable.push({userID: elem.userID, doorID: elem.doorID, startDate: elem.startDate, endDate: elem.endDate}); //add some data
    fs.writeFile("./database.json", JSON.stringify(data, null, 2), (err, result) => {  // WRITE
      if (err) {
        const status = 401
        const message = err
        res.status(status).json({status, message})
        return
      }
    });
  })
  res.status(200);
  res.end();
});

server.post('/addUser', (req, res) => {

  const {firstname, lastname, email, role} = req.body.user;

  var userID = 0;

  fs.readFile("./database.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
    }

    res.status(200)

    var data = JSON.parse(data.toString());


    for (var i = 0; i <= data.userTable.length; i++) {
      if (data.userTable[i] !== undefined) {
        console.log(data.userTable[i].userID)
        if (data.userTable[i].userID > userID) {
          userID = data.userTable[i].userID;
        }
      }
    }

    userID = userID + 1;

    res.status(200)

    data.userTable.push({userID: userID, firstname: firstname, lastname: lastname, email: email, role: role}); //add some data

    fs.writeFile("./database.json", JSON.stringify(data, null, 2), (err, result) => {  // WRITE
      if (err) {
        const status = 401
        const message = err
        res.status(status).json({status, message})
        return
      }
    });
  })
  res.status(200);
  res.end();
});

//TODO:
//add user
server.post('/addUser', (req, res) => {

  var token = req.body.user;
  console.log(token);
  const {userID, firstname, lastname, email, role} = req.body.user;
  console.log(userID, lastname);

  fs.readFile("./database.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
    }

    res.status(200)

    var data = JSON.parse(data.toString());

    data.userTable.push({userID: userID, firstname: firstname, lastname: lastname, email: email, role: role}); //add some data

    fs.writeFile("./database.json", JSON.stringify(data, null, 2), (err, result) => {  // WRITE
      if (err) {
        const status = 401
        const message = err
        res.status(status).json({status, message})
        return
      }
    });
  })
  res.status(200);
  res.end();
});


server.listen(8000, () => {
  console.log('Run Auth API Server')
})

