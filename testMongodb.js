const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://acharyab2:OaRvySGCpmzvoPuF@acharyab2.wg17b1q.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(function(err,db){
	if(err) throw err
	console.log('Connected to database')
	const database=db.db('assignmentSix')
	database.collection('apiRequests').insertOne({gameId: 122, userName : "testUSerTwo"},function(err,result){
		if (err) throw err;
		database.collection('apiRequests').find({}).toArray(function(err, result){
			if (err) throw err
				console.log(result)
				db.close()
		})
	})
})


