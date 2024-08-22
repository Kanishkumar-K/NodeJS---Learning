# Milestone - 3

## Express JS:

- Express.js is a web application framework for Node.js. 
- It simplifies the process of building web applications and APIs by providing a robust set of features and utilities.

### Express is Unopinionated Framework

`Opinionated Frameworks`:

They prescribe specific methods, tools, and architectures, guiding developers toward a particular way of building applications.

`Unopinionated Framework`:

They do not enforce specific patterns or structures, allowing developers to choose how they want to implement features and organize their code.

---

### Features:

`Routing:`

Easy-to-use routing system for handling different HTTP requests and URLs.

`Middleware:`

 Middleware functions to handle various tasks like authentication, logging, and body parsing.

`Request and Response Handling:`

Simplifies handling of incoming requests and outgoing responses.

`Error Handling:`

Customizable error-handling middleware.

`Template Rendering:` 

Support for rendering HTML pages using template engines.

---

### Installation:

        npm install express

### Creation of web server:

` 1. Import express module`

    const express = require('express');

`2. Create Express server`:

    const app = express();

`3. Defining routes`:

    app.get('/', (req, res) => {
        res.send('Hello, World!');
    });
    
`4. Setting port number`:

    const PORT = process.env.PORT;
        app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

---

### Configuring dotenv:

`Install`:

    npm install dotenv

`Import`:
    
    require('dotenv').config();

`.env file`:

    PORT = 3000

### Middleware:

Middleware in Express.js refers to functions that have access to the request (req), response (res), and the next middleware function in the application’s request-response cycle. 

- Performs in Executing the code
- Modifying the request and response objects
- Ending the request-response cycle
- Calling the next middleware function in the stack

`Types`:

- `Application-Level Middleware:` Bound to an instance of express.

- `Router-Level Middleware:` Bound to express.Router().

- `Error-Handling Middleware:` Used to catch and handle errors.

- `Built-in Middleware:` Functions like express.json() and express.urlencoded().

---

Example:

`Parse JSON bodies`:
    
    app.use(bodyParser.json()); 

`Parse URL-encoded bodies`:

    app.use(bodyParser.urlencoded({ extended: true })); 



`express.json()` is the modern, built-in middleware function for parsing JSON request bodies in Express.js, available since Express 4.16.0.

`bodyParser.json()` is from the body-parser package and was commonly used before the functionality was integrated into Express. It is still valid.

### Routing:

`Route Methods`:

Express supports various HTTP methods (GET, POST, PUT, DELETE, etc..)

- GET: Retrieve data from the server.
- POST: Send data to the server to create a new resource.
- PUT: Update an existing resource on the server.
- DELETE: Delete a resource from the server.

---

`Express router`:

- Router class is available in Express. 
- It allows you to define routes in separate files and then use them in your main application.

    
        const router = express.Router();

---

`Routing Middleware`:

- We can use middleware functions to process requests before they reach the route handler. 
- This can be used for authentication, validation, etc.

`Example`:

    router.post(
        '/book',
        authenticateJwt,
        bookTicketValidation,
        bookingController.bookTicket
    );

---

### DB integration with express:

Express does not include built-in database support. But it has,

`ORM (Object-Relational Mapping)` libraries like Sequelize for SQL databases

`ODM (Object-Document Mapping)` libraries like Mongoose for MongoDB.

    const Sequelize = require('sequelize');
    const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
    });

---

### Template Engine:

- Express supports various templating engines for rendering dynamic HTML. 
- Common engines include Pug, EJS, and Handlebars.


Installation:

    npm install ejs

Example:

    app.set('view engine', 'ejs');

    app.get('/', (req, res) => {
    res.render('index', { title: 'My App' });
    });

---

`1. app.use()`:

 app.use() is a method used to register middleware functions that handle requests. 

`2. app.set():`

The app.set() method is used to configure various application settings. 


`3. app.set()`:

The app.get() method is used to retrieve the value of a previously set setting. 

It allows you to access the current value of settings that were defined using app.set().

---

## Helmet:

- Helmet is a middleware for Node.js applications that helps secure Express.js applications by setting various HTTP headers. 

- It is a collection of smaller middleware functions that can be used to improve the security of your application by setting HTTP headers that help protect against common security vulnerabilities.

### Why Use Helmet?

- Helmet helps mitigate risks from various types of attacks by setting security-related HTTP headers. 

- It provides protection against attacks such as:

- Cross-Site Scripting (XSS)
- Clickjacking
- MIME type sniffing
- HTTP response splitting
- Content Security Policy (CSP) issues

---

`Install`:

        npm install helmet

