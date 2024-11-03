const express = require('express');

const app = express();


// server handler
app.use('/test',(req,res) => {
    res.send("hello ff from the server");
})


app.listen(3000,()=>{
    console.log("server is running on port 3000");
});