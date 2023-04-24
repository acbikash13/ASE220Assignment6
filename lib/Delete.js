const url = require('url');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
function DELETE(req,res){
        const uri = "mongodb+srv://acharyab2:OaRvySGCpmzvoPuF@acharyab2.wg17b1q.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        let url_components = url.parse(req.url,true);
        let databaseName = url_components.pathname.split('/')[1];
        let collectionName = url_components.pathname.split('/')[2];
        let documentId = url_components.pathname.split('/')[3];
        // we are assuming that the fileName is the collection of our MongoDb and delete will delete the specific document in that collection
        // we check if the mongoDB exists.
        //Connecting to the mongoDB
        client.connect(function(err,db){
            if (err) {
                console.log("SOme Error")
                res.write("database connection error");
                res.end();
                client.close();
        };
            console.log("Connected to Database");
            //check if the collection exists or not. If it does not exist, there is nothing to delete.
            const database =  db.db(databaseName)
            collection = database.collection(collectionName);
            console.log("connected to database");
            database.collection(collectionName).deleteOne({_id:new ObjectId(documentId)},function(err,result){
                if (err) {
                    console.log("Error deleting the document");
                    console.log(result)
                }
                else {
                    console.log(`document with the id ${documentId} deleted`);
                    console.log(result)
                }
                client.close();
            })
            database.collection(`${documentId}`).find({}).toArray(function(err, result){
                if (err) throw err
                console.log(result)
                db.close()
            })
        }
        );
            // var collectionExists = database.GetCollection(collectionName).Exists();
            // database.collection(collectionName,{strict:true}, function(err, result) {
            //     if (err) {
            //       console.log("The collection does not exist.");
            //       client.close();
            //       res.write("The collection does not exist.");
            //       res.end();
            //     } else {
            //         // if the collection exists, we need to find the specific collection name to delete the document
            //         // We already have collectin with the collectionName in the function argument so we dont have to again define a
            //         // const collection = database.collection(`${collectionName}`);
            //         console.log("Collection Exists!!");
            //         //Now check if the document exists or not. If exists delete the docuemnt and if not send a message saying that the document does not exist and we do not need to delete the document.
            //         result.findOne({gameId: new ObjectId(documentId)}, function(err, result){
            //             if (err) {
            //                 res.write("404 Document not found. No need to delete!!!");
            //                 res.end();
            //             }
            //             else{
            //                 collection.deleteMany({_id: documentId}, function(err, result){
            //                     if (err ){
            //                         res.write("Error deleting document!")
            //                         res.end();
            //                     }
            //                     else {
            //                         res.write(`${documentId} deleted successfully`);
            //                         res.end();
            //                     }
            //                     client.close();
            //                 })

            //             }
            //         })

            //     }
            // });
    
    }
module.exports=DELETE
