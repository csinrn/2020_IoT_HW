exports.handler = async (event) => {
    var str = "Your birthday is " + event.body + " , Happy Birthday!";
    // var str = JSON.stringify(event.body)
    const response = {
        "statusCode": 200,
        "body": str,
    };
    
    
    return response;
};