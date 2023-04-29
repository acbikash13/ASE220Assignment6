const url = require('url');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const app = express();
const port = 8000;
var database = null
app.use(bodyParser.json());
const uri = "mongodb+srv://acharyab2:xXTxT0NfFpGYjnXE@acharyab2.wg17b1q.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
app.listen(port,async() => {
    console.log(`Example app listening on port ${port}`);
})
client.connect(function(err,db){
    if (err) throw err;
     database = db.db("BingoGame");

})
app.post('/api/auth/signin',(req, res) => {
    console.log(req.body);
    database.collection("users").find({}).toArray(function(err,result){
        console.log(result);
    })

})

// function POST(req,res){
//     let body = '';
//         req.on('data', chunk => {
//         body += chunk.toString();
//         });
//         req.on('end', () => {
//             // Parsing the requested URL and extracting the pathname
//             const url_components = url.parse(req.url, true);
//             const databaseName = url_components.pathname.split('/')[1];
//             const collectionName = url_components.pathname.split('/')[2];
//             const endPoint = url_components.pathname.split('/')[3];
//             //Connecting ot the database
//             const uri = "mongodb+srv://acharyab2:xXTxT0NfFpGYjnXE@acharyab2.wg17b1q.mongodb.net/?retryWrites=true&w=majority";
//             const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
//             const id = generateUniqueId(); // Generate a unique ID
//             // const collectionName = id; // Create a new collection using the name as  the id
//             const fileData = JSON.parse(body); // Parse the JSON data from the request body
            
//             // this if statement checks if the api is for creating users
//             // the api endpoint is something like
//             if(endPoint === "signup"){
//                 client.connect(function(err,db){
//                     const database =  db.db(databaseName)
//                     if (err) throw err
//                     console.log((fileData.username))
//                     // now we are checking if the user has an account or not. We are user the username which is the email of the user to check if the user has an account or not
//                     if(database.collection(collectionName).
//                     find(({username:fileData.username})).
//                     toArray(function(err, result){
//                             if (err) throw console.error;
//                             if (result.length ==0){
//                                 console.log("Username not  found. Can create a user.") ; 
//                                 database.collection(collectionName).insertOne((fileData),function(err, result){
//                                     if (err) throw err
//                                     res.write("User account created successfully!");
//                                     res.end();
//                                 })
//                             }
//                             else {
//                                 console.log("User with the same username exists. Consider loging in with the username!");
//                             }
//                         }
//                         )
//                     )
//                     client.close()
//                 }
//                 )
//             }
//             else if(endPoint=== "login") {
//                 client.connect(function(err,db){
//                     if (err) throw err
//                     const database =db.db(databaseName)
//                     if(database.collection(collectionName).
//                     find(({username:fileData.username,password:fileData.password})).
//                     toArray(function(err, result){
//                             if (err) throw console.error;
//                             if (result.length ==0){
//                                 console.log("Username not found. Please signup for the account");
//                                 res.end(alert("Password or email does not match."));
                                
//                             }
//                             else {
//                                 console.log("User with the same username exists. Consider loging in with the username!")
//                                 database.collection(collectionName).insertOne((fileData),function(err, result){
//                                     if (err) throw err
//                                     res.write("User account created successfully!");
//                                     res.end();
                                    
//                                 })

//                             }
//                         }
//                         )
//                     )
//                     client.close()
//                 })
//             }
//             else {
//                 client.connect(function(err,db){
//                     if(err) throw err
//                     console.log('Connected to database')
//                     const database = db.db(databaseName);
//                     database.collection(collectionName).insertOne((fileData),function(err,result){
//                         if (err) throw err;
//                         database.collection(collectionName).find({}, {name : {}}).toArray(function(err, result){
//                             if (err) throw err
//                                 console.log(result)
//                                 res.end(`The collection name is ${collectionName}`);
//                                 res.writeHead(200,{"Content_type":"text-plain"})
//                                 db.close()
//                                 client.close();
//                         })
//                     })
//                 })

//             }
//         }
//     )

// }; 

// function generateUniqueId() {
//     return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
//   }


  module.exports=POST;
