/** imports documentation:
 * https://www.npmjs.com/package/dotenv
 * https://www.npmjs.com/package/express
 * https://www.npmjs.com/package/body-parser
 * https://www.npmjs.com/package/node-fetch
 * https://nodejs.org/docs/latest/api/path.html
 * **/
/* dotenv loads environment variables from .env file into process.env -- stores configurations */
require('dotenv').config()
/* express provides tooling for HTTP servers */
const express = require('express')
/* parse request bodies in middleware before handlers
*  https://www.npmjs.com/package/body-parser
*  anatomy of an HTTP Transaction in node: https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
*  - prereqs (event emittters and streams): https://nodejs.org/api/events.html, https://nodejs.org/api/stream.html
* */
const bodyParser = require('body-parser')
/* use fetch API instead of XMLHttpRequest in Node
* https://www.npmjs.com/package/node-fetch
* NOTE: url should be absolute urls */
const fetch = require('node-fetch')
/* provide utilities for working with file and directory paths
* https://nodejs.org/docs/latest/api/path.html
* */
const path = require('path')

/** variables
 * https://expressjs.com/en/starter/hello-world.html
 * **/
/* start a server called app at root URL /*/
const app = express()
/* listen on port 3000 */
const port = 3000

/** middlware
 *  https://stackoverflow.com/questions/55558402/what-is-the-meaning-of-bodyparser-urlencoded-extended-true-and-bodypar
 *  - produce a object directly wihout needing to create a object of your own
 *  - for a definition of middleware: https://developer.mozilla.org/en-US/docs/Glossary/Middleware
 * **/
/* middleware for parsing json objects
*    - parses bodies from URL
*    - by using 'extended: false', the request body remains a string rather than an object
* */
app.use(bodyParser.urlencoded({ extended: false }))
/* middleware for parsing json headers
 * - turns text-based JSON input into JS-accessible variables
 */
app.use(bodyParser.json())
/* serves static files in Express
*  https://expressjs.com/en/starter/static-files.html
*  - below, app.use allows us to serve files found in the directory named public
*  - specifically, 'path.join(__dirname, '../public'))' allows us to use the absolute path to serve the directory
*  - by using the absolute path, we can run the express app from any directory in the project
* */
app.use('/', express.static(path.join(__dirname, '../public')))

/** API calls
 * https://expressjs.com/en/guide/routing.html
 * route path
 * **/
/*
*  http://expressjs.com/en/guide/routing.html
*  - app.get is a route method derived from one of the HTTP methods attached to an instance of the express class
*  - example of a get method route:
*    // GET method route
*        app.get('/', function (req, res) {
*           res.send('GET request to the homepage')
*        })
*   - http://expressjs.com/en/4x/api.html#app.METHOD shows all supported methods by express
*
* */
app.get('/:name', async (req, res) => {
    /* get the name of the rover
    * - https://discuss.codecademy.com/t/whats-the-difference-between-req-params-and-req-query/405705
    * - req.query is also an object but containes only key values
    * - thus, req.query.name will return the name of the rover
    * */
    const name = req.query.name; // from starter code
    let date, url; // from starter code
    /*
    * this try catch clause will try to get photos of the selected rover using the API key found in env, return an err otherwise
    * - save API data as image -- which may be an object containing many images
    * */
    // ${name.toLowerCase()}
    try {
        let image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${process.env.API_KEY}`)
            .then(res => res.json());
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))