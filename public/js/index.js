var socket = io();
        
socket.on('connect', function () {
    console.log('Connected to server')

    socket.emit('createEmail', {
        to: 'jen@example.com',
        text: 'Hey. This is Seymour from index.js.'
    })

    socket.emit('createMessage', {
        from: 'Andrew',
        text: 'Yup, that works for me within index.js'
    })
})

socket.on('disconnect', function () {
    console.log('Disconnected from server')
})

socket.on('newMessage', function (message) {
    console.log('New Message', message)
})

socket.on('newEmail', function (email) {
    console.log('New Email', email)
})