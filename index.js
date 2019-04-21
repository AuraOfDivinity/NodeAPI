//Primary file for the API
//Adding dependencies

const http = require('http')
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder//Provides a way of deoding buffer objects into strings
const config = require('./config')

//The server should respons to all requests with a string
const server = http.createServer((req, res) => {

    //Getting the url and parse it
    let parsedUrl = url.parse(req.url, true)

    //Get the path from the url
    let path = parsedUrl.pathname//untrimmed path
    let trimmedPath = path.replace(/^\/+|\/+$/g,'')

    //Get the query string as an object
    let queryStringObject = parsedUrl.query

    //get the HTTP method
    let method = req.method.toLowerCase()
    

    //Get the headers as an object
    let headers = req.headers

    //Get the payload if there is any
    let decoder =  new StringDecoder('utf-8')//payloads that come into the server through requests come as streams (bit by bit). When the stream mentions its at the endm the entire payload is taken and then decoded
    let buffer = ''
    
    req.on('data', (data) =>{
        buffer += decoder.write(data)
    })// req.on's 

    req.on('end',() =>{
        buffer += decoder.end()

        //Chose the handler the request should go to
        let chosenHandler  = typeof(router[trimmedPath])  !== 'undefined' ? router[trimmedPath] : handlers.notFound

        //Construct the data object to send to the handler
        let data = {
            'trimmedPath': trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers' : headers,
            'payload' : buffer
        }

        //route the request to the handler specified in the router
        chosenHandler(data, (statusCode, payload) => {
            //use the status callback by the handler or default to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200
            payload = typeof(payload) == 'object' ? payload : {}

            //convert the payload into a string
            let payloadString = JSON.stringify(payload)

            res.setHeader('Content-Type', 'application/json')
            res.writeHead(statusCode)
            res.end(payloadString)

            console.log('Returning this response:', statusCode,payloadString)
        })
    })
})

server.listen(3000, () => {
    console.log("Server is listening in port 3000 in staging")
})


//Define handlers
let handlers = {}

//sample handler
handlers.sample = (data, callback) => {
    callback(406, {'name': 'sample handler'})
}

//Not found handler
handlers.notFound = (data, callback) => {
    callback(404)
}

//Define a request router
let router = {
    'sample' : handlers.sample
}