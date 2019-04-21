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
    let decoder =  new StringDecoder('utf-8')//payloads that come into the server through requests come as streams (bit by bit). When the stream mentions its at the endm the entire payload is taken and then decoded
    let buffer = ''
    
    req.on('data', (data) =>{
        buffer += decoder.write(data)
    })// req.on's 

    req.on('end',() =>{
        buffer += decoder.end()

        //Sending the response
        res.end("Hello world!\n")

        //Log the path user is asking for
        console.log('Request received with these headers:', headers)
        console.log('Request received with this payload:', buffer)
    })

    

    
})

server.listen(3000, () => {
    console.log("Server is listening in port 3000")
})