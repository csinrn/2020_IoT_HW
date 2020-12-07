const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const MongoClient = require('mongodb').MongoClient
const objectID = require('mongodb').ObjectID

var url = 'mongodb://root:27017';
//var url = 'mongodb://127.0.0.1:27017/hw2';

// 設定預設port為 1377，若系統環境有設定port值，則以系統環境為主
app.set('port', (1377))

// 設定靜態資料夾
app.use(express.static('/hw/public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function(req,res){
    res.sendfile("/hw/public/index.html");
})

// query 功能
app.get('/query', function(req, res) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var response = {
        result: true,
        data: []
        /* data: [{
                id: 0,
                name: "小米路由器",
                price: 399,
                count: 1,
                image: 'http://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1490332273.78529474.png?width=160&height=160'
            },
            {
                id: 1,
                name: "米家全景相機",
                price: 7995,
                count: 1,
                image: 'http://i01.appmifile.com/f/i/g/2016overseas/mijiaquanjingxiangji800.png?width=160&height=160'
            }
        ] */
    }

    
    // TODO 作業二 - 查詢資料       
    // 請將查詢mongodb的程式碼寫在這裡，並改寫下方response，使得查詢結果能送至前端
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
           //console.log(response.data)
           for(var i=0; i<result.length; i++){
               response.data.push(result[i])
           }
           // console.log(response.data);
           db.close();
           console.log(response.data.length);
           res.json(response)
           return
        }); 
//
        //console.log(response.data.length);
        //res.json(response)
    })
})


//insert功能
app.post('/insert', function(req, res) {
    var data = {
        name: req.body.name,
        price: req.body.price,
        count: req.body.count,
        image: req.body.image
    }

    // TODO 作業二 - 新增資料
    // 請將新增資料的程式碼寫在，使得將client送過來的 data 能寫入至 mongodb 中
    MongoClient.connect(url,function(err,db){
        if(err){
            res.message = "insert err" + err;
            return ;
        }
////////
        db.collection("products").insert(data) ;
////////    
    });

    var response = {
        result: true,
        data: data
    }
    res.json(response)
})

//update功能
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

        // TODO 作業二 - 更新資料
        // 將mongoDB資料中對應的 data.id 找出來，並更新其 name 和 price 資料
        // https://docs.mongodb.com/manual/tutorial/update-documents/

        var filter = {
            _id: objectID(data._id)
        }
        var update = {
            name: data.name,
            price: data.price
        }
    /////
        db.collection("products").update(filter,{$set:update});
    /////
    });

})

// delete功能
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
        // TODO 作業二 - 刪除資料
        // 將ID 的資料 從mongodb中刪除
        // https://docs.mongodb.com/manual/tutorial/remove-documents/

        // 查詢要刪除的ID
        var filter = {
            _id: objectID(data._id)
        }
        /////
        db.collection("products").remove(filter);
        /////
        db.close()
        return
    })

})

// 啟動且等待連接
app.listen(app.get('port'), function() {
    console.log('Server running at http://127.0.0.1:' + app.get('port'))
});