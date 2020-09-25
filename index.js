const path = require("path"); //use path module
const express = require("express"); //use express module
const hbs = require("hbs"); //use hbs view engine
const bodyParser = require("body-parser"); //use bodyParser middleware
const mysql = require("mysql"); //use mysql database
const app = express();

//config koneksi
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "",
});

//connect ke database
conn.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected...");
});

//server listening
app.listen(8000, () => {
  console.log("Server is running at port 8000");
});

// View File Connect
app.set("views", path.join(__dirname, "views"));
// View engine
app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// route Home page
app.get("/", (req, res) => {
  let sql = "SELECT * FROM produk";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.render("lihat_produk", {
      results: results,
    });
  });
});

// route post
app.post("/simpan", (req, res) => {
  let data = req.body;
  console.log("datanya ", data);
  let sql = "INSERT INTO produk SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});

// route delete
app.get("/delete/:id", (req, res) => {
    let idProduk = req.params.id;
    let sql = "DELETE FROM produk WHERE id=" + idProduk + "";
    let query = conn.query(sql, (err, results) => {
      if (err) throw err;
      res.redirect("/");
    });
  });

// route view Edit
app.get("/edit/:id", (req, res) => {
  let idProduk = req.params.id;
  let sql = "SELECT * FROM produk WHERE id=" + idProduk + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.render("edit_produk", {
      results: results[0],
    });
  });
});

// route edit
app.post("/update", (req, res) => {
  let data = req.body;
  let sql =
    "UPDATE produk SET nama_produk = '" +
    data.nama_produk +
    "',jumlah = " +
    data.jumlah +
    ",harga = " +
    data.harga +
    ",keterangan = '" +
    data.keterangan +
    "' WHERE id =" +
    data.id +
    "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});
