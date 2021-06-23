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
        //TODO: Datumsformat passt nicht
        console.log(data.accessTable[i].endDate, ":", Date.parse(data.accessTable[i].endDate))
        if (data.accessTable[i].userID == elem.userID) {
          if (Date.parse(data.accessTable[i].endDate) >= Date.now()) {
            console.log("hi")
            accessEl.push(data.accessTable[i]);
          }
        }
      }
    }

    res.status(200).json(accessEl)
  })
})


server.get('/checkaccess', (req, res) => {

  var {token} = req.query;
  var elem = jwt_decode(token);

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
    for (let i = 0; i < data.accessTable.length; i++) {
      if (data.accessTable[i].userID == elem.userID && data.accessTable[i].doorID == elem.doorID && data.accessTable[i].startdate === elem.startdate && data.accessTable[i].enddate === elem.enddate) {
        if (Date.parse(data.accessTable[i].endDate) >= Date.now()) {
          result = true
        }
      } else {
        result = false
      }
    }
    res.status(200).json(result)
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
  res.status(200).json(elem.doorID);
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

//TODO: delete user
server.delete('/deleteUser', (req, res) => {

  const {userID} = req.query;
  console.log(userID);

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
        if (data.accessTable[i].userID == userID) {
          console.log(data.accessTable[i])
          //delete data.accessTable[i];
          data.accessTable.splice(j, 1);
        }
      }
    }

    for (var j = 0; j < data.userTable.length; j++) {
      if (data.userTable[j] != null) {
        if (data.userTable[j].userID == userID) {
          //delete data.userTable[j];
          data.userTable.splice(j, 1);
        }
      }
    }

    console.log(data.userTable)

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

})


server.listen(8000, () => {
  console.log('Run Auth API Server')
})

