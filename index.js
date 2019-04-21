//Primary file for the API
//Adding dependencies

const http = require('http')
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder//Provides a way of deoding buffer objects into strings


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


    //Sending the response
    res.end("Hello world!\n")

    //Log the path user is asking for
    console.log('Request received with these headers:', headers)

    
})

server.listen(3000, () => {
    console.log("Server is listening in port 3000")
})