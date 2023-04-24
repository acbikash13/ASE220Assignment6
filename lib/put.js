const url = require('url');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
function PUT(req, res) {
    const uri = "mongodb+srv://acharyab2:OaRvySGCpmzvoPuF@acharyab2.wg17b1q.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

  // Get the URL components
    const url_components = url.parse(req.url, true);
    let databaseName = url_components.pathname.split('/')[1];
    let collectionName = url_components.pathname.split('/')[2];
    // Read the request data and append it to the existing file data
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });
    req.on('end', () => {
        client.connect(function(err,db){
            if(err) throw err
            console.log('Connected to database')
            const database=db.db(`${databaseName}`)
            database.collection(`${collectionName}`).insertOne(JSON.parse(data),function(err,result){
                if (err) {
                    console.log("Unable to insert the document.")
                    console.log(err);
                    res.end()
                }
                else {
                    console.log("Update successful!");
                    res.write(`Update written successfully`);
                    database.collection(`${collectionName}`).find({}).toArray(function(err, result){
                        if (err) throw err
                            console.log(result)
                            db.close()
                    })
                    res.end();
                }
            })
        })    
    });
    }

    module.exports = PUT;