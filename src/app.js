const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

const mainRoutes = require('./routes/main');

app.use(express.static(path.join(__dirname, "/public")));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/', mainRoutes)

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
});