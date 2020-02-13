// implement your API here

const express = require('express');
let database = require('./data/db.js');

const server = express();

server.use(express.json());



// const users = require('./data/seeds/users.js');
// const users = [
//   {
//     id:0,
//     name: "Jane Doe", // String, required
//     bio: "Not Tarzan's Wife, another Jane",  // String, required
//
//   },
//   {
//     id:1,
//     name: "John Doe", // String, required
//     bio: "Not Tarzan's Wife's Brother, another John",  // String, required
//
//   },
//   {
//     id:2,
//     name: "Doe Butkus", // String, required
//     bio: "Who knows really..",  // String, required
//
//   }];

// make sure the server is up
server.get('/', (req, res) => {
  res.json({ message: "It is up"});
})

// get all users
server.get('/api/users', (req, res) => {
  database.find()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json({ errorMessage: "The users information could not be retrieved." }))

})

// get a specific user
server.get('/api/users/:id', (req, res) => {
  database.findById(req.params.id)
    .then(data =>{
      if(data){
        res.status(200).json(data)
      } else {
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })

      }})
    .catch(err => res.status(500).json({ errorMessage: "The user information could not be retrieved." }))

})

// add a user
server.post('/api/users', (req, res) => {

  if(!req.body.name || !req.body.bio){
    return res.status(400).json({ errorMessage: "Please provide name and bio for the user."});
  } else {
    database.insert({name: req.body.name, bio: req.body.bio})
      .then(data => { res.status(201).json(data)})
      .catch(err => { res.status(500).json({ errorMessage: "There was an error while saving the user to the database."})})
  }
})


// update a user

server.put('/api/users/:id', (req, res) => {
  if(!req.body.name || !req.body.bio){
    return res.status(400).json({ errorMessage: "Please provide name and bio for the user to update."});
  } else {
    database.update(req.params.id, {name: req.body.name, bio: req.body.bio})
      .then(data => {
        if(data == 0){
          res.status(404).json( { errorMessage: "The user with the specified ID does not exist." });
        } else {
          res.status(200).json({name: req.body.name, bio: req.body.bio})}
        })
      .catch(err => { res.status(500).json({ errorMessage: "There was an error while saving the user to the database."})})
  }

})

// delete a user

server.delete('/api/users/:id', (req, res) => {
  database.findById(req.params.id)
    .then(data => {
      if(data){
        database.remove(req.params.id)
        .then(data2 => {
          res.status(200).json({data});
        })
        .catch(err2 => res.status(500).json({ errorMessage: "The user could not be removed" }))
      } else {
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })

      }})
    .catch(err => res.status(500).json({ errorMessage: "The user information could not be retrieved." }))
})



server.listen(5000, () => {
  console.log('Server running on local host port 5000');
})

// const http = require('http');
//
// const hostname = '127.0.0.1';
// const port = 3000;
//

// const server = http.createServer((req, res) =>{
//
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World!');
//
// });
//
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// })
