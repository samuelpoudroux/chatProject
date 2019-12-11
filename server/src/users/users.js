  
const users = [];

const addUser = ({ id, name, room }) => {

  // console.log("adduser=> ", name, id, room)
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name);

  if(!name || !room) return { userError: 'Username and room are required.' };
  if(existingUser) return { userError: 'Username is taken.' };

  const user = { id, name, room };

  users.push(user);
  // console.log("users", users)

  return { user };
}

const allUsers = () => {
  return  users ;
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  console.log(index)
  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser =  (id) =>  {
  // console.log(id)
  // console.log('getUser =>', users)
  return users.find((user) => user.id === id);
}

const getUsersInRoom = (room) => users.filter((user) => user.room === room);
// allUsers
module.exports = { addUser, removeUser, getUser, getUsersInRoom, allUsers };