const HTTP_PORT = process.env.PORT || 3000;

const express = require("express");
const exphbs = require("express-handlebars");
const app  = express();

app.engine(".hbs", exphbs({
    extname: ".hbs",
    defaultLayout: false,
    layoutsDir: "./views"
}));

app.use(express.static("./public"));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.set("view engine", 'hbs');

app.get("/", function(req, res) {
    res.render("home");
});

const server = app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}`);
});