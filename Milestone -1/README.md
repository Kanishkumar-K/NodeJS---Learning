
## 1. Callback Function:

 - A callback function is a function that is passed as an argument to another function.
 
 - Callback functions are useful for handling asynchronous events, such as network requests, file operations, or timers.


 ```javascript
        function display(name, callback){   // function
        callback();
        console.log(name);
        }

        function callMe(){    // callback function
        console.log("Hello");
        }

        display('Kanish', callMe);  // function call
```

Example-2

```javascript
        context = {
        greet : 'Welcome'
        }

        function display(name, callback) { // function
        callback();
        console.log(name);
        }
        
        function callMe() { // callback function
        console.log(context.greet);
        }
        
        display('Kanish', callMe); // function call
```


## 2. Callback Hell (Pyramid of doom):

- Callback Hell is essentially nested callbacks stacked below one another forming a pyramid structure.

- It makes the code hard to read and increases complexity and can prone to errors.

```javascript

        function firstFunction(callback){
        setTimeout(() => {
                console.log("First function");
                callback();
        }, 1000);
        }

        function secondFunction(callback){
        setTimeout(() => {
                console.log("Second Function");
                callback();
        }, 1000);
        }

        function thirdFunction(callback){
        setTimeout(() => {
                console.log("Third function");
                callback();    
        }, 1000);
        }

        function fourthFunction(callback){
        setTimeout(() => {
                console.log("Fourth Function");
                callback();
        }, 1000);
        }


        firstFunction(() =>{
        secondFunction(() => {
                thirdFunction(() => {
                fourthFunction(() => {
                        setTimeout(() => {
                        console.log("Done");
                        }, 1000);
                })
                })
        })
        })
```

## 3. Promise

- One way to achieve asynchronous operation in JS.
- A Promise is an object representing an asynchronous operation and its resulting value. 

- Promises are used to handle asynchronous operations in a more cleaner way compared to callbacks.

A promise may have one of three states.

        - Pending
        - Resolved (successful)
        - Rejected (handle errors)

- It starts in a pending state. That means the process is not complete. 
- If the operation is successful, the process ends in a resolved state. 
- If an error occurs, the process ends in a rejected state.

---

Example:

- Getting data from api, it may take some time to load and access the data, hence it can be done using asynchronous operation.

## Creation of a Promise

A Promise will have a function, that receives two arguments: resolve and reject.

- `resolve(value):` Called when the asynchronous operation completes successfully.

- `reject(reason):` Called when the asynchronous operation fails.

Syntax:

        let promise = new Promise(function(resolve, reject){
        //logic
        });

Example:

The example illustrates creation of a promise

        const data = new Promise(function(resolve, reject){
            setTimeout(() => {
                const name = 'kanish'

                if(name){
                    resolve(name);
                }
                else{
                    reject('No data present')
                }
            }, 2000);
        })

### Accessing the created promise  / Chaining:

Syntax: 

    Promise_Object().then().catch().finally()

- then() = executes success state
- catch() = executes error state
- finally() = executes both success and error state


Example:

We can access the above created promise as,

        data

        .then(function(name){
        console.log(name);
        })

        .catch(function(error){
            console.log(error);
        })

        .finally(function(){
            console.log('Finally block executed');
        })


Here, since the data is known, the promise is resolved and data is printed.
Incase if data is undefined, error will be catched.

