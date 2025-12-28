const express = require('express')
const app = express()
const PORT = 3000

app.get('/',(req,res)=>{
    res.send(
        `<h1>Hello World</h1>
        <p>Funcionando en ${PORT}</p>
        `
    )
})

app.listen(PORT,(req,res)=>{
    console.log(`Funcionando en puerto ${PORT}`);
    
})

