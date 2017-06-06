const expect = require('expect')
const {Users} = require('./users')

describe('Users' , () => {

    var users
    beforeEach( () => {
        users = new Users()
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        },
        {
            id: '2',
            name: 'Alvarito',
            room: 'React Course'
        },
        {
            id: '3',
            name: 'Sammy',
            room: 'Node Course'
        }
    ]
    })

    it('should add new user' , () => {
        var users = new Users()
        var user = {
            id: '123',
            name: 'Alvaro',
            room: 'The Office Fans'
        }

        var resUser = users.addUser(user.id, user.name, user.room)

        expect(users.users).toEqual([user])


    })

    it('should remove a user', () => {
        var user = users.removeUser('1')
        expect(user.id).toBe('1')
        expect(users.users.length).toBe(2)
    })

    it('should not remove a user', () => {
        var user = users.removeUser('22')
        expect(user).toNotExist()
        expect(users.users.length).toBe(3)
    })

    it('should find user' , () => {
        var user = users.getUser('1')
        expect(user).toExist()
        expect(user.name).toBe('Mike')

    })


    it('should not find user' , () => {
        var user = users.getUser('111')
        expect(user).toNotExist()
        expect(users.users.length).toBe(3)
    })

    it('should return names for Node Course', () => {
        var userList = users.getUserList('Node Course')

        expect(userList).toEqual(['Mike', 'Sammy'])
    })

    it('should return names for React Course', () => {
        var userList = users.getUserList('React Course')

        expect(userList).toEqual(['Alvarito'])
    })









})