![Screenshot 2024-07-29 194043](https://github.com/user-attachments/assets/b191ea54-845a-4b4b-bd86-b275758e64ba)

Here the output will throw the error as follows,

![Screenshot 2024-07-29 194105](https://github.com/user-attachments/assets/caf84c3b-3f8b-4039-9627-56b25207bd04)

> Finally block executes irrespective of the result.

---

`Pros of Promises:`

- Avoid callback hell by chaining asynchronous operations in a more readable way.
- Built-in error handling with .catch method.
- Can be combined or transformed using higher-order functions such as .then and .map.

`Cons of Promises:`

- Not as widely supported as callbacks, especially in older codebases.
- Slightly more complex to understand compared to callbacks.

---


Callback for the same code:

In the callback pattern, we typically pass a callback function that handles both success and error cases.

        function fetchData(callback) {
            setTimeout(() => {
                const name = 'kanish;

                if (name) {
                    callback(null, name); 
                } else {
                    callback(new Error()); 
                }
            }, 2000);
        }

        fetchData(function(error, name) {
            if (error) {
                console.log(error);
            } else {
                console.log(name);
            }
            console.log('Finally block executed');
        });


----

### Callback vs promise:


Callbacks                                                             | Promises                                                                 |
---------------------------------------------------------------------------|--------------------------------------------------------------------------|
| Pass a function as an argument to another function                        | Chainable methods (`then`, `catch`, `finally`)                           |
| Can lead to "callback hell" with nested structures                        | More readable and maintainable chaining syntax                           |
| Must be done within the callback function                                 | Built-in error handling with `catch`                                     ||
| Passing intermediate values through nested callbacks can be difficult  | Easier to pass intermediate values through chained `then` handlers       |                                   |
| Basic asynchronous operations, event handling                             | Complex asynchronous workflows                |


----
### Promise Methods:

1. Promise.all():

**Promise.all**
- Waits for all promises to resolve or any to reject.
- Useful for running multiple asynchronous operations in parallel and waiting for all of them to complete.

```javascript
        Promise.all([promise1, promise2, promise3])
        .then(results => {
                // Handle results
        })
        .catch(error => {
                // Handle error
        });
```

Example:


        p1 = Promise.resolve(50);
        p2 = 200
        p3 = new Promise(function (resolve, reject) {
                setTimeout(resolve, 100, 'geek');
        });

        Promise.all([p1, p2, p3]).then(function (values) {
                console.log(values);
        });

        // all p1,p2,p3 fulfilles


**2. Promise.any**

- Returns the promise value as soon as any one of the promises is fulfilled

        p1 = Promise.reject(50);
        p2 = 200
        p3 = new Promise(function (resolve, reject) {
                setTimeout(reject, 100, 'geek');
        });

        Promise.any([p1, p2, p3]).then(function (values) {
                console.log(values);
        });

        // only p2 is fulfilled


**3. Promise.allSettled**

        p1 = Promise.reject(50);
        p2 = 200
        p3 = new Promise(function (resolve, reject) {
                setTimeout(resolve, 100, 'geek');
        });

        Promise.allSettled([p1, p2, p3]).then(function (values) {
                console.log(values);
        });

        // all p1,p2,p3 fulfilles


![Screenshot 2024-07-29 200308](https://github.com/user-attachments/assets/9850d97e-8d57-4da7-af56-ecab13603be6)



## 4. Bluebird promise:

Bluebird is a popular library for working with Promises in JavaScript. It offers additional features and performance improvements over native Promises.

### Installation:

        npm install bluebird

Example usage:

        const Promise = require('bluebird');

        const promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('Hello from Bluebird!'), 1000);
        });

        promise.then(result => {
        console.log(result); 
        });


## Key Features

- Bluebird is optimized for performance, making it suitable for high-performance applications.

- Provides methods like `.map()`, `.reduce()`, and `.all()` for effective handling and aggregation of promises.

- Allows for the cancellation of promises, enabling you to halt execution when necessary.

- Improved error handling with `.catch()` and detailed stack traces for better debugging.

-  Methods like `.isFulfilled()` and `.isRejected()` to inspect the current state of a promise.

- Includes `Promise.promisify()` to convert callback-based functions into promises.


### i. Promise.resolved()

        const Promise = require('bluebird')

        const resolved = Promise.resolve("Resolved")

        resolved .then( value => {
        console.log(value)
        })

### ii. Promise.reject()

        const Promise1 = require('bluebird')

        const rejected = Promise1.reject("Rejected")

        rejected .then( value => {
        console.log(value)
        })

### iii. Bluebird.delay()

Returns a promise that resolves after a specified delay.

        const Bluebird = require('bluebird');

        Bluebird.delay(2000)
            .then(() => {
                console.log('This message appears after a 2-second delay');
            })
            .catch(error => {
                console.error('An error occurred:', error);
            });

### iv. Bluebird.map()

Maps over an array and returns a promise that resolves with an array of results.

            const Bluebird = require('bluebird');

            const numbers = [1, 2, 3, 4, 5];

            Bluebird.map(numbers, number => number * 2)
                .then(results => {
                    console.log('Doubled numbers:', results);
                })
                .catch(error => {
                    console.error('An error occurred:', error);
                });


### v. Bluebird.Promisify:

The promisify method is used to convert a callback-based function to a promise-based function.

        const Promise = require("bluebird");

        function multiply(x, y, callback) {
        setTimeout(() => {
            const z = x * y; 
            callback(null, z); 
        }, 1000); 
        }

        const promise = Promise.promisify(multiply);

        promise(3, 4)
        .then((result) => {
            console.log(result); 
        })
        .catch((error) => {
            console.error(error);
        });

The original multiply function uses a callback, Bluebird.promisify abstracts away the callback handling and allows you to work with the function using promises.

---

## 5. Async / Await:

-  Using async and await with promises simplifies asynchronous code and makes it look more like synchronous code.
- Async/await helps in handling asynchronous operations in a synchronous manner.

