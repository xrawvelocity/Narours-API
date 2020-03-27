const app = require('express')();

app.get('/',(req,res)=>{
    res.status(200).json({
        message: "hello from serverside",
        app: "natours"
    })
})

app.post('/', (req,res)=>{
    res.send('You can post here')
})


const port = 3000
app.listen(port, ()=> {
    console.log("Running on port " + port)
})