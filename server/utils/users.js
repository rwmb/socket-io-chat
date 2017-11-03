[
  {
    id: '/12dj',
    name: 'richard',
    room: 'A'
  }
]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
  constructor () {
    this.users = [];
  }

  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    // return user that was removed
    let removedUser = this.getUser(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }

  getUser (id) {
    return this.users.find((user) => user.id === id);
  }

  getUserList (room) {
    let users = this.users.filter((user) => user.room === room);
    let namesArray = users.map((user) => user.name);
    return namesArray;
  }
};

module.exports = {Users};