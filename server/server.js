const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

var {generateMessage, generateLocationMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

var app = express()
var server = http.createServer(app)
var io = socketIO.listen(server)

app.use(express.static(publicPath))

server.listen(port, () => {
   console.log(`Starting on Port ${port}`)
})

io.on('connect', (socket) => {

    console.log('New User Connected')

    socket.on('disconnect', () => {
        console.log('Discounted from Client')
    })

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'))

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message)

        io.emit('newMessage', generateMessage(message.from, message.text))
        callback('This is from server');
    })

    socket.on('createLocationMessage', (coords) =>{
        console.log('createLocationMessage', 'Admin', coords.latitude, coords.longitude)

        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
        console.log('newLocationMessage')
    })
})

module.exports = {app}
