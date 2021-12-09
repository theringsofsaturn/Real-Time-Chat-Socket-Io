const users = []

// **************** ADD USER ****************
const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()

    const existingUser = users.find((user) => user.room === room && user.name === name)

    if(!name || !room) return { error: 'Username and room are required' }
    if(existingUser) return { error: 'Username is taken' }

    const user = { id, name, room }
    users.push(user)
    return { user }
}

// **************** REMOVE USER ****************
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if(index !== -1) return users.splice(index, 1)[0]
}

// **************** GET USER ****************
const getUser = (id) => users.find((user) => user.id === id)