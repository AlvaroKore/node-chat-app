var socket = io()
socket.on('updateRoomList', function (rooms){
    console.log(rooms)
})
