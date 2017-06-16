class Rooms {

    constructor () {
        this.rooms = []
    }

    addRoom(room) {
        this.rooms.push(room)
    }

    removeRoom(room) {
        this.rooms = this.rooms.filter((roomAux) => {
            return roomAux !== room
        })
        return room
    }




}

module.exports = {Rooms}
