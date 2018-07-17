const path = require('path')
//const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

var {generateMessage} = require('./utils/message')
var app = express()

//var server = http.createServer(app)
var server = app.listen(port, () => {
    console.log(`Starting on Port ${port}`)
})
var io = socketIO.listen(server)

app.use(express.static(publicPath))

io.on('connect', function (socket) {

    console.log('New User Connected')

    socket.on('disconnect', () => {
        console.log('Discounted from Client')
    })

    socket.emit('newMessage', 
                generateMessage('Admin', 'Welcome to the chat app'))
    // {
    //     from : 'Admin',
    //     text : 'Welcome to the chat app',
    //     createAt : new Date().getTime() 
    // })

    socket.broadcast.emit('newMessage', 
                generateMessage('Admin', 'New User Joined'))
    // {
    //     from : 'Admin',
    //     text : 'New user joined',
    //     createAt: new Date().getTime()
    // })
    
    socket.emit('newEmail', 
                generateMessage('mike@example.com' ,
                                'Hey. What is going on with server.js'))
    
    // {
    //     from : 'mike@example.com',
    //     text : 'Hey. What is going on within server.js',
    //     createAt: 123
    // })

    socket.on('createMessage', function (message) {
        console.log('createMessage', message)
        // io.emit('newMessage', {
        //     from : message.from,
        //     text : message.text,
        //     craetedAt: new Date().getTime()
        // })

           socket.broadcast.emit('newMessage', 
                            generateMessage(message.from, message.text))
        //    {
        //     from : message.from,
        //     text : message.text,
        //     craetedAt: new Date().getTime()
        //    })

    })

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail)
    })
})

//server.listen(port, () => {
//    console.log(`Starting on Port ${port}`)
//})

module.exports = {app}
