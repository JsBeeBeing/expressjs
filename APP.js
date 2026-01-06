require('dotenv').config()
const { error, log } = require('console')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const fs = require('fs')
const path = require('path')

console.log(process.env.PORT);

app.use(express.json())
app.get('/',(req,res)=>{
    res.send(
        `<h1>Pruebas remotas</h1>
        <p>Funcionando en puerto ${PORT}</p>
        `
    )
})

app.get('/user',(req,res)=>{
    fs.readFile('usuarios.json', 'utf-8',(err,data)=>{
        if(err)return res.status(500).send('Error');
        const usuarios = JSON.parse(data);
        
        return res.json(usuarios)
        
    })
})

app.post('/user',(req,res)=>{
    const newUser = req.body
    fs.readFile('usuarios.json','utf-8',(err,data)=>{
        if (err) return res.status(500).send(`Error ${err}`)
        const usuarios = JSON.parse(data);
        usuarios.push(newUser) /* Agrega al nuevo usuario dentro del texto, despues se reescribe este */
        fs.writeFile('usuarios.json',JSON.stringify(usuarios, null, 2),(err)=>{
            if(err) return res.status(500).send('Fallo el servidor')
                res.status(201).json({message: 'usuario creado',
             usuario: newUser})
       })  
    })
})


app.listen(PORT,()=>{
    console.log(`Funcionando http://localhost:${PORT}/`);
    
})
