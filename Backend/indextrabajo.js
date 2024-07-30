var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var port = process.env.PORT || 3000;

const MySql = require('./modulos/mysql.js');

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res){
	res.status(200).send({
		message: 'Pantalla de inicio'
	});
});

app.post('/obtenerPalabras', async function(req, res) {
	const result = await MySql.realizarQuery(`SELECT * FROM Words`);
	res.send(result);
});

app.post('/obtenerPuntajes', async function(req, res) {
	const result = await MySql.realizarQuery(`SELECT username, points FROM High_Scores INNER JOIN Users ON High_Scores.userid = Users.userid ORDER BY points DESC LIMIT 3;`);
	res.send(result);
});

app.post('/obtenerPalabra', async function(req, res) {
	const word = req.body.word;
	const result = await MySql.realizarQuery(`SELECT * FROM Words WHERE word = "${word}"`);
	if (result === undefined || result.length === 0){
		res.send({value: -1});
	} else if (word == result[0].word){
		res.send({value: 1});
	}
});

app.put('/agregarPalabra', async function(req, res) {
	const points = req.body.points;
	const userid = req.body.userid;
	let value = await MySql.realizarQuery(`SELECT * FROM High_Scores`);
	if (points > 0) {
		const result = MySql.realizarQuery(`INSERT INTO High_Scores (userid, points)
		VALUES (${userid}, ${points});`);
		res.send({message: 'Puntaje alto agregado', value: 1});
	}
});

app.put('/agregarPalabra', async function(req, res) {
	const word = req.body.word;
	let value = await MySql.realizarQuery(`SELECT * FROM Words WHERE word = "${word}"`);
	if (value === undefined || value.length === 0) {
		const result = MySql.realizarQuery(`INSERT INTO Words (word)
		VALUES ("${word}")`);
		res.send({message: 'Palabra agregada',value: 1});
	} else if (word == value[0].word){
		res.send({message: 'La palabra ya existe', value: -1});
	};
});

app.delete('/borrarPalabra', async function(req, res){
	const word = req.body.word;
	const result = await MySql.realizarQuery(`DELETE FROM Words WHERE word = "${word}"`);
	res.send({message:'Palabra borrada', value: 1});
})

app.put('/actualizarPalabra', async function(req, res){
	const word = req.body.word;
	const wordId = req.body.wordId;
	const test = await MySql.realizarQuery(`SELECT * FROM Words WHERE word = "${word}" AND wordid = ${wordId}`);
	if (test === undefined || test.length === 0){
		const result = await MySql.realizarQuery(`UPDATE Words SET word = "${word}" WHERE wordid = ${wordId}`);
		res.send({message:'Palabra actualizado', value: 1});
	} else {
		res.send({message: 'La palabra que intentas modificar está igual que en la Base de Datos por ende no se modificó',value: -1})
	}
})

app.post('/obtenerUsuario', async function(req, res) {
	const name = req.body.user;
	const password = req.body.password;
	let value = await MySql.realizarQuery(`SELECT * FROM Users WHERE username = "${name}" AND password = "${password}"`);
	console.log(value)
	if (value === undefined || value.length === 0){
		res.send({message: "El usuario no existe o la contraseña es incorrecta", value: -1})
	} else if (name == value[0].username && password == value[0].password){
		res.send({message: 'Usuario existente', value: 1, userid: value[0].userid});
	} 
});

app.post('/registrarUsuario', async function(req, res) {
	const name = req.body.user;
	const password = req.body.password;
	let value = await MySql.realizarQuery(`SELECT * FROM Users WHERE username = "${name}"`);
	if (value === undefined || value.length === 0) {
		const result = MySql.realizarQuery(`INSERT INTO Users (username, password)
		VALUES ("${name}", "${password}")`);
		res.send({message: 'Usuario registrado',value: 1});
	} else if (name == value[0].username){
		res.send({message: 'Usuario existente', value: -1});
	};
});

app.listen(port, function(){
	console.log(`Server running in http://localhost:${port}`);
	console.log('Defined routes:');
	console.log('[GET] http://localhost:3000/');
	console.log('[GET] http://localhost:3000/obtenerPalabras');
	console.log('[GET] http://localhost:3000/agregarPalabra');
	console.log('[GET] http://localhost:3000/borrarPalabra');
	console.log('[GET] http://localhost:3000/actualizarPalabra');
	console.log('[GET] http://localhost:3000/obtenerUsuario');
	console.log('[GET] http://localhost:3000/registrarUsuario');
});
