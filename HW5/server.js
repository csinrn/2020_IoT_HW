const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const MongoClient = require('mongodb').MongoClient
const objectID = require('mongodb').ObjectID

var url = 'mongodb://root:27017';

app.set('port', (1377))

// set static folder
app.use(express.static('/hw/public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function(req,res){
    res.sendfile("/hw/public/index.html");
})

// get
app.get('/query', function(req, res) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var response = {
        result: true,
        data: []
    }

    // connect mongodb to get all records
    MongoClient.connect(url, function(err, dbo) {
        if (err) {
            response.result = false
            response.message = "資料庫連接失敗，" + err.message
            console.log("fail");
            res.json(response)
            return
        }
        console.log("資料庫連接成功")
        db = dbo.db("admin");

        db.collection("products").find({}).toArray(function(err, result) {
           if (err) throw err;
           for(var i=0; i<result.length; i++){
               response.data.push(result[i])
           }
           db.close();
           console.log(response.data.length);
           res.json(response)
           return
        }); 
    })
})


//insert
app.post('/insert', function(req, res) {
    var data = {
        name: req.body.name,
        price: req.body.price,
        count: req.body.count,
        image: req.body.image
    }

    // connect to Mongodb
    MongoClient.connect(url,function(err,db){
        if(err){
            res.message = "insert err" + err;
            return ;
        }
        db.collection("products").insert(data) ;
    });

    var response = {
        result: true,
        data: data
    }
    res.json(response)
})

//update
app.post('/update', function(req, res) {
    var data = {
        _id: req.body._id,
        name: req.body.name,
        price: req.body.price,
    }
    var response = {
        result: true,
        data: data
    }

    MongoClient.connect(url, function(err, db) {
        if (err) {
            response.result = false
            response.message = "資料庫連接失敗，" + err.message
            res.json(response)
            return
        }

        // update the record with the same id
        var filter = {
            _id: objectID(data._id)
        }
        var update = {
            name: data.name,
            price: data.price
        }
        db.collection("products").update(filter,{$set:update});
        db.close()
        res.json(response)
        return
    });
})

// delete
app.post('/delete', function(req, res) {
    var data = {
        _id: req.body._id,
        name: req.body.name
    }
    var response = {
        result: true,
        data: data
    }

    MongoClient.connect(url, function(err, db) {
        if (err) {
            response.result = false
            response.message = "資料庫連接失敗，" + err.message
            res.json(response)
            return
        }

        // delete the records with the same id
        var filter = {
            _id: objectID(data._id)
        }
        db.collection("products").remove(filter);
        db.close()
        res.json(response)
        return
    })

})

// start the server
app.listen(app.get('port'), function() {
    console.log('Server running at http://127.0.0.1:' + app.get('port'))
});