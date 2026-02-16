require("dotenv").config();

const app = require("../app");
const dbconnect = require("../db/db");

try {
    dbconnect();
    app.listen(8000, () => {
        console.log("server connected");
    });
} catch (err) {
    console.error("Startup error:", err);
}