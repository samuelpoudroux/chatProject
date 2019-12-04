const userData = require ('./__mockDtata__/userData.json')

const findOne = async (user) => {
 const data = userData.find( u => u.email = user.email)
    return data
}

module.exports = {
  User: {findOne: findOne}
  };
  