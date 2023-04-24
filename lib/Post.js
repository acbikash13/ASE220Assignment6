const url = require('url');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
function POST(req,res){
    let body = '';
        req.on('data', chunk => {
        body += chunk.toString();
        });
        req.on('end', () => {
            // Parsing the requested URL and extracting the pathname
            let url_components = url.parse(req.url, true);
            let databaseName = url_components.pathname.split('/')[1];
            //Connecting ot the database
            const uri = "mongodb+srv://acharyab2:OaRvySGCpmzvoPuF@acharyab2.wg17b1q.mongodb.net/?retryWrites=true&w=majority";
            const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
            const id = generateUniqueId(); // Generate a unique ID
            const collectionName = id; // Create a new collection using the name as  the id
            const fileData = JSON.parse(body); // Parse the JSON data from the request body
            client.connect(function(err,db){
                if(err) throw err
                console.log('Connected to database')
                const database = db.db(databaseName);
                database.collection(collectionName).insertOne((fileData),function(err,result){
                    if (err) throw err;
                    database.collection(collectionName).find({}, {name : {}}).toArray(function(err, result){
                        if (err) throw err
                            console.log(result)
                            db.close()
                    })
                })
            })
            // client.connect(function(err,db){
            //     if(err) throw err
            //     console.log('Connected to database')
            //     const database=db.db(databaseName);
            //     database.createCollection(collectionName,function(err, res){
            //         if (err) throw err;
            //         res.statusCode = 200
            //         console.log("Collection created!")
            //         // res.end(collectionName);

            //         client.close();
            //     }
            //     )
            // })
    })

}; 

function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }


  module.exports=POST;
