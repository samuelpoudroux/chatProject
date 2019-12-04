const isEmpty = require('../empty') 

describe('services', () => {
    describe('isempty', () => {
        it('should isEmpty return true if object is empty', async () => {
            const result = await isEmpty({});
            expect(result).toEqual(true);
        })

        it('should isEmpty return false if object is not empty ', async () => {
            const result = await isEmpty({name:"ee"});
            expect(result).toEqual(false);
        })

        it('should isEmpty return true if value is null ', async () => {
            const result = await isEmpty(null);
            expect(result).toEqual(true);
        })
        it('should isEmpty return true if value isundifined ', async () => {
            const result = await isEmpty(undefined);
            expect(result).toEqual(true);
        })
        it('should isEmpty return true if value lenght is = O ', async () => {
            const result = await isEmpty('');
            expect(result).toEqual(true);
        })
    })
})