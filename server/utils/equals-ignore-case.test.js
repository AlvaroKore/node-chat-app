const expect = require('expect')
const {equalsIgnoreCase} = require ('./equals-ignore-case')

describe('equalsIgnoreCase', () => {
    it('should return true' , () => {
        expect(equalsIgnoreCase('alva', 'AlVa')).toBe(true)
    })

    it('should return false', () => {
        expect(equalsIgnoreCase('alv', 'aLVA')).toBe(false)
    })
})
