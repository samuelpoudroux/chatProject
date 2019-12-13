  
var roomsArray = ['test', 'test2'];
const addRooms = (roomsData) => {
    if(roomsData !== undefined) {
        console.log("roomdata=>", roomsData)
        roomsArray.push(roomsData)
    }
  return { roomsArray }
}


module.exports = { addRooms};