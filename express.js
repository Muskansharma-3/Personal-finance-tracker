const express =require("express");
const path = require("path");
const route = require("./router");

const app = express();
app.use(express.static(path.join(__dirname,'static')));
app.use(route);

app.listen(80,()=>{
    console.log("server is runing");
})