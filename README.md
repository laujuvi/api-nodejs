# 📚 API REST con Node.js + Express

Este es un proyecto básico que implementa una API REST para gestionar libros, desarrollada con **Node.js** y **Express**.

Utiliza:
- `express`: para el manejo de rutas y servidor HTTP
- `nodemon`: para desarrollo con recarga automática
- `db.json`: como "base de datos" simulada en memoria

---

## 🚀 Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/laujuvi/api-nodejs.git
cd api-nodejs
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Correr el servidor en modo desarrollo**

```bash
npm run dev
```

---

## 🔌 Endpoints de la API

La API gestiona una colección de libros. Todos los datos se almacenan en `db.json`.

### `GET /books`
Devuelve todos los libros.

### `GET /books/:id`
Devuelve un libro por su ID.

### `POST /books`
Crea un nuevo libro. Requiere un JSON con:

```json
{
  "name": "Nombre del libro",
  "author": "Nombre del autor",
  "year": 2024
}
```

### `PUT /books/:id`
Actualiza un libro existente por ID. Se debe enviar todo el objeto:

```json
{
  "name": "Nuevo nombre",
  "author": "Nuevo autor",
  "year": 2000
}
```

### `DELETE /books/:id`
Elimina un libro por su ID.

---

## ✍️ Autor

Lautaro Vissio — [GitHub](https://github.com/laujuvi)

---

## 📄 Licencia

ISC — libre para uso, modificación y distribución.
