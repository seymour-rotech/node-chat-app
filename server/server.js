const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

var {generateMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

var app = express()
var server = http.createServer(app)
var io = socketIO.listen(server)

app.use(express.static(publicPath))

server.listen(port, () => {
   console.log(`Starting on Port ${port}`)
})

// var server = app.listen(port, () => {
//     console.log(`Starting on Port ${port}`)
// })

io.on('connect', (socket) => {

    console.log('New User Connected')

    socket.on('disconnect', () => {
        console.log('Discounted from Client')
    })

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
    // {
    //     from : 'Admin',
    //     text : 'Welcome to the chat app',
    //     createAt : new Date().getTime() 
    // })

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'))
    // {
    //     from : 'Admin',
    //     text : 'New user joined',
    //     createAt: new Date().getTime()
    // })
    
    //socket.emit('newEmail', generateMessage('mike@example.com' , 'Hey. What is going on with server.js'))
    // {
    //     from : 'mike@example.com',
    //     text : 'Hey. What is going on within server.js',
    //     createAt: 123
    // })

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message)
        // io.emit('newMessage', {
        //     from : message.from,
        //     text : message.text,
        //     craetedAt: new Date().getTime()
        // })

        io.emit('newMessage', generateMessage(message.from, message.text))
        callback('This is from server');

        //socket.broadcast.emit('newMessage', generateMessage(message.from, message.text))
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

module.exports = {app}
