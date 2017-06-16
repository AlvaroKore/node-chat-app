const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const publicPath = path.join(__dirname, '../public')
// console.log(__dirname + '../public')
// console.log(publicPath)

const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation')
const {Users}  = require('./utils/users')
const {Rooms} = require('./utils/rooms')
const {equalsIgnoreCase} = require ('./utils/equals-ignore-case')


const port = process.env.PORT || 3000

var app = express()
var server = http.createServer(app)
var io = socketIO(server)
var users = new Users()
var rooms = new Rooms()



io.on('connection', (socket) => {
    console.log('new user conected')
    socket.emit('updateRoomList', rooms.rooms)

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id)

        if (user) {
            if(users.getUserList(user.room).length === 0) {
                rooms.removeRoom(user.room)
                io.emit('updateRoomList', rooms.rooms)
            }

            io.to(user.room).emit('updateUserList', users.getUserList(user.room))
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`))
        }

        console.log("a socket is Disconnected")
    })

    socket.on('join' , (params, callback) => {
        console.log('join')
        if (!isRealString(params.name) && !isRealString(params.room)) {
            return callback('name and room name are required')
        }

        if (users.existName(params.name)) {
            return callback('userName is already taken')
        }

        let room = rooms.rooms.find ((room) => {
            return equalsIgnoreCase (room, params.room)
        })

        if (!room) {
            room = params.room
            rooms.addRoom(room)
            io.emit('updateRoomList', rooms.rooms)
        }

        socket.join( room )
        users.removeUser( socket.id )
        users.addUser(socket.id, params.name, room)

        io.to(room).emit('updateUserList', users.getUserList(room))
        socket.emit("newMessage", generateMessage('Admin', 'Welcome to the chat app'))
        socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${params.name} has Joined`))

        callback()
    })

    socket.on('createMessage', (message , callback) => {
        var user = users.getUser(socket.id)
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))

        }
        callback()
    })

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id)
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
        }
    })

})


app.use(express.static(publicPath))
server.listen(port, () => {
    console.log(`server running on port ${port}`)
})
