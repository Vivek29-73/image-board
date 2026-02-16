const Imagekit=require("imagekit");
require("dotenv").config();


const imagekit=new Imagekit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT
});




async function uploadFile(buffer){
 
    const result=await imagekit.upload({
        file:buffer.toString("base64"),
        fileName:"image.jpg"

    });

    return result;
}

module.exports=uploadFile;