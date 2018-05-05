//emit = launch
// socket.emit - creates a new event
//eknoledgments - an answer from the server to client(or opposite) that confirms the sented data is valid - if invalid? - tells the user
//socket is really important variable! the whole socket connection let us comunicate with events!
 var socket = io(); //avilable bacasue we loaded it up above! It makes a req from the client to the server to open up a web socket! and keep it alive
function scrollToBottom(){
  //selektors
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');//Choses the last messages, notice we call scrollToBottom after we add the new Message!
  //Heights - Dom properties! clientHeight,scrollTop,scrollHeight,innerHeight
  var clientHeight = messages.prop('clientHeight');
  //console.log(clientHeight);
  var scrollTop = messages.prop('scrollTop');
  //console.log(scrollTop);
  var scrollHeight = messages.prop('scrollHeight');
  //console.log(scrollHeight);
  var newMessageHeight = newMessage.innerHeight(); //height of the new message
  //console.log(newMessageHeight);
  var lastMessageHeight = newMessage.prev().innerHeight(); //height of the message one before the new one
  //console.log(lastMessageHeight);

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight)
    messages.scrollTop(scrollHeight); // Will scroll up to the bottom
}

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
   //console.log('New message' , message);
   var formatedTime = moment(message.createdAt).format('h:mm a');
   // var li = $('<li></li>');
   // li.text(`${message.from} ${formatedTime}: ${message.text}`);
   //
   // $('#messages').append(li);
   // Here starting wo work with a tamplate - tamplate in idex.to_html
   var template = $('#message-template').html();
   var html = Mustache.render(template , {
     text: message.text,
     from: message.from,
     createdAt: formatedTime
   }); // renders our tamplate with the values I send it

   $('#messages').append(html);

   scrollToBottom();
 });

 socket.on('newLocationMessage' , function(message) {
   //console.log('New location message' , message);
    var formatedTime = moment(message.createdAt).format('h:mm a');
   // var li = $('<li></li>');
   // li.text(`${message.from} ${formatedTime}: `);
   //
   // var a = $('<a target="_blank">My current location</a>');
   // a.attr('href' , message.url);
   //
   // $(li).append(a);
   // $('#messages').append(li);
   //using a tamplate starting here - tamplate in idex.to_html
   var template = $('#location-message-template').html();
   var html = Mustache.render(template , {
     url: message.url,
     from: message.from,
     createdAt: formatedTime
   }); // renders our tamplate with the values I send it

   $('#messages').append(html);

   scrollToBottom();
 });

 jQuery('#message-form').on('submit' , function(e) {
   e.preventDefault();
   var messageTextbox = $('[name=message]'); //To save re-writing code!

   socket.emit('createMessage' , {
     from : 'User',
     text: messageTextbox.val()
   } , function() {
     messageTextbox.val(''); // Cleaning the message text field after it was sent
   });
 });

 var locationButton = jQuery('#send-location');
//jQuery('#send-location').on ===
 locationButton.on('click' , function() {
   if (!navigator.geolocation) {
     return alert('geolocation not supported by your browser');
   }

   locationButton.attr('disabled', 'disabled').text('Sending location...'); //Disabling buttom while fetching the data - and giving the correct message

   navigator.geolocation.getCurrentPosition(function(position) {
    //console.log(position);
    locationButton.removeAttr('disabled').text('Send location');//anabling the button again
     socket.emit('createLocationMessage' ,{
       latitude : position.coords.latitude,
       longitude : position.coords.longitude
     });
   }, function() {
     locationButton.removeAttr('disabled').text('Send location');//anabling the button again. And back to original text
     alert('Unable to share location!');
   })

 });