---

### Response header after configuring helmet:


    connection: keep-alive
    content-security-policy: default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests
    cross-origin-opener-policy: same-origin
    cross-origin-resource-policy: same-origin
    date: Tue, 20 Aug 2024 05:24:41 GMT
    etag: W/"c-Lve95gjOVATpfV8EL5X4nxwjKHE"
    keep-alive: timeout=5
    origin-agent-cluster: ?1
    referrer-policy: no-referrer
    strict-transport-security:
    max-age=15552000; includeSubDomains x-content-type-options: nosniff x-dns-prefetch-control: off
    x-download-options: noopen
    x-frame-options: SAMEORIGIN
    x-permitted-cross-domain-policies: none
    x-xss-protection: 0

---

### Configuration:

        var express = require('express');
        var app = express();
        var helmet = require('helmet');

        app.use(helmet());


## Default Headers provided by helmet:

By default, Helmet sets the following headers:

- Content-Security-Policy: A powerful allow-list of what can happen on your page which mitigates many attacks

- Cross-Origin-Opener-Policy: Helps process-isolate your page

- Cross-Origin-Resource-Policy: Blocks others from loading your resources cross-origin

- Origin-Agent-Cluster: Changes process isolation to be origin-based

- Referrer-Policy: Controls the Referer header

- Strict-Transport-Security: Tells browsers to prefer HTTPS

- X-Content-Type-Options: Avoids MIME sniffing
- X-DNS-Prefetch-Control: Controls DNS prefetching
- X-Download-Options: Forces downloads to be saved (Internet Explorer only)
- X-Frame-Options: Legacy header that mitigates clickjacking attacks
- X-Permitted-Cross-Domain-Policies: Controls cross-domain behavior for Adobe products, like Acrobat
- X-Powered-By: Info about the web server. Removed because it could be used in simple attacks
- X-XSS-Protection: Legacy header that tries to mitigate XSS attacks, but makes things worse, so Helmet disables it.

---

### Helmet Middleware functions:

1. **`helmet.contentSecurityPolicy()`**
   - Sets the `Content-Security-Policy` header to prevent XSS attacks by specifying allowed content sources.

2. **`helmet.xssFilter()`**
   - Sets the `X-XSS-Protection` header to prevent cross-site scripting (XSS) attacks.

3. **`helmet.frameguard()`**
   - Sets the `X-Frame-Options` header to prevent clickjacking by controlling how your site can be framed.

4. **`helmet.noSniff()`**
   - Sets the `X-Content-Type-Options` header to prevent MIME type sniffing.

5. **`helmet.hsts()`**
   - Sets the `Strict-Transport-Security` header to enforce HTTPS.

6. **`helmet.dnsPrefetchControl()`**
   - Sets the `X-DNS-Prefetch-Control` header to control DNS prefetching.

7. **`helmet.hidePoweredBy()`**
   - Removes the `X-Powered-By` header to obscure the technology stack used.

8. **`helmet.referrerPolicy()`**
   - Sets the `Referrer-Policy` header to control how much referrer information is sent with requests.

`Example`:

        const express = require('express');
        const helmet = require('helmet');

        const app = express();

        app.use(helmet());

        app.get('/', (req, res) => {
        res.send('Hello World!');
        });

        app.listen(3000, () => {
        console.log('Server running on port 3000');
        });

---

### CORS:

- CORS (Cross-Origin Resource Sharing) is a mechanism that allows servers to specify who can access their resources from a different origin (domain, protocol, or port). 

- It is a security feature implemented by browsers to prevent unauthorized cross-origin requests.

`Installation`:

        npm install cors

`Cors middlware`:

        const express = require('express');
        const cors = require('cors');

        const app = express();

        // Use CORS middleware
        app.use(cors());

        app.get('/', (req, res) => {
        res.send('Hello World!');
        });

        app.listen(3000, () => {
        console.log('Server running on port 3000');
        });


`Allowing CORS for specific origins`:

    const express = require('express');
    const cors = require('cors');

    const app = express();

    const corsOptions = {
    origin: ['https://example1.com', 'https://example2.com'], 
    };

    app.use(cors(corsOptions));

    app.get('/', (req, res) => {
    res.send('Hello World!');
    });

    app.listen(3000, () => {
    console.log('Server running on port 3000');
    });

---

## Need for CORS in Node.js

- Node.js applications often serve APIs that need to be consumed by clients running on different origins. 

- Enabling CORS in a Node.js server allows these clients to make requests to the server, even if they originate from different domains. 

### Allowing Specific Methods

