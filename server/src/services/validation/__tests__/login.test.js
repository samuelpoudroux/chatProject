const validateLoginInput = require('../login') 

describe('validation', () => {
    describe('login', () => {
      it('should validateLoginInput return emptyError and isValid true ', async () => {
        const data = {
            email:'samuel.poudroux@hotmail.fr',
            password:'testtest'
        };
        const expected = {
            errors: {},
            isValid:true
        }
        const result = await validateLoginInput(data);
        expect(result).toEqual(expected);
    }) 

    it('should validateLoginInput return the object with error.mail=is required  and isvalid=false', async () => {
        const expected = {
            errors: {email:'Email is required'},
            isValid:false
        }
        const data = {
            email:null,
            password:'testtest'
        };
        const result = await validateLoginInput(data);
        expect(result).toEqual(expected);
    }) 

    it('should validateLoginInput return the object with error.password=is required and isvalid=false', async () => {
        const expected = {
            errors: {password:'Password is required'},
            isValid:false
        }

        const data = {
            email:'samuel.poudroux@hotmail.fr',
            password:null
        };
        const result = await validateLoginInput(data);
        expect(result).toEqual(expected);
    }) 
    });
});