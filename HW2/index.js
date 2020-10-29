const axios = require('axios')
const express = require('express');
const app = express();
const port = 3000;

app.get('/',  (req, res, next) => {

    var webhookURL = "https://9y8wy7m8tc.execute-api.us-east-2.amazonaws.com/webhook";
    var date = new Date().toDateString();
    console.log(date)
    axios.post(
        webhookURL, date
    ).then((response)=>{           
        //console.log(err, body)    
        res.send(response.data)
    }).catch((error) => { console.error(error) });
});

app.listen(port, function () {
    console.log('Express app started on ' + port);
});