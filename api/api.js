var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var api = express();
var db = new sqlite3.Database('db');
var port = 8000;

// Uncomment to initialize the database
// db.serialize(function(){
// 	db.run("CREATE TABLE IF NOT EXISTS contacts(contact_id integer primary key autoincrement, name text, phone text, cellphone text, cpf text, email text, nascimento date)");
// 	db.run("INSERT INTO contacts(name, phone, cellphone, cpf, email, nascimento) VALUES('Diego Teixeira Fialho','(24) 2280-6445', '(24) 98858-8704', '142.770.907-61', 'diego.tfialho@gmail.com', '1990-04-21')");
// });

api.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

api.get('/', function(req, res){
	res.send("Agenda API");
});

api.get('/contacts/', function(req, res){
	db.all("SELECT * FROM contacts", function(err, row){
		res.json(row);
	});
});

api.get('/contact/:id', function(req, res){
	if (req.params.id) {
		var id = req.params.id;
		db.get("SELECT * FROM contacts WHERE contact_id = ?", id, function(err, row){
			res.json(row);
		});
	}
});

api.listen(port);

console.log("Running on http://localhost:" + port);