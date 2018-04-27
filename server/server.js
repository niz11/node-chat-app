const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public'); // path takes away the .. from the end path. - to reach my frontend files
//console.log(publicPath);

var app = express();

const port = process.env.PORT || 3000;

app.get('/' , (req , res) => {
  res.sendFile(publicPath + '/index.html');
});

app.listen(port , () => {
  console.log(`Server runs on - ${port}`);
})
