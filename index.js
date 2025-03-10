const express = require('express')
const app = express()
const port = 3001

const USERS = [];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];


const SUBMISSION = [

]

app.post('/signup', function(req, res) {
  // Add logic to decode body
  // body should have email and password
  const { email, password} = req.body;
  //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)
  const user = USERS.find(user => user.email === email);
  if(user){
    USERS.push(user);
  }
  
  // return back 200 status code to the client
  res.status(200);
})

app.post('/login', function(req, res) {
  // Add logic to decode body
  // body should have email and password
  const {email,password} = req.body;
  // Check if the user with the given email exists in the USERS array
  // Also ensure that the password is the same
  const user = USERS.find(user => user.email === email);
  if (user && user.password === password) {
    const token = generateToken(); 
    res.status(200).json({ token });
  } else {
    res.sendStatus(401);
  }
  
  // If the password is the same, return back 200 status code to the client
  // Also send back a token (any random string will do for now)
  // If the password is not the same, return back 401 status code to the client
  
})

// Helper function to generate a random token
function generateToken() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 32; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters[randomIndex];
    }
    return token;
  }

app.get('/questions', function(req, res) {

  //return the user all the questions in the QUESTIONS array
  res.json(QUESTIONS);
})

app.get("/submissions", function(req, res) {
   // return the users submissions for this problem
  res.json(SUBMISSION);
});


app.post("/submissions", function(req, res) {
   // let the user submit a problem, randomly accept or reject the solution
   // Store the submission in the SUBMISSION array above
   const { problem } = req.body;

   const submission = {
     problem,
     accepted: Math.random() < 0.5 // Randomly accept or reject the solution
   };
 
   SUBMISSION.push(submission);
 
   res.status(200).json({ message: 'Problem submitted successfully.' });
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})
