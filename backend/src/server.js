require("dotenv").config();

const app=require("../app");
const dbconnect=require("../db/db");
dbconnect();





app.listen(8000,()=>{
    console.log("server connected");
});