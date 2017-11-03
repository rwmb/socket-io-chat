const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: '1',
        name: 'Mike',
        room: 'Node Course'
      },
      {
        id: '2',
        name: 'Jen',
        room: 'Node Course'
      },
      {
        id: '3',
        name: 'Julie',
        room: 'React Course'
      },
      {
        id: '4',
        name: 'Richard',
        room: 'Angular Course'
      }
    ];
  });

  it('should add new user', () => {
    let users = new Users();
    let user = {
      id: '1234567',
      name: 'Richard',
      room: 'The Flash fans'
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toContain(resUser);
  });

  it('should remove a user', () => {
    let removedUser = users.removeUser(users.users[0].id);
    expect(removedUser).toMatchObject(removedUser);
    expect(users.users).not.toContain(removedUser);
  });

  it('should not remove a user', () => {
    let lengthBefore = users.users.length;
    let removedUser = users.removeUser('111111');
    let lengthAfter = users.users.length;
    expect(removedUser).toBeFalsy();
    expect(lengthBefore).toBe(lengthAfter);
  });

  it('should find user', () => {
    let user = users.getUser(users.users[1].id);
    expect(user).toMatchObject(users.users[1]);
  });

  it('should not find user', () => {
    let user = users.getUser('22222');
    expect(user).toBeFalsy();
  });

  it('should return names for node course', () => {
    var userList = users.getUserList(users.users[0].room);
    expect(userList).toEqual([users.users[0].name, users.users[1].name]);
  });

  it('should return names for react course', () => {
    var userList = users.getUserList(users.users[2].room);
    expect(userList).toEqual([users.users[2].name]);
  });
});