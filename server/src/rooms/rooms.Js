  
var roomsArray = ['test', 'test2'];
const addRooms = (roomsData) => {
    if(roomsData !== undefined) {
        console.log("roomdata=>", roomsData)
        roomsArray.push(roomsData)
    }
  return { roomsArray }
}

// const removeUser = (id) => {
//   console.log("users", users)
//   console.log("id",id)
//   const index = users.findIndex((user) => user.id === id);
//   console.log(index)

//   if(index !== -1) return users.splice(index, 1)[0];
// }

// const getUser = (id) => users.find((user) => user.id === id);

// const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addRooms };