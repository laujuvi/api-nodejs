// Importa el módulo 'express' para manejar rutas y servidor HTTP
import express from 'express';

// Importa el módulo 'fs' para trabajar con archivos del sistema (en este caso, db.json)
import fs from "fs";

// Importa 'body-parser' para poder leer datos en formato JSON del cuerpo de las peticiones POST/PUT
import bodyParser from "body-parser"

// Crea una instancia de aplicación Express
const app = express();

// Configura la app para que pueda parsear automáticamente cuerpos JSON en las peticiones
app.use(bodyParser.json())

// Función para leer los datos desde db.json
const readData = () => {
    try {
        const data = fs.readFileSync("./db.json") // Lee el archivo completo
        return JSON.parse(data) // Convierte el contenido a un objeto JS
    } catch (error) {
        console.log(error) // Si hay error, lo imprime en consola
    }
}

// Función para escribir datos en db.json
const writeData = (data) => {
    try {
        // Convierte el objeto JS a JSON y lo escribe en el archivo
        fs.writeFileSync("./db.json", JSON.stringify(data))
    } catch (error) {
        console.log(error)
    }
}

// Ruta raíz para probar que el servidor está funcionando
app.get("/", (req, res) => {
    res.send("Hello world!!!")
})

// GET /books → devuelve todos los libros
app.get("/books", (req, res) => {
    const data = readData();       // Lee la base de datos
    res.json(data.books)           // Devuelve el array de libros
})

// GET /books/:id → devuelve un libro específico por ID
app.get("/books/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id) // Convierte el parámetro de la URL en número
    const book = data.books.find((book) => book.id === id) // Busca el libro por ID
    res.json(book)
})

// POST /books → crea un nuevo libro
app.post("/books", (req, res) => {
    const data = readData();       // Lee la base de datos
    const body = req.body;         // Extrae el cuerpo enviado en la petición

    // Obtener el ID máximo actual (si no hay libros, arranca en 0)
    const maxId = data.books.reduce((max, book) => {
        return book.id > max ? book.id : max;
    }, 0);

    const newBook = {
        id: maxId + 1, // Genera nuevo ID incremental
        ...body,                   // Copia los campos name, author, year
    }
    
    data.books.push(newBook);      // Agrega el nuevo libro al array
    writeData(data);               // Guarda el nuevo estado en db.json
    res.json(data);                // Devuelve la base de datos actualizada
})

// PUT /books/:id → actualiza un libro existente por ID
app.put("/books/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id)
    const bookIndex = data.books.findIndex((book) => book.id === id) // Busca el índice del libro

    // Reemplaza el libro existente con una mezcla del actual + lo nuevo
    data.books[bookIndex] = {
        ...data.books[bookIndex],
        ...body
    }

    writeData(data) // Guarda cambios en el archivo
    res.json(data)  // Devuelve la base actualizada
})

// DELETE /books/:id → elimina un libro por su ID
app.delete("/books/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id)
    const bookIndex = data.books.findIndex((book) => book.id === id)
    
    // Elimina el libro del array (1 solo elemento desde bookIndex)
    data.books.splice(bookIndex, 1)

    writeData(data) // Guarda la base actualizada
    res.json(data)  // Devuelve la base
})

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Server listening on port 3000')
});
