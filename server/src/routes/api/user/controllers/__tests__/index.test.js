const { register, login} = require('../index') 
jest.mock('../../../../../services/validation/register')
jest.mock('../../model/user');

const mockData = require ('../../model/__mockDtata__/userData.json')

const User = require('../../model/user')

 const datagiven = {}

 datagiven.email= "samuel.poudroux@hotmail.fr"

 const data =  mockData.find(e => 
    e.email === datagiven.email
)
jest.spyOn(User, 'findOne').mockReturnValue(Promise.resolve(data))


const validateRegisterInput = require('../../../../../services/validation/register')

validateRegisterInput.mockImplementation(()=> {
    return ({errors :{ email: ''}, isValid:true})
})

describe('user controller', () => {
    describe('register', () => {
        it('should return a json email: Email already exists', async () => {
            const body = {email:'samuel.poudroux@hotmail.fr'}
            const req = {body}
            const result = await register(req);
            const expected = {email:'samuel.poudroux@hotmail.fr'}
            expect(result).toEqual(expected);
        })
    })
})
       