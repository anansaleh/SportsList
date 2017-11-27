# SportsList
A Node.js application that calls the following URL and navigates through it's content.
URL: http://www.betvictor.com/live/en/live/list.json

---

## Folders hierarchy

- **client** : is the main application
- **server**: is a local server (see problem..)

## Routes hierarchy (client)

- (/sports) Method to list all sports
- (/sports/:id) Method to list all sports
- (/sports/:id/events/:id) Method to list all outcomes for a given event

---

## Installation
1.  you must have node.js install in your system
2. Download the application
3. in **index.js** change the following:
a. URL= "http://localhost:3002/" to URL= "http://www.betvictor.com/live/en/live/list.json".
b. PORT =3000 to as port you want.
3. in application folder run the following
a. **npm install**
b. **npm start**

Thats's all

---

## packages used

1.  express
2. body-parser
3. ejs
4. request
5. morgan

---

## Problems

maybe you will have problem to access the url http://www.betvictor.com/live/en/live/list.json as I had.
So do the following:
in folder < **server** >  I have a small application server that read the json file from the local disk and response it
the server run at  http://localhost:3002/

I have access the url http://www.betvictor.com/live/en/live/list.json via VPN and save the json file in my local hard disk.

---

## TODO
- Full test coverage by Mocha

---

