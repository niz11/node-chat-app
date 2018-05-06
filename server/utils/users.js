//Users class - kind of array of users
class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    var user = {
      id,
      name,
      room
    }
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id); // Creating a new array, filtering out the id we want to remove
    }
    return user;
  }

  getUser (id) {
    return this.users.filter((user) => user.id === id)[0]; //We're getting one user array back! that's why we add the [0].
    //If not found - it return an Undefined
  }

  getUserList(room) {
    //Getting the list of users in the room - by filtering with the room name
    var users = this.users.filter((user) => {
      return user.room === room;
    });
    //Concet the array of objects to array of strings - because we only need to show the list of users in the room.
    var nameArray = users.map((user) => user.name); //maps out the id and room values

    return nameArray;
  }
}

module.exports = {
  Users
};
