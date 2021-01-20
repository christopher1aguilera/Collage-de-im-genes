const expressFileUpload = require('express-fileupload');
const express = require('express');
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(3003);
app.use( expressFileUpload({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: "El peso del archivo que intentas subir supera el limite permitido",
    })
    );

app.use(express.static("public"))
app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/formulario.html")
})

app.post("/imagen", (req, res) => {
    const { target_file } = req.files;
    const { posicion } = req.body;
    console.log(req)
    target_file.mv(`${__dirname}/public/imgs/imagen-${posicion}.jpg`, (err) => {
    res.redirect("/collage")
    });
});

app.get('/collage', (req, res) =>{
    res.sendFile(__dirname + '/collage.html')
  })  

app.get("/deleteImg/:nombre", (req, res) => {
    const { nombre } = req.params;
    console.log(nombre)
    fs.unlink(`${__dirname}/public/imgs/${nombre}`, (err) => {
    res.redirect("/collage")
    });
});