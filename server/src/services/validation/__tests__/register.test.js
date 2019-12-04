const validateLoginInput = require('../register') 

describe('validation', () => {
    describe('register', () => {
      it('should validateLoginInput return emptyError and isValid true ', async () => {
        const data = {
            email:'samuel.poudroux@hotmail.fr',
            password:'testtest',
            passwordConfirm:'testtest',
            pseudo:'test'
        };
        const expected = {
            errors: {},
            isValid:true
        }
        const result = await validateLoginInput(data);
        expect(result).toEqual(expected);
    }) 

    it('should validateLoginInput return the object with error.pseudo must be between 2 to 30 chars d  and isvalid=false', async () => {
        const expected = {
            errors: {pseudo:'pseudo must be between 2 to 30 chars'},
            isValid:false
        }
        const data = {
            email:'samuel.poudroux@hotmail.fr',
            password:'testtest',
            passwordConfirm:'testtest',
            pseudo:'a'
        };
        const result = await validateLoginInput(data);
        expect(result).toEqual(expected);
    }) 

    it('should validateLoginInput return the object with error.password=is required and Password and Confirm Password and isvalid=false', async () => {
        const expected = {
            errors: {password:'Password is required', passwordConfirm:'Password and Confirm Password must match' },
            isValid:false
        }

        const data = {
            email:'samuel.poudroux@hotmail.fr',
            password:'',
            passwordConfirm:'testtest',
            pseudo:'aa'
        };
        const result = await validateLoginInput(data);
        expect(result).toEqual(expected);
    }) 

    it('should validateLoginInput return the object with error.Password must have 6 char and isvalid=false', async () => {
        const expected = {
            errors: {password:'Password must have 6 chars',
            passwordConfirm:'Password must have 6 chars'},
            isValid:false
        }

        const data = {
            email:'samuel.poudroux@hotmail.fr',
            password:'testt',
            passwordConfirm:'testt',
            pseudo:'aa'
        };
        const result = await validateLoginInput(data);
        expect(result).toEqual(expected);
    }) 

    it('should validateLoginInput return the object with error Password and Confirm Password must match isvalid=false', async () => {
        const expected = {
            errors: {passwordConfirm:'Password and Confirm Password must match'},
            isValid:false
        }

        const data = {
            email:'samuel.poudroux@hotmail.fr',
            password:'teattest',
            passwordConfirm:'testtest',
            pseudo:'aaa'
        };
        const result = await validateLoginInput(data);
        expect(result).toEqual(expected);
    }) 


    });
});