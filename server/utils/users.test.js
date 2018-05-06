const expect = require('expect');
const {Users} = require('./users');

describe('Users' , () => {
  var users;
  beforeEach (() =>{
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    },{
      id: '2',
      name: 'Mike2',
      room: 'Other room'
    },{
      id: '3',
      name: 'Mike3',
      room: 'Node Course'
    }];
  });

  it('Should add a new user' , () =>{ //syncronis - no need to call done()
    var users = new Users();
    var id = 123;
    var name = 'a';
    var room = 'b';

    var check = {
      id,
      name,
      room
    };

    var resUser = users.addUser(id,name,room);
    expect(users.users).toEqual([check]);
    });

    it('Should return names of node Course' , () => {
      var resUserList = users.getUserList('Node Course');
      expect(resUserList).toEqual(['Mike','Mike3']);
    });

    it('Should return names of Other room' , () => {
      var resUserList = users.getUserList('Other room');
      expect(resUserList).toEqual(['Mike2']);
    });

    it('should remove a user', () => {
      var RemovedUser = users.removeUser('1');
      var resUserList = users.getUserList('Node Course');
      expect(resUserList).toEqual(['Mike3']);
      expect(RemovedUser.name).toBe('Mike');
    });

    it('should not remove a user', () => {
      var user = users.removeUser('6');
      var resUserList = users.getUserList('Node Course');
      expect(resUserList).toEqual(['Mike', 'Mike3']);
      expect(user).toBe(undefined);
    });

    it('should find a user', () => {
      var user = users.getUser('1');
      expect(user.name).toBe('Mike');
    });

    it('should not find a user', () => {
      var user = users.getUser('100');
      expect(user).toBe(undefined);
      // Gleich --> expect(user).toNotExist();
    });
  });