Async/await can return only success state.
Hence, error can be handled using (Exception Handling) try catch finally blocks.

    function add(x, y) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        const result = x + y;
        resolve(result); 
        }, 1000);
    });
    }

    async function calculateSum() {
        try {
            const sum = await add(3, 4); 
            console.log(sum); // Output: 7
            console.log("Hi")
        } 
        catch (error) {
            console.error(error); 
        }
    }

        console.log("Bye");
        calculateSum();

// async keyword is needed when we use await inside a function.

- The await keyword is placed before the call to a function or variable that returns a promise.

Though, entire code asynchronously that function that as await alone will run synchronously.

---

## Callback to Promise

    function subtract(x, y) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        const difference = x - y;
        resolve(difference);
        }, 1000);
    });
    }

    subtract(5, 3)
    .then((result) => {
        console.log(result); // 2
    })
    .catch((error) => {
        console.error(error);
    });


## Promise to async /await

    function subtract(x, y) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        const difference = x - y;
        resolve(difference);
        }, 1000);
    });
    }

    async function result() {
        const res = await subtract(5, 3);
        console.log(res); // Output: 2
    }

---

# HTTP

HTTP stands for “Hypertext Transfer Protocol.” It is a set of rules for sharing data on the World Wide Web (WWW). HTTP helps web browsers and servers communicate, allowing people to access and share information over the internet.

Client-Server Model: 
HTTP works on a request-response system. 

Application Layer Protocol:
HTTP operates within the Internet Protocol Suite

---
**HTTP Request**: A client's request to a server for data exchange.

- **HTTP Version**: Specifies the HTTP protocol version (e.g., HTTP/1.1).
- **URL (Uniform Resource Locator)**: Address of the requested resource.
- **HTTP Method**: Action to be performed on the resource (e.g., GET, POST).
- **HTTP Request Headers**: Additional metadata sent with the request.
- **HTTP Body**: Optional data sent with the request (e.g., form data).

---

**HTTP Response**: Server's reply to a client's request.

- **HTTP Status Code**: Outcome of the request (e.g., 200 OK, 404 Not Found).
- **HTTP Headers**: Additional metadata sent with the response.
- **HTTP Body**: Data or content sent from server to client.

---

### HTTP Methods

They describe what kind of actions does it do 
| Method | Description                                      |
|--------|--------------------------------------------------|
| GET    | Retrieve data from a specified resource.          |
| POST   | Submit data to be processed to a specified resource. |
| PUT    | Update a specified resource with new data.       |
| DELETE | Delete a specified resource.                     |
| HEAD   | Retrieve headers for a specified resource.       |
| PATCH  | Apply partial modifications to a resource.       |
| OPTIONS| Retrieve the supported HTTP methods for a resource. |

---

### HTTP Status Codes

HTTP status codes are three-digit responses from the server to the browser-side request.
| Code | Description                                           |
|------|-------------------------------------------------------|
| 100  | Informational - Continue, Switching protocols, Early hints |
| 200  | Success - The request has succeeded.                       |
| 300  | Redirectional - The requested resource has been redirected. |
| 400  | Client Side Error - The server cannot process the request due to client error syntax. |
| 500  | Internal Server Error - The server encountered an unexpected condition that prevented it from fulfilling the request. |

---

## HTTP Headers, Body and Content Types:

Headers: Provide metadata about the request/response.
Body: Contains the actual data being sent.
Content-Type: Tells the server/client how to interpret the data in the body.

### HTTP Headers:

Headers are metadata passed between the client and the server in an HTTP request or response. They provide information about the request or response, such as content type, length, and authentication tokens.

Common Headers:

- `Content-Type:` Specifies the media type of the resource (e.g., application/json, text/html).
- `Authorization:` Contains credentials for authenticating the client.
- `User-Agent:` Identifies the client application making the request.
- `Accept:` Informs the server about the content types the client can process.
- `Cookie`: Contains stored cookies sent by the client to the server

### HTTP Body:

### Request as JSON:
        {
        "name": "Kanish",
        "age": 22
        }

### Response:
        {
        "message": "Data received successfully",
        "status": "success"
        }

### HTTP Content Types:

Content-Type is a header that indicates the media type of the resource or the data in the body. It tells the server or client how to interpret the body of the request or response.

Content Type is also known as MIME (Multipurpose internet Mail Extension)Type. It is a HTTP header that provides the description about what are you sending to the browser.

MIME is an internet standard that is used for extending the limited capabilities of email by allowing the insertion of sounds, images and text in a message.

`Common Content Types`:

- text - (Plain / html)
- application (jar / pdf/ x-zip)
- audio (mp3)
- image (jpeg, png, gif)
- video (mp4)

---
