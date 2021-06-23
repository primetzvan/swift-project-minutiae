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

const SECRET_KEY = '123456789'

const expiresIn = '1h'

function addToDB(userID, doorID, startdate, enddate) {
  fs.readFile("./database.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
    }
    ;

    // Get current users data
    var data = JSON.parse(data.toString());

    //Add new user
    data.accessTable.push({userID: userID, doorID: doorID, startdate: startdate, enddate: enddate}); //add some data
    fs.writeFile("./database.json", JSON.stringify(data, null, 2), (err, result) => {  // WRITE
      if (err) {
        const status = 401
        const message = err
        res.status(status).json({status, message})
        return
      }
    });
  });
}

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}


// Check if the access exists in database
function isAuthenticated({userID, doorID, startdate, enddate}) {
  return db.accessTable.findIndex(access => access.userID === userID && access.doorID === doorID && access.startDate === startdate && access.endDate === enddate) !== -1
}


// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
}

// serve token as QrCode

server.get('/getQrCode', (req, res) => {
  console.log("test; request body:");
  console.log(req.body);
  console.log("Query =", req.query)
  // Access the provided 'user' and 'door' query parameters
  const {userID, doorID, startDate, endDate} = req.query;
  var access_token;

  if (isAuthenticated({userID, doorID, startDate, endDate}) === true) {
    const status = 401;
    const message = 'existiert schon';
    res.status(status).json({status, message});
    return
  }

  addToDB(userID, doorID, startDate, endDate);

  if (userID && doorID && startDate && endDate) {
    console.log("USER:" + userID + " DOOR:" + doorID + " STARTDATE:" + startDate + " ENDDATE:" + endDate);
    access_token = createToken({userID, doorID, startDate, endDate}, expiresIn);
    console.log("Access Token:" + access_token);
  }


  var expUnixTS = verifyToken(access_token).exp;
  console.log(expUnixTS);

  const htmlText = `
  <!DOCTYPE html>
  <html lang="de">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <script type="text/javascript" src="jquery.min.js"></script>
    <script type="text/javascript" src="qrcode.min.js"></script>
    <script type="text/javascript">
      const user = "` + userID + `";
      const door = "` + doorID + `";
      const startdate = "` + startDate + `";
      const enddate = "` + endDate + `";
      const expUnixTS = "` + expUnixTS + `";
      const access_token = "` + access_token + `";
    </script><title></title>
  </head>
  <body>
    <div id="qrcode"></div>
    <script src="qrOfJwt.js"></script>
  </body>
  </html>
  `;

  console.log(htmlText);
  res.end(htmlText);
});

// serve qrcode file to client
server.get('/qrcode.min.js', (req, res) => {
  const filePath = __dirname + '/qrcode.min.js'
  res.sendFile(filePath);
});

// serve jquery to client
server.get('/jquery.min.js', (req, res) => {
  const filePath = __dirname + '/jquery.min.js'
  res.sendFile(filePath);
});

// serve token as QrCode
// server.get('/qrOfJwt.js', (req, res) => {
//
//   var text = 'access_token'
//   res.type('.js');
//   const htmlText = `new QRCode(document.getElementById("qrcode"), `
//     + text + `);\nconsole.log(access_token);`
//     + `\nconsole.log("Expire: " + new Date(expUnixTS * 1000));`;
//   res.end(htmlText);
// });


// serve token as QrCode
server.get('/qrOfJwt.js', (req, res) => {
  var text = 'access_token'
  res.type('.js');
  // reder bugfix because of to small access_token length
  // see: https://stackoverflow.com/questions/30796584/qrcode-js-error-code-length-overflow-17161056
  const htmlText = `console.log(access_token);\nif(access_token.length < 220) {\n new_access_token = access_token + Array(220-access_token.length).fill(' ').join('');\n new QRCode(document.getElementById("qrcode"),  new_access_token);\n}else{\n new QRCode(document.getElementById("qrcode"), `
    + text + `);\n}\n`
    + `\nconsole.log("Expire: " + new Date(expUnixTS * 1000));`;
  res.end(htmlText);
});

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
  fs.readFile("./database.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
    }

    res.status(200)

    var data = JSON.parse(data.toString());

    res.status(200).json(data.userTable)
  })
})

server.get('/fingerTable', (req, res) => {
  fs.readFile("./database.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
    }

    res.status(200)

    var data = JSON.parse(data.toString());

    res.status(200).json(db.fingerTable)
  })
})

server.get('/accessTable', (req, res) => {
  fs.readFile("./database.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
    }

    res.status(200)

    var data = JSON.parse(data.toString());

    res.status(200).json(db.accessTable)
  })
})

server.get('/logAccessTable', (req, res) => {
  fs.readFile("./database.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
    }

    res.status(200)

    var data = JSON.parse(data.toString());

    res.status(200).json(db.logAccessTable)
  })
})

//TODO:
//add user
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

//TODO: delete user
server.delete('/deleteUser', (req, res) => {

  const {userID} = req.body;
  console.log(userID);
  var firstname, lastname, email, role, num;

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
        if (data.accessTable[i].userID === userID) {
          console.log(data.accessTable[i])
          //delete data.accessTable[i];
          data.accessTable.splice(j, 1);
        }
      }
    }

    for (var j = 0; j < data.userTable.length; j++) {
      if (data.userTable[j] != null) {
        if (data.userTable[j].userID === userID) {
          firstname = data.userTable[j].firstname;
          lastname = data.userTable[j].lastname;
          email = data.userTable[j].email;
          role = data.userTable[j].role;
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

server.listen(3000, () => {
  console.log('Run Auth API Server')
})
