const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {Users} = require('./utils/users');
const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const publicPath = path.join(__dirname, '../public'); // path takes away the .. from the end path. - to reach my frontend files
//console.log(publicPath);
const port = process.env.PORT || 3000;

var app = express();
// When I call app.listen express actually calls http.createServer!
// var server = http.createServer((req,res) => {
// }); alternative -
 var server = http.createServer(app);
 var io = socketIO(server); // passing the server we want to use eith the web sockets,We we get back is our web socket server! here we can do anything we want in term of listing and doing events
//ready to expect new connectios!
//We have to run some javascript code to initiate the process. We we intigrated the socket.io server we also get accsses to a few more things - like a new libary(make it easy to work on socket.io on the client) + route - it's under - localhost:3000/socket.io/socket.io.js
// localhost:3000/socket.io/socket.io.js - conatins on the code we need on the client to make the connections!
var users = new Users(); //New class of users

// app.get('/' , (req , res) => {
//   res.sendFile(publicPath + '/index.html');
// }); ==
app.use(express.static(publicPath));
//LEt's you regster an event listener!
//connection - files an event when a cleint connects to the server
io.on('connection' , (socket) => { //
  console.log('New user connected'); //The message would come when I open the browser


  // socket.emit('newEmail' , { //The second parameter - here object will be sent with the newemail. The deat will bee send to index.html! client- to  socket.on as the first argument
  //   from: "Mike@gmail.com" ,
  //   text: "Banana",
  //   createdAt: 23
  // }); //Calling a method on socket. emit on the client and the server to emit events! instead on listiong to event -creating an event

// // No need of that, bcause io.emit emits the message to every connected user
//   socket.emit('newMessage' , { //custom event
//     from : "newMessage" ,
//     text: "newMessage" ,
//     createdAt : 1
//   });
  // For events we usually call soecket.on. io.on is a speciel mothod.
  // socket.on('createEmail' , (newEmail) => { // event that will be fired when the user sends an email to the server
  //   console.log('createEmail' , newEmail);
  // });

  socket.on('join' , (params, callback) => {
    if (!isRealString(params.room) || !isRealString(params.name))
      return callback('Room name and name are required');
    //Now making usre that only people from the save room will send and recive messages only to the room
    socket.join(params.room); // Special room for each room name! So easy
    //socket.leave(params.room) // to cick someone form the room
    // Now we need to change the emits, usw. To send only to the members of the room and not all users.
    // io.emit -> io.to('room name').emit - io.to - to send only to users that in this room
    // socket.broadcast.emit - > socket.broadcast.to('room name').emit
    // socket.emit
    users.removeUser(socket.id); // before joining a users to a room , we delete them from any other room they were
    users.addUser(socket.id , params.name , params.room); // socket.id has the users id!
    //Now emits the event to the user - to chat.js
    io.to(params.room).emit('updateUserList' , users.getUserList(params.room)); //Sends only to the users at this room! updating thier user list.
    // This message will be sent only to the new conencted user
      socket.emit('newMessage' , generateMessage('Admin' ,'Welcome to the chat'));
    // socket.broadcast.emit - the event will be sent to all users but myself! the new joined user
      socket.broadcast.to(params.room).emit('newMessage' , generateMessage('Admin' ,`${params.name} has joined`));
    callback(); // because the callback function has an error as parameter, if we send it back like this' it means no error acured and th data is ok.
  });

//socket.io emit to a single! connection , io.imit - imits to Every! single conection
  socket.on('createMessage' , (message , callback) => { // event that will be fired when the user sends a message to the server. listening to newMessage event
    //console.log('createMessage' , message);
    var user = users.getUser(socket.id);

    if (user && isRealString(message.text)) { //If user exsists and his message is valid
        io.to(user.room).emit('newMessage', generateMessage(user.name , message.text));
    }
    callback('This is from the Server');
  });

  socket.on('createLocationMessage' , (coords) => {
    var user = users.getUser(socket.id); //current user

    if (user)
    io.to(user.room).emit('newLocationMessage' , generateLocationMessage(user.name , coords.latitude , coords.longitude));
  });

  socket.on('disconnect' , () => {
    //console.log('User was Disconnected');
    var user = users.removeUser(socket.id);

    if (user) //if a user exists
    io.to(user.room).emit('updateUserList' , users.getUserList(user.room)); // Will remove the user from list when leaving - preventing multipling from the same user
    io.to(user.room).emit('newMessage' , generateMessage('Admin' , `${user.name} has left the room`));
  })
});


//To work with the socet we listen with the server we created. server and app are almost the same so the arguments are the same
server.listen(port , () => {
  console.log(`Server runs on - ${port}`);
})
