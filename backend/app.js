const express = require("express");
require("dotenv").config({ path: require('path').resolve(__dirname, './src/.env') });
const multer=require("multer");
const uploadFile=require("./service/storage-service");
const postModel=require ("./models/post-schema")

const app = express();
// Add body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer();



app.post("/create-post", upload.single("image"), async (req, res) => {
    try {   

        if (!req.file) {
            return res.status(400).json({ error: "No image file uploaded." });
        }

        const result = await uploadFile(req.file.buffer);
        const post = await postModel.create({
            image: result.url,
            caption: req.body.caption
        });

        console.log(post);
        console.log(result);

        res.status(201).json({
            message: "post created successfully",
            post
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || "Internal server error" });
    }
});

app.get("/posts", async (req,res)=>{

    const posts=await postModel.find();

    return res.status(200).json({
        message:"post fetched successfully",
        posts
    })

})






module.exports=app;