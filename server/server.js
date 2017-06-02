const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const publicPath = path.join(__dirname, '../public')

const {generateMessage, generateLocationMessage} = require('./utils/message')
// console.log(__dirname + '../public')
// console.log(publicPath)

const port = process.env.PORT || 3000

var app = express()
var server = http.createServer(app)
var io = socketIO(server)

io.on('connection', (socket) => {
    console.log('new user conected')

    socket.emit("newMessage", generateMessage('Admin', 'Welcome to the chat app'))

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined!'))


    socket.on('disconnect', () => {
        console.log("a socket is Disconnected")
    })

    socket.on('createMessage', (message) => {

        io.emit('newMessage', generateMessage(message.from, message.text))

    })

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    })

})


app.use(express.static(publicPath))


// app.get('/', (req, res) => {
//     res.render('index')
// })

server.listen(port, () => {
    console.log(`server running on port ${port}`)
})
