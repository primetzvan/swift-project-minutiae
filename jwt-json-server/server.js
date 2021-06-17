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

// Create a token from a payload
function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}


// Check if the access exists in database
function isAuthenticated({userID, doorID, startdate, enddate}){
  return db.accessTable.findIndex(access => access.userID === userID && access.doorID === doorID && access.startdate === startdate && access.enddate === enddate) !== -1
}

// Register New access
server.post('/auth/token', (req, res) => {
  console.log("register endpoint called; request body:");
  console.log(req.body);
  const {userID, doorID, startdate, enddate} = req.body;

  if(isAuthenticated({userID, doorID, startdate, enddate}) === true) {
    const status = 401;
    const message = 'existiert schon';
    res.status(status).json({status, message});
    return
  }

fs.readFile("./database.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
    };

    // Get current users data
    var data = JSON.parse(data.toString());

    //Add new user
    data.accessTable.push({userID: userID, doorID: doorID, startdate: startdate, enddate: enddate }); //add some data
    fs.writeFile("./database.json", JSON.stringify(data), (err, result) => {  // WRITE
        if (err) {
          const status = 401
          const message = err
          res.status(status).json({status, message})
          return
        }
    });
});

// Create token for access
  const access_token = createToken({userID, doorID, startdate, enddate})
  console.log("Access Token:" + access_token);
  res.status(200).json({access_token})
})

// Verify the token
function verifyToken(token){
  return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
}

// serve token as QrCode

server.get('/getQrCode', (req, res) => {
  console.log("test; request body:");
  console.log(req.body);
  console.log("Query =" , req.query)
  // Access the provided 'user' and 'door' query parameters
  const {userID, doorID, startDate, endDate} = req.query;
  var access_token;

  if(userID && doorID && startDate && endDate) {
    console.log("USER:"+ userID + " DOOR:" + doorID + " STARTDATE:" + startDate + " ENDDATE:" + endDate);
    access_token = createToken({userID, doorID,startDate,endDate}, expiresIn);
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
server.get('/qrOfJwt.js', (req, res) => {

  var text = 'access_token'
  res.type('.js');
  const htmlText = `new QRCode(document.getElementById("qrcode"), `
    + text + `);\nconsole.log(access_token);`
    + `\nconsole.log("Expire: " + new Date(expUnixTS * 1000));`;
  res.end(htmlText);
});

// serve token as QrCode
server.get('/qrOfJwt.js', (req, res) => {

  var text = 'access_token'
  res.type('.js');
  const htmlText = `new QRCode(document.getElementById("qrcode"), `
    + text + `);\nconsole.log(access_token);`
    + `\nconsole.log("Expire: " + new Date(expUnixTS * 1000));`;
  res.end(htmlText);
});

server.listen(3000, () => {
  console.log('Run Auth API Server')
})

server.get('/getAllDoors', (req, res) => {
  //console.log(db.doorTable)
  res.status(200).json(db.doorTable)
})

server.get('/getAllUsers', (req, res) => {
  res.status(200).json(db.userTable)
})

server.get('/fingerTable', (req, res) => {
  res.status(200).json(db.userTable)
})

server.get('/accessTable', (req, res) => {
  res.status(200).json(db.userTable)
})

server.get('/logAccessTable', (req, res) => {
  res.status(200).json(db.userTable)
})