To allow only specific HTTP methods, use the following configuration:

    const corsOptions = {
        // Only allow GET and POST requests
        methods: ['GET', 'POST'],
    };

    app.use(cors(corsOptions));

## Supporting Credentials

If you need to support credentials, you can enable them with this configuration:

    const corsOptions = {
        origin: 'http://example.com',
        // Allow credentials like cookies
        credentials: true,
    };

    app.use(cors(corsOptions));

## Customizing Headers

To specify which headers are allowed in CORS requests, use this approach:

    const corsOptions = {
        // Allow specific headers
        allowedHeaders: ['Content-Type', 'Authorization'],
    };

    app.use(cors(corsOptions));

---

## Preflight Requests:
- They are used by browsers to determine if a cross-origin request is safe to send to the server.

### What is a Preflight Request?

- A preflight request is an HTTP OPTIONS request sent by the browser before the actual request.
 - It checks with the server to see if the actual request is allowed. This is done to ensure that the server is willing to accept the cross-origin request with the specified method and headers.

### When Does a Preflight Request Occur?

- HTTP Methods: If the request method is anything other than GET, POST, or HEAD (e.g., PUT, DELETE).

- Custom Headers: If the request includes headers that are not considered "simple" (e.g., custom headers like X-Custom-Header).

- Content-Type: If the Content-Type header is not one of the "simple" types (application/x-www-form-urlencoded, multipart/form-data, text/plain).

### How Does a Preflight Request Work?

`Client Sends OPTIONS Request:`

The browser sends an OPTIONS request to the server to check if the cross-origin request is allowed. This request includes the Access-Control-Request-Method and 
Access-Control-Request-Headers headers.

`Server Responds:`

The server responds with headers indicating whether the actual request is permitted. This includes headers like Access-Control-Allow-Methods, Access-Control-Allow-Headers, and Access-Control-Allow-Origin.

`Actual Request:`

If the server's response to the preflight request indicates that the actual request is allowed, the browser sends the actual request (e.g., GET, POST, PUT) with the appropriate headers.


---

`Example`:

        // Configure CORS with specific options
        const corsOptions = {
        origin: 'https://example.com', // Allow only this origin
        methods: 'GET, POST, PUT, DELETE', // Allow these methods
        allowedHeaders: 'Content-Type, Authorization', // Allow these headers
        };

        app.use(cors(corsOptions)); // Apply CORS middleware

---

### REST API:

REST is an architectural style for designing networked applications with a stateless, client-server communication model.

- REST (Representational State Transfer) is an architectural style for designing networked applications. 
- It relies on a stateless, client-server communication protocol, usually HTTP, to handle requests and responses. 
- A REST API (Application Programming Interface) adheres to REST principles to allow interaction between clients and servers.

### Key Principles of REST

They align to the following six REST design principles, also known as architectural constraints.

`Stateless:`

- Each request from a client must contain all the information needed for the server to fulfill that request. 
- The server does not store any state about the client session between requests.

`Client-Server Architecture`: 

- The client and server are separate entities that communicate over a network. The client requests resources, and the server provides them. 
- This separation allows for independent evolution of client and server.

`Uniform Interface`: 

- RESTful APIs have a consistent and standardized way of interacting with resources. This includes using standard HTTP methods and status codes.

`Resource-Based`: 

Resources are identified by URIs (Uniform Resource Identifiers). Each resource is represented by a URL and can be manipulated using HTTP methods.

`Stateless Communication`: 

Communication between client and server should be stateless, meaning each request should contain all necessary information to process the request.

`Cacheable:` 

Responses from the server should be explicitly marked as cacheable or non-cacheable to improve performance and reduce the need for repeated requests.

---

`Common HTTP Methods in REST APIs`

- GET: Retrieve data from the server. The request should not change the state of the server.

- POST: Submit data to the server to create a new resource or perform an action.

- PUT: Update an existing resource on the server with new data.

- DELETE: Remove a resource from the server.

- PATCH: Apply partial modifications to a resource.

---

## Example:

[From Railway Reservation Application]

    router.post(
        '/book',
        authenticateJwt,
        bookTicketValidation,
        bookingController.bookTicket
    );

    router.get(
        '/available-seats',
        authenticateJwt,
        bookingController.getAvailableSeats
    );

    router.delete(
        '/cancel/:bookingId',
        authenticateJwt,
        authorizeRole(['admin', 'user']),
        bookingController.cancelBooking
    );

---

## Route Paramters:

- Route parameters are used to capture values from the URL path. 

- They are specified in the route definition with a colon (:) followed by the parameter name.

Format:

        /path/:param1/:param2

