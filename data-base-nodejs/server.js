const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3002;

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'biblioteca'
});

// Conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos desde el directorio actual
app.use(express.static(path.join(__dirname)));

// Ruta para servir tu archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para obtener todos los libros
app.get('/libros', (req, res) => {
  connection.query('SELECT * FROM libros', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener los libros' });
      return;
    }
    res.json(results);
  });
});

// Ruta para obtener un libro por su ID
app.get('/libros/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM libros WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener el libro' });
      return;
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.json(results[0]); // Enviar solo el libro encontrado
  });
});

// Ruta para buscar libros por título o autor
app.get('/buscar', (req, res) => {
    const { q } = req.query;
    const sql = 'SELECT * FROM libros WHERE titulo LIKE ? OR autor LIKE ?';
    const query = `%${q}%`;
    connection.query(sql, [query, query], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error al buscar los libros' });
            return;
        }
        res.json(results);
    });
});

// Ruta para agregar un nuevo libro
app.post('/libros', (req, res) => {
  const { titulo, autor, anio_publicacion } = req.body;
  const sql = 'INSERT INTO libros (titulo, autor, anio_publicacion) VALUES (?, ?, ?)';
  connection.query(sql, [titulo, autor, anio_publicacion], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al agregar el libro' });
      return;
    }
    res.status(201).json({ id: results.insertId, titulo, autor, anio_publicacion });
  });
});

// Ruta para editar un libro existente
app.put('/libros/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, autor, anio_publicacion } = req.body;
  const sql = 'UPDATE libros SET titulo = ?, autor = ?, anio_publicacion = ? WHERE id = ?';
  connection.query(sql, [titulo, autor, anio_publicacion, id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al editar el libro' });
      return;
    }
    res.json({ id, titulo, autor, anio_publicacion });
  });
});

// Ruta para eliminar un libro
app.delete('/libros/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM libros WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al eliminar el libro' });
      return;
    }
    res.json({ message: 'Libro eliminado' });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});