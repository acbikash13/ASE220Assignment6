// Importing required modules
const url = require('url');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// Defining a function to handle HTTP GET requests
function GET(req, res) {
  // Parsing the requested URL and extracting the pathname
  let url_components = url.parse(req.url, true);
  let databaseName = url_components.pathname.split('/')[1];
  let collectionName = url_components.pathname.split('/')[2];
  //Connecting ot the database
  const uri = "mongodb+srv://acharyab2:OaRvySGCpmzvoPuF@acharyab2.wg17b1q.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  client.connect(function(err,db){
    if(err) throw err
    console.log('Connected to database')
    const database=db.db(`${databaseName}`)
    database.collection(`${collectionName}`).find({}).toArray(function(err, result){
      if (err) {
        res.write("Error in getting the collection");
        console.log("errror in getting the collections!");
        res.end();
        throw err;}
      res.write("Data Accquired")
      res.end(JSON.stringify(result));
      res.writeHead(200,{"content-type":"application/JSON"})
      db.close()
    })
  })
};


module.exports=GET
