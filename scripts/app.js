const moveInc = 35;
const numbSecs = 7;

var user1 = "";
var user2 = "";
var car1Pos = 0;
var car2Pos = 0;
var showSubmit = false;
var raceCountdown = numbSecs;

$(document).ready(function(){

	console.log("DOM loaded");

  function gotBothNames() {
    user1 = $('#player1').val();
    user2 = $('#player2').val();
    if (user1 != "" && user2 !="" && showSubmit===false) {
      console.log("got both:" + user1 + " " + user2);
      let subButton = '<input id="Submit" type="submit" value="START!"/>';
      $('#userForm').append(subButton);
      showSubmit = true;
    }
  }

  $('#player1').on('keyup', gotBothNames);
  $('#player2').on('keyup', gotBothNames);

  $('#userForm').on('submit', function(event) {
    console.log("Form submitted");
    event.preventDefault();
    let greeting = `${user1} you with be the 'W' key and ${user2} you will be the 'O' key.`;
    // console.log(greeting);    
    $('#userForm').html('<h2>' + greeting + '</h2>');
    setTimeout(countDownFunc,1000);

    //ANIMATE THE CARS & CROWD!
  });

  $('#buttonAgain').on('hover', function() {
    console.log("again");
    car1Pos = 0;
    car2Pos = 0;
    raceCountdown = numbSecs;
    $('#car1').css("margin-left","0px");
    $('#car2').css("margin-left","0px");
  });

  function wonFunc(which) {
    console.log("*** " + which + " WON! ***");
    if (which===1) {
      var person = user1;
      var winImage = "images/car1.jpeg";
    } else {
      var person = user2;
      var winImage = "images/car2.jpeg";
    }
    let bigOlString = '<h2>OMG ' + person + ' won!</h2><br/><img src="' + winImage + '"><br/><button type="button" id="buttonAgain">Again</button><hr/>';
    console.log(person + " " + winImage);
    console.log(bigOlString);
    // $('#formDiv').html('<p>what is going on?</p>');
    $('#formDiv').html(bigOlString);
    raceCountdown = -1;     //locks out w & o
  }


  $(document).keypress(function(keyPressed) {
    if (raceCountdown===0) {
      if (car1Pos===0 && car2Pos===0) {
        clearInfo();
      }

      if (keyPressed.key==='w') {
        car1Pos += moveInc;
        console.log("pressed w:" + car1Pos + "px")
        $('#car1').css("margin-left",car1Pos + "px");
        if (car1Pos>(850-200)) {
          wonFunc(1);
        }
      } else if (keyPressed.key==='o') {
        car2Pos += moveInc;
        console.log("pressed o:" + car2Pos + "px")
        $('#car2').css("margin-left",car2Pos + "px");
        if (car2Pos>(850-200)) {
          wonFunc(2);
        }
      }
      console.log(keyPressed.key);
      console.log(typeof(keyPressed.key));
      // console.log(keyPressed.length);
    }
  });

/*
  var URL = 'http://api.giphy.com/v1/gifs/search';

  $('#gifForm').on('submit', function(event) {
  	// console.log("Form submited");
    $('.col-sm-3').remove();
  	event.preventDefault();
    var whatGif = $('#whatGif').val();
    // console.log('A:' + 'q=' + whatGif + '&api_key=dc6zaTOxFJmzC');
    // console.log('B:' + $("form").serialize());
  	$.ajax({
  		method: 'GET',
  		url: URL,
      data: $("form").serialize(),
  		// data: 'q=' + whatGif + '&api_key=dc6zaTOxFJmzC',
  		dataType: 'json',
  		success: onClickReqSuccess
  	})
  });

  function onClickReqSuccess (responseData) {
  	console.log("*** success ***");
    var picObjs = responseData.data;
    for (var i = 0; i<picObjs.length; i++) {
      var newString = '<div class="col-sm-3"><img src="' + picObjs[i].images.fixed_width.url + '"></div>';
      // console.log("New string: " + newString);
      $('#picsHere').append(newString);
    }
    // console.log(responseData);
  }
*/

});			// on load

function clearInfo(){
  $('#formDiv').html('');
}

function justSayGo () {
  // $('#formDiv').html('<h1>GO!</h1>');
  $('#countDown').html('<h1>GO!</h1>');
  // setTimeout(clearInfo,1500);
}

function countDownFunc() {
  raceCountdown--; 
  $('#countDown').html('<h2>Countdown: ' + raceCountdown + '</h2>');
  if (raceCountdown>0) {
    setTimeout(countDownFunc,1000);
  } else {
    setTimeout(justSayGo,1000);
  }
}