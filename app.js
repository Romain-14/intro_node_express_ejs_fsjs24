// DOC OFFICIEL
// https://expressjs.com/

// IMPORT
// en commonJS
// const express = require("express");
// en module
import express from 'express';
// création d'une instance de l'application
const app = express();
const PORT = 9000;

// configuration du rendu
// le chemin de nos 'vues'
app.set("views", "./views");
// spécifie le moteur de rendu utilisé
app.set("view engine", "ejs");

// middlewares express avec la méthode use, à chaque request sur le serveur ces middlewares seront lues( executés)
// pour récupérer les fichier statics et définir le dossier où ils se trouvent
app.use(express.static("public"));
// Pour récupérer les données d'un formulaire
// anciennement (avant la v4 d'express) il fallait utiliser la library body.parser aussi créer par la team Express qui a été intégré
// le true pour utiliser la lib 'qs', false pour la 'querystring'
app.use(express.urlencoded({extended: true}));

const check = (req, res, next) => {    
    if(req.url === "/") next();
}

const datas = [
    {id: 1, title: "mon chat", content: "chat trop kawai", author: "ro"},
    {id: 2, title: "mon voyage au pérou", content: "c'était trop cool le +40°", author: "antoine"},
    {id: 3, title: "antenne 4g", content: "c'est pas très cool", author: "anonyme"},
];

// on peut passer une custom middleware en second paramètre de notre route, effectuer un traitement et en fonction continuer sur le 3ème paramètre de la route avec la méthode next dans notre custom middleware, si on ne mets pass de next( la page reste bloquée)
app.get("/", check, (req, res) => {
        // on peut transmettre une donnée sous forme de variable au fichier ejs, via le second paramètre qui est un objet de la méthode render
        res.status(200).render("layout", {template: "./home", alias: "RO"}); //"/views/home.ejs"
});

app.get("/blog", (req, res) => {
    res.status(200).render("layout", {template: "./blog", datas: datas});
});

app.get("/blog/:id", (req, res) => {
    // le paramètre dynamique (slug) est récupéré dans la propriété "params" de l'objet "body"
    console.log("ID --> ", req.params.id);
    const [dataFiltered] = datas.filter(d => d.id === parseInt(req.params.id ));
    console.log(dataFiltered);

    res.status(200).render("layout", {template: "./detail", data: dataFiltered});
});

app.get("/contact", (req, res) => {
    res.status(200).render("layout", {template: "./contact"});
});

app.post("/contact", (req, res) => {
    // ici grace à body parser on récupère la/ les value(s) des inputs dans l'objet body
    // l'attribut name de l'élément html input fait office de key, et sa value -> sa value 
    res.status(301).redirect("/");
});

app.listen(PORT, ()=>{
    console.log(`Listening at http://localhost:${PORT}`);
});