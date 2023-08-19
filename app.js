const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const sql = require('mssql');

const app = express();
const port = 4040;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

const config = {
  server: 'SAMIR-SPRAUD02',
  database: 'dbase',
  options: {
    trustedConnection: true, 
  },
};

sql.connect(config).then(pool => {
  console.log('Conexión exitosa');

}).catch(err => {
  console.error('Error al conectar:', err);
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/page1', (req, res) => {
  res.render('page1');
});

app.get('/page2', (req, res) => {
  res.render('page2');
});

app.get('/page3', (req, res) => {
  res.render('page3');
});

app.get('/page4', (req, res) => {
  res.render('page4');
});

app.get('/form', (req, res) => {
    res.render('formulario');
  });

  app.post('/insertar', async (req, res) => {
    try {
      const pool = await sql.connect(config);
      const query = `INSERT INTO tabla (nombre, apellido, email, edad, ciudad) VALUES 
                     (@nombre, @apellido, @email, 
                      @edad, @ciudad)`;
  
      const request = pool.request()
        .input('nombre', sql.VarChar, req.body.nombre)
        .input('apellido', sql.VarChar, req.body.apellido)
        .input('email', sql.VarChar, req.body.email)
        .input('edad', sql.Int, req.body.edad)
        .input('ciudad', sql.VarChar, req.body.ciudad);
  
      await request.query(query);
      console.log('');
      res.redirect('/form');
    } catch (err) {
      console.error(err);
      res.send('Registro insertado correctamente');
    }
  });

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});