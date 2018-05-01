//socket is really important variable! the whole socket connection let us comunicate with events!
 var socket = io(); //avilable bacasue we loaded it up above! It makes a req from the client to the server to open up a web socket! and keep it alive
 socket.on('connect' , function () { //Event will fire once a client enter the website - both derection
   console.log('connected to server');

   // socket.emit('createEmail' , { //sends an email to the server
   //   to : "text@gmail.com",
   //   text: "Sent from client to server"
   // });

// No need of that, bcause io.emit emits the message to every connected user
   // socket.emit('createMessage' , { //sends a message to the server
   //   from : "newMessage@gmail.com",
   //   text: "Sent from client to server",
   //   createdAt : Date.now()
   // });
 });

 socket.on('disconnect', function () { // Error functions won't work on mobile browers or explorer!
   console.log('Disconnected from server');
 });

 // socket.on('newEmail' , function(email) { //
 //   console.log('New Email' , email);
 // });


 socket.on('newMessage' , function(message) { // gets the message from the server - message form another user! chat
   console.log('New message' , message);
 });
