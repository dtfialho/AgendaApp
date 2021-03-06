var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var api = express();
var bodyParser = require('body-parser');
var db = new sqlite3.Database('db');
var port = 8000;

// Uncomment to initialize the database
// db.serialize(function(){
// 	db.run("CREATE TABLE IF NOT EXISTS contacts(contact_id integer primary key autoincrement, name text, phone text, cellphone text, cpf text, email text, nascimento date)");
// 	db.run("INSERT INTO contacts(name, phone, cellphone, cpf, email, nascimento) VALUES('Diego Teixeira Fialho','(22) 2222-2222', '(99) 99999-9999', '123.456.789-12', 'diego.tfialho@gmail.com', '1990-04-21')");
// });

api.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

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
			if(!row) {
				res.sendStatus(403);
			} else {
				res.json(row);				
			}
		});
	} else {
		res.sendStatus(403);
	}
});

api.post('/edit', function(req, res){
	var data = req.body.contact;
	if (data) {
		db.run(
			"UPDATE contacts SET name = ?, phone = ?, cellphone = ?, cpf = ?, email = ?, nascimento = ? WHERE contact_id = ?",
			[
				data.name,
				data.phone,
				data.cellphone,
				data.cpf,
				data.email,
				data.nascimento,
				data.contact_id
			],
			function(error) {
				if(error)
					res.sendStatus(403);
				else
					res.sendStatus(200);
			}
		);
	}
});

api.post('/add/', function(req, res){
	var data = req.body.contact;
	if (data) {
		db.run(
			"INSERT INTO contacts(name, phone, cellphone, cpf, email, nascimento) VALUES(?,?,?,?,?,?)",
			[
				data.name,
				data.phone,
				data.cellphone,
				data.cpf,
				data.email,
				data.nascimento
			],
			function(error) {
				if(error)
					res.sendStatus(403);
				else
					res.sendStatus(200);
			}
		);
	}
});

api.get('/delete/:id', function(req, res){
	var id = req.params.id;
	if (id) {
		db.run("DELETE FROM contacts WHERE contact_id = ?", id, function(){
			res.sendStatus(200);
		});
	}
});

api.listen(port);

console.log("Running on http://localhost:" + port);