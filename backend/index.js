import express, { json } from "express";
import mysql from "mysql";
import cors from 'cors';

const app = express();
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",                        // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_current_password'; write into mysql querrande. its because default password is none and sometimes db doesnt work

    database: "test"
});

app.use(express.json());                        // allows to send any json file 
app.use(cors())

app.get("/", (req, res) => {
    res.json("Hello from backend")
})

//***** CRUD OPERATIONS ************* */

// get all books from database 

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books"
    db.query(q, (err, data) => {                //sends querry(q) +  error and data 
        if (err) return res.json(err)
        return res.json(data)
    })
})
// get one book

app.get("/books/:id", (req, res) => {
    const bookId = req.params.id

    const q = "SELECT * FROM books WHERE `id` = ?"
    // db.query(q, [bookId], (err, data) => {
    //     if (err) return res.json(err)                   //todo add validation error class to send err messages
    //     return res.json("Books details")
    // })
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]


    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err)                   //todo add validation error class to send err messages
        return res.json("Book has been updated successfully")
    })
})

// create a new book

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(q, [values], (err, data) => {            //sends querry(q) array of values[] +  error and data 
        if (err) return res.json(err)                   //todo add validation error class to send err messages
        return res.json("Book has been added to database")
    })

})

// update the book

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id
    const q = " UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]


    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err)                   //todo add validation error class to send err messages
        return res.json("Book has been updated successfully")
    })
})

// delete a book

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id
    const q = " DELETE FROM books WHERE `id` = ?"

    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err)                   //todo add validation error class to send err messages
        return res.json("Book has been deleted from database")
    })
})

app.listen(8800, () => {
    console.log('Server is ON and running on: http://localhost:8800')
})