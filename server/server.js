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
const {equalsIgnoreCase} = require ('./utils/equals-ignore-case')


const port = process.env.PORT || 3000

var app = express()
var server = http.createServer(app)
var io = socketIO(server)
var users = new Users()

var rooms = []

io.on('connection', (socket) => {
    console.log('new user conected')



    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room))

            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`))

        }

        console.log("a socket is Disconnected")
    })

    socket.on('join' , (params, callback) => {
        if (!isRealString(params.name) && !isRealString(params.room)) {
            return callback('name and room name are required')
        }

        let room = rooms.find((room) => {
            return equalsIgnoreCase(room, params.room)
        })
        if(!room){
            rooms.push(params.room)
            io.emit('updateRoomList', rooms)
        }

        socket.join(room)
        users.removeUser(socket.id)
        users.addUser(socket.id, params.name, room)

        io.to(room).emit('updateUserList', users.getUserList(room))


        // socket.leave('some room')

        // io.emit -> io.to('some room').emit
        // socket.broadcast.emit -> socket.broadcast.to('some romm').emit
        // socket.emit
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


// app.get('/', (req, res) => {
//     res.render('index')
// })

server.listen(port, () => {
    console.log(`server running on port ${port}`)
})
