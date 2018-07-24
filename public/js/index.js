var socket = io();
        
socket.on('connect', function () {
    console.log('Connected to server')
})

socket.on('disconnect', function () {
    console.log('Disconnected from server')
})

socket.on('newMessage', function (message) {
    var formatedTime = moment().format('h:mm a');
    var li = jQuery('<li></li>')
    li.text(`${message.from} ${formatedTime} : ${message.text}.`)

    jQuery('#messages').append(li)
})

socket.on('newLocationMessage', function (message) {
    console.log('newLocationMessage : index.js')
    var formatedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li>/<li>')
    var a = jQuery('<a target = "_blank">My Current Location </a>')
    
    li.text(`${message.from}  ${formatedTime} : `)
    a.attr('href', message.url)
    li.append(a)

    jQuery('#messages').append(li)
})

socket.on('newEmail', function (email) {
    console.log('New Email', email)
})

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault()
    socket.emit('createMessage', {
        from : 'User',
        text : jQuery('[name=message]').val()
    }, function() {        
    })
})

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser')
    }

    navigator.geolocation.getCurrentPosition( function (position) {
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function() {
        alert('Unable to feth location.')
    })
})