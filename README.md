## Prerequisites
### Node
Install the latest version of [Node.js](https://nodejs.org/en/download/current/)
<br /> <strong>Windows</strong> users need to add Node.js to their PATH

## Create your NodeJS project
Create a root folder where your front-end and back-end will be:

Create a folder through the windows/mac UI

OR
```sh 
mkdir xcalibur 
```

Open a CLI (terminal/cmd) and install the express generator:

```sh
npm install -g express-generator
```

Generate a new NodeJs project by running the following command:

```sh
express xcalibur-backend
```

After successful creation, go to your project folder:

```sh
cd xcalibur-backend
```

The packages need to be installed using this command:

```sh
npm install
```

During developing, you don't want to stop and start the server every time. Let's install a change detector that will restart the server automatically for you:

```sh
npm install --save-dev nodemon
```

add to your package.json a comma at the end of line 6 and add new line on line 7 to add nodemon:

```javascript
  "start": "node ./bin/www",
  "dev": "nodemon ./bin/www"
```

Let's see what all those commands have brought you so far:
```sh
npm run dev
```

Go to [localhost:3000](localhost:3000) and see your first NodeJS backend running.

## Create your first API
We are going to create your first API. The frontend has been built and it needs information from the back-end. So we're going to create an airplanes API. 

Go to the folder: "routes" and rename the file "users.js" to "airplanes.js"

Go to line 6 and replace it with:

```javascript
res.send([{
    'brandName': 'airbus',
    'aircraftType': 'a880',
    'picture': 'http://cdn23.us1.fansshare.com/photos/airbus/airbus-196181019.jpg',
    'maximumSpeed': '1000 km/h',
    'klmFleet': 2
    }])
```

Go to the app.js file to expose the route (line 9). Replace users with airplanes

```javascript
var airplanes = require('./routes/airplanes');
```

Go to line 26 in your app.js file and let's change users to airplanes. <strong>WATCH</strong> the '/api'

```javascript
app.use('/api/airplanes', airplanes);
```

Let's check if it's working. Go to your [localhost:3000/api/airplanes](localhost:3000/api/airplanes)

## MongoDB

### Install

Install MongoDB: [https://www.mongodb.com/download-center#community](https://www.mongodb.com/download-center#community)

#### Windows
After downloading the installer from the mongodb website, add the mongodb/bin to your PATH. 

Run the command to start mongo:

```sh
mongod
```

And look on which drive you need to create the folder structure /data/db. It can either be on drive C, D or else were. After doing that, run the command again.

#### Mac
After downloading the .tar file from the mongodb website, execute:

```sh
export PATH=<mongodb-install-directory>/bin:$PATH
```

Now you have to create a folder for MongoDB, and you need admin right for that:

```sh
sudo mkdir -p /data/db
```

Full permision needs to been giving to the folder "/data/db". There are beter ways to grant permission, but is out of this scope:

```sh
sudo chmod 777 /data/db
```

Now run the mongo server:

```sh
mongod
```

### import Data
Create in the root of your project a file name "airplane.json". Copy the content from: [https://pastebin.com/LBK2V1u6](https://pastebin.com/LBK2V1u6) and save it.

Import the data into your mongod with the following commmand:
 
```sh
mongoimport -d xcalibur -c airplane <path-to-the-file>
```

Install a Mongo client to see your result: [https://robomongo.org/download](https://robomongo.org/download)

### Back-end connector

Mongoose is a NoSQL framework. We need it to interact with the database. Let's install it

```sh
npm install --save mongoose
```

The native Promise handler will be replaced with bluebird
```sh
npm install --save bluebird
```

Create a new file in the bin folder and name it database.js. Put the following code in the file:

```javascript
// load mongoose package
var mongoose = require('mongoose');
// Use native Node promises
mongoose.Promise = require('bluebird');
// connect to MongoDB
options = {
	useMongoClient: true
};

mongoose.connect('mongodb://localhost:27017/xcalibur', options)
.then(() =>  console.log('connection succesful'))
 .catch((err) => console.error(err));

module.exports = mongoose;

```

Now add mongoose to app.js (line 7)
```javascript
var db = require('./bin/database');
```

Now control if you have a console log with "connection succesful"

Next, create a folder on the root named: "models"

In that folder, create an file name: "airplane.js"

Add the following the airplane.js file:

```javascript
var mongoose = require('mongoose');
var AirplaneSchema = new mongoose.Schema({
  brandName: String,
  aircraftType: String,
  picture: String,
  maximumSpeed: String,
  klmFleet: Number
});
 
module.exports = mongoose.model('airplane', AirplaneSchema, 'airplane');
```

Go the file routes/airplanes and replace line 3 till 13 with the following code:

```javascript
var Airplane = require('../models/airplane');
 
/* GET airplanes page. */
router.get('/', function(req, res, next) {
  Airplane.find(function (err, airplane) {
    if (err) return next(err);
    res.json(airplane);
  });
});
```

Let's see if we have any airplanes in our route

Now let's create a route that will request only the airplane with the same brand name (line 13)

```javascript
router.get('/:brandName', function(req, res, next) {
  Airplane.find({brandName: req.params.brandName}, function (err, airplane) {
    if (err) return next(err);
    res.json(airplane);
  });
});
```

