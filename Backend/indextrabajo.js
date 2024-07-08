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

app.get('/saludo', function(req,res){
    console.log(req.query); //Los pedidos get reciben los datos del req.query
    res.send(`Hola ${req.query.nombre}, que tal?`);
});

app.get('/obtenerPilotos', async function(req,res){
    console.log(req.query);
	const respuesta = await MySql.realizarQuery('SELECT * FROM Pilotos;');
	console.log({respuesta});
	//Le devuelve al cliente la respuesta de la base de datos
	res.send(respuesta);
})

app.post('/obtenerPalabras', async function(req, res) {
	const result = await MySql.realizarQuery(`SELECT * FROM Words`);
	res.send(result);
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
		res.send({message: 'Usuario existente', value: 1});
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

app.post('/insertarGP', async function(req, res) {
	const name = req.body.nombre;
	const date = req.body.fecha;
	const circuit = req.body.pista;
	const id = req.body.gp_ID;
	let value = await MySql.realizarQuery(`SELECT gp_ID FROM GP WHERE gp_ID = ${id}`);
	if (value === undefined || value.length === 0){
		res.send({message:'GP agregado a la tabla'});
		const result = MySql.realizarQuery(`INSERT INTO GP (gp_ID, nombre, fecha, pista)
		VALUES (${id}, "${name}", "${date}", "${circuit}")`);
	} else if (id === value[0].gp_ID) {
		res.send({message:'El GP ya existe en la base de datos'});
	};
});

app.post('/insertarPilotosXGP', async function(req, res) {
	const pilotId = req.body.piloto_ID;
	const gpId = req.body.gp_ID;
	const position = req.body.posicion;
	const time = req.body.tiempo;
	const points = req.body.puntos;
	let value = await MySql.realizarQuery(`SELECT piloto_ID, gp_ID FROM PilotosXGP WHERE piloto_ID = ${pilotId} AND gp_ID = ${gpId}`);
	if (value === undefined || value.length === 0){
		res.send({message:'Piloto por GP agregado a la tabla'});
		const result = MySql.realizarQuery(`INSERT INTO PilotosXGP (piloto_ID, gp_ID, posicion, tiempo, puntos)
		VALUES (${pilotId}, ${gpId}, ${position}, "${time}", ${points})`);
	} else if (pilotId === value[0].piloto_ID && gpId === value[0].gp_ID){
		res.send({message:'El Piloto por GP ya existe en la tabla'});
	};
});

app.put('/actualizarPiloto', async function(req, res){
	const pilotId = req.body.piloto_ID;
	const number = req.body.numero;
	const result = await MySql.realizarQuery(`UPDATE Pilotos SET numero = "${number}" WHERE piloto_ID = ${pilotId}`);
	res.send({message:'Piloto actualizado'});
})

app.put('/actualizarGP', async function(req, res){
	const gpId = req.body.piloto_ID;
	const date = req.body.fecha;
	const result = await MySql.realizarQuery(`UPDATE Pilotos SET fecha = ${date} WHERE piloto_ID = ${gpId}`);
	res.send({message:'GP actualizado'});
})

app.put('/actualizarPilotosXGP', async function(req, res){
	const pilotId = req.body.piloto_ID;
	const gpId = req.body.gp_ID;
	const points = req.body.puntos;
	const result = await MySql.realizarQuery(`UPDATE PilotosXGP SET puntos = ${points} WHERE piloto_ID = ${pilotId} AND gp_ID = ${gpId}`);
	res.send({message:'Piloto por GP actualizado'});
})

app.delete('/borrarPiloto', async function(req, res){
	const pilotId = req.body.piloto_ID;
	const result = await MySql.realizarQuery(`DELETE FROM Pilotos WHERE piloto_ID = ${pilotId}`);
	res.send({message:'Piloto borrado'});
})

app.delete('/borrarGP', async function(req, res){
	const gpId = req.body.gp_ID;
	const result = await MySql.realizarQuery(`DELETE FROM GP WHERE gp_ID = ${gpId}`);
	res.send({message:'GP borrado'});
})

app.delete('/borrarPilotosXGP', async function(req, res){
	const pilotId = req.body.piloto_ID;
	const gpId = req.body.gp_ID;
	const result = await MySql.realizarQuery(`DELETE FROM PilotosXGP WHERE piloto_ID = ${pilotId} AND gp_ID = ${gpId}`);
	res.send({message:'Piloto borrado'});
})

app.listen(port, function(){
	console.log(`Server running in http://localhost:${port}`);
	console.log('Defined routes:');
	console.log('[GET] http://localhost:3000/');
	console.log('[GET] http://localhost:3000/obtenerPilotos');
	console.log('[GET] http://localhost:3000/obtenerPiloto');
	console.log('[GET] http://localhost:3000/obtenerGPS');
	console.log('[GET] http://localhost:3000/obtenerGP');
	console.log('[GET] http://localhost:3000/obtenerPilotoXGPS');
	console.log('[GET] http://localhost:3000/obtenerPilotoXGP');
	console.log('[POST] http://localhost:3000/insertarPiloto');
	console.log('[POST] http://localhost:3000/insertarGP');
	console.log('[POST] http://localhost:3000/insertarPilotosXGP');
	console.log('[DELETE] http://localhost:3000/borrarPiloto');
	console.log('[DELETE] http://localhost:3000/borrarGP');
	console.log('[DELETE] http://localhost:3000/borrarPilotosXGP');
});
