var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', function (req, res) {
  res.end('hello jser');
});

var ages = {};

app.post('/getResult', function (req, res) {
  var answers = req.body;

  var result = [];
  answers.forEach(function(answer) {
    console.log(typeof answer.questionNo);
    result[answer.questionNo] = answer.answer; 
  });

  var resultStr = result.join('');

  var age = getAgeByInput(resultStr);

  var userId = Math.ceil(Math.random() * 100000);

  res.cookie('userId', userId);

  ages[userId] = age;

  res.json({message: '我知道结果了，但是我不告诉你'});
});

app.get('/getAgeByUserId', function (req, res) {
  var userId = req.cookies.userId;

  var age = ages[userId];

  res.json(age);
});

app.listen(3000, function() {
  console.log('App listening on port 3000!');
});

function getAgeByInput(input) {
  if (input === '111') {
    return {
      left: 18,
      right: 40
    };
  }
  if (input === '112') {
    return {
      left: 40,
      right: 18
    };
  }
  if (input === '121') {
    return {
      left: 33,
      right: 21
    };
  }
  if (input === '122') {
    return {
      left: 50,
      right: 36
    };
  }
  if (input === '211') {
    return {
      left: 35,
      right: 12
    };
  }
  if (input === '212') {
    return {
      left: 45,
      right: 23
    };
  }
  if (input === '221') {
    return {
      left: 32,
      right: 11
    };
  }
  if (input === '222') {
    return {
      left: 70,
      right: 80
    };
  }
}
