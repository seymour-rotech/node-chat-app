const path = require('path')
//const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

var app = express()

//var server = http.createServer(app)
var server = app.listen(port, () => {
    console.log(`Starting on Port ${port}`)
})
var io = socketIO.listen(server)

app.use(express.static(publicPath))

io.on('connect', (socket) =>{
    console.log('New User Connected')

    socket.on('disconnect', () => {
        console.log('Discounted from Client')
    })

    socket.emit('newMessage', {
        from : 'John',
        text : 'See you then within server.js',
        createAt : 12345 
    })

    socket.emit('newEmail', {
        from : 'mike@example.com',
        text : 'Hey. What is going on within server.js',
        createAt: 123
    })

    socket.on('createMessage', (message) => {
        console.log('createMessage', message)
        io.emit('newMessage', {
            from : message.from,
            text : message.text,
            craetedAt: new Date().getTime()
        })
    })

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail)
    })
})

//server.listen(port, () => {
//    console.log(`Starting on Port ${port}`)
//})

module.exports = {app}
