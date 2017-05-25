const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const publicPath = path.join(__dirname, '../public')
// console.log(__dirname + '../public')
// console.log(publicPath)

const port = process.env.PORT || 3000

var app = express()
var server = http.createServer(app)
var io = socketIO(server)

io.on('connection', (socket) => {
    console.log('new user conected')



    socket.emit('newMessage', {
        from: 'alvaro@example.com',
        text: 'hello from newMessage in the server',
        createdAt: 123
    })

    

    socket.on('disconnect', () => {
        console.log("a socket is Disconnected")
    })

    socket.on('createMessage', (data) => {
        console.log('createMessage got from the client.', data)
    })

})


app.use(express.static(publicPath))


// app.get('/', (req, res) => {
//     res.render('index')
// })

server.listen(port, () => {
    console.log(`server running on port ${port}`)
})