Example:

        router.get(
            'api/users/:id',
            authenticateJwt,
            authorizeRole(['admin', 'user']),
            userController.getUserById
        );

- In this example, the '...api/users/1' will fetch the user data with user id 1.

## Query Parameters

Query parameters are used to filter or sort the data, and they are appended to the URL after the question mark (?). They are key-value pairs separated by &.

        GET /items?page=2&limit=5

Pagination is done using query parameters.

![alt text](image.png)

## Format of Query Parameters

Query parameters are formatted as a series of key-value pairs:

    key1=value1&key2=value2&key3=value3 

key1: The parameter name.

value1: The value associated with key1.

Common Uses

- Filtering: To specify criteria for the data to be returned.
- Sorting: To define the order in which the data should be sorted.
- Pagination: To control which page of data is returned and how many items per page.
- Searching: To include search terms or parameters for more specific queries.

---

## Express Validator:

- Express Validator is a popular middleware for validating and sanitizing data in Express.js applications. 

- It integrates well with the Express framework, making it easy to validate user input from requests and handle errors in a structured way.

## Key Features

- Validation: Check if input values meet certain criteria (e.g., required fields, email format).
- Sanitization: Clean input values to avoid issues like SQL injection or XSS attacks.
- Error Handling: Provide detailed error messages when validation fails.
- Chainable API: Use a fluent, chainable API for defining validation rules.

`Installation`

        npm install express-validator

---

`Importing express-validator`:

    const { body, validationResult } = require('express-validator');


### Validation Examples:

`Email Validation:`

    body('email').isEmail().withMessage('Invalid email address');

`String Length Validation:`

    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long');

`Sanitization:`

    body('username').trim().escape();

---

#### Custom Validation:

We can define our own validation rules.

        body('age').custom(value => {
            if (value < 18) {
                throw new Error('You must be at least 18 years old');
            }
            return true;
        });


### Validation Chain:

        query('search_query').notEmpty().trim();

First checks its not empty or not, then trims it.

### Wildcards:

- Sometimes you will want to apply the same rules to all items of an array, or all keys of an object. That's what the *, also known as the wildcard, is for.

- The wildcard can be used in place of any segment, which will correctly select all indices of the array or keys of the object it's located in.

        app.post(
        '/update-user',
        body('siblings.*.name').notEmpty(),
        );


### Common Methods:

# Express Validator Common Methods

| Method                           | Description                                                   | Usage Example                                    |
|----------------------------------|---------------------------------------------------------------|--------------------------------------------------|
| `check('field').isEmail()`        | Checks if the value of the field is an email.                | `check('email').isEmail()`                      |
| `check('field').isLength({ min: 5 })` | Checks if the field value is at least the specified length. | `check('username').isLength({ min: 5 })`       |
| `check('field').isInt()`           | Checks if the value is an integer.                           | `check('age').isInt()`                          |
| `check('field').isNumeric()`       | Checks if the value is numeric.                              | `check('quantity').isNumeric()`                 |
| `check('field').isAlphanumeric()`  | Checks if the value contains only letters and numbers.       | `check('username').isAlphanumeric()`            |
| `check('field').isURL()`           | Checks if the value is a valid URL.                          | `check('website').isURL()`                      |
| `check('field').isDate()`          | Checks if the value is a valid date.                         | `check('birthdate').isDate()`                   |
| `check('field').matches(pattern)`  | Checks if the value matches a regular expression pattern.    | `check('password').matches(/\d/)`               |
|


---


### Schema based validation:

Schemas are an object-based way of defining validations or sanitizations on requests. They offer exactly the same functionality as regular validation chains.

        checkSchema({
        username: {
            errorMessage: 'Invalid username',
            isEmail: true,
        },
        password: {
            isLength: {
            options: { min: 8 },
            errorMessage: 'Password should be at least 8 chars',
            },
        },
        });

---

## Nodemon

The nodemon npm Module is a module that develop node.js based applications by automatically restarting the node application when file changes in the directory are detected. Nodemon does not require any change in the original code and method of development.

### Advantages of Using nodemon Module:

- It is easy to use and easy to get started.
- It does not affect the original code and no instance require to call it.
- It help to reduce the time of typing the default syntax node for executing again and again.

---

![](image-1.png)

---

### nodemon -h   

    Usage: nodemon [options] [script.js] [args]

  Options:

        --config file ............ alternate nodemon.json config file to use
        -e, --ext ................ extensions to look for, ie. js,pug,hbs.
        -x, --exec app ........... execute script with "app", ie. -x "python -v".
        -i, --ignore ............. ignore specific files or directories.
        -V, --verbose ............ show detail on what is causing restarts.

---