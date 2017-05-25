var socket = io()

socket.on('connect', function ()  {
    console.log('Connected to server')


    socket.emit('createMessage', {
        from: 'alvaro@example.com',
        text: 'createMessage from client'
    })


})

socket.on('disconnect', function  () {
    console.log('Disconnected from server')
})



socket.on('newMessage', function (data){
    console.log("newMeesage get from server:" , data)
})
