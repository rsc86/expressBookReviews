const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here

  const username = req.body.username;
  const password = req.body.password;

  // Check if both username and password are provided
  if (username && password) {
      // Check if the user does not already exist
      if (!isValid(username)) {
          // Add the new user to the users array
          users.push({"username": username, "password": password});
          console.log(users)
          return res.status(200).json({message: "User successfully registered. Now you can login"});
      } else {
          return res.status(404).json({message: "User already exists!"});
      }
  }
  // Return error if username or password is missing
  return res.status(404).json({message: "Unable to register user."});

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here

  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    },6000)})

    //Call the promise and wait for it to be resolved and then print a message.
    myPromise.then((successMessage) => {
    return res.status(200).json(books);
  })

  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    },6000)})

    //Call the promise and wait for it to be resolved and then print a message.
    myPromise.then((successMessage) => {
        return res.status(200).json(books[isbn]);
  })

  

 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here

  const author = req.params.author

  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    },6000)})

    //Call the promise and wait for it to be resolved and then print a message.
    myPromise.then((successMessage) => {
        for (const [index, value] of Object.entries(books)) {
            console.log(index, value.author);
        
            if (author == value.author) {
              return res.status(200).json(value);
            }
        
          }
  })
  


});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title

  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    },6000)})

    //Call the promise and wait for it to be resolved and then print a message.
    myPromise.then((successMessage) => {
        for (const [index, value] of Object.entries(books)) {
            console.log(index, value.title);
        
            if (title == value.title) {
              return res.status(200).json(value);
            }
        
          }
  })


});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn

  for (const [index, value] of Object.entries(books)) {
    if (Number(index) == Number(isbn)) {
      return res.status(200).json(value.reviews);
    }
  }
});

module.exports.general = public_users;
