const http = require('http');
const server = http.createServer().listen(8000);
const DELETE = require('./lib/Delete.js');
const PUT = require('./lib/put.js');
const GET = require('./lib/Get.js');
const POST = require('./lib/Post.js');

server.on('request',async(req,res)=>{
console.log(req.method);
switch (req.method){
	case 'GET':
		GET(req,res)
		break;
	case 'POST':
		POST(req,res)
		break;
	case 'PUT':
		PUT(req,res)
		break;
	case 'DELETE' :
		DELETE(req,res)
		break;
	default:
		res.statusCode = 405;
		res.end("Invalid Method");

}});








// && req.url === '/api/post'