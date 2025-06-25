const express = require('express');
require('dotenv').config();
const urlModel = require('./models/url');
const cors = require('cors');
const randomkey = require("./utils/randomKey");

const app = express();

const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("Mongo DB connected successfully!");
})
.catch((e) =>{
    console.log("error: " + e);
});

app.post("/url/add", async(req, res) => {
    const { url } = req.body;
    const prefix = "http://localhost:4000/";
    const newUrl = prefix + randomkey();
    const doc = new urlModel({ url , newUrl });
    await doc.save();
    return res.json({ newUrl });
});

app.get("/:params", async(req, res) => {
    const { params } = req.params;
    const doc = await urlModel.findOne({ newUrl: `http://localhost:4000/${params}` });
    res.redirect(doc.url);
});

app.listen(process.env.PORT, () => {
    console.log(`Server is listening to port ${process.env.PORT} successfully!`);
});