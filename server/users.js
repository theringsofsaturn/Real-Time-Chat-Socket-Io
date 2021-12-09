const users = []

// **************** ADD USER ****************
const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase() 
    room = room.trim().toLowerCase()
    // trim() removes whitespace from the beginning and end of a string

    // check if user already exists in the users array. (check if the new user is trying to sign up the same room with the same username)
    const existingUser = users.find((user) => user.room === room && user.name === name) 

    if(!name || !room) return { error: 'Username and room are required' }
    if(existingUser) return { error: 'Username is taken' }

    // if the user doesn't exist, create new user and add it to the users array
    const user = { id, name, room }
    users.push(user)
    // return the new user, so we know exactly which user was pushed to the array
    return { user }
}

// **************** REMOVE USER ****************
const removeUser = (id) => {
    // find the user with the id that matches the id that was passed in
    const index = users.findIndex((user) => user.id === id)

    // if the index is -1, then the user doesn't exist
    if(index !== -1) return users.splice(index, 1)[0] // remove the userfrom the array
}
// **************** GET USER ****************
// getUser returns the user with the id that matches the id that was passed in
const getUser = (id) => users.find((user) => user.id === id)

// **************** GET USERS IN ROOM ****************
// getUsersInRoom returns an array of users that are in the room 
const getUsersInRoom = (room) => users.filter((user) => user.room === room)

module.exports = { addUser, removeUser, getUser, getUsersInRoom }