const moveInc = 35;     //amount to move each keystroke
const numbSecs = 7;     //GO countdown
const animateCar = "animated pulse infinite";
const animateCrowd = "animated tada infinite";

var user1 = "";
var user2 = "";
var car1Pos = 0;
var car2Pos = 0;
var showSubmit = false;
var raceCountdown = numbSecs;


$(document).ready(function(){

  function gotBothNames() {
    user1 = $('#player1').val();
    user2 = $('#player2').val();
    if (user1 != "" && user2 !="" && showSubmit===false) {
      // console.log("got both:" + user1 + " " + user2);
      let subButton = '<input id="submit" type="submit" value="START!"/>';
      $('#userForm').append(subButton);
      showSubmit = true;
    }
  }
  $('#player1').on('keyup', gotBothNames);
  $('#player2').on('keyup', gotBothNames);

  $('#userForm').on('submit', function(event) {
    event.preventDefault();
    let greeting = `${user1} you with be the 'W' key and ${user2} you will be the 'O' key.`;
    $('#userForm').html('<h2>' + greeting + '</h2>');
    setTimeout(countDownFunc,1000);
    $('.cars').addClass(animateCar);
    $('.crowd').addClass(animateCrowd);
  });


  function wonFunc(which) {
    // console.log("*** " + which + " WON! ***");
    if (which===1) {
      var person = user1;
      var winImage = "images/car1.jpeg";
    } else {
      var person = user2;
      var winImage = "images/car2.jpeg";
    }
    let bigOlString = '<h2>OMG ' + person + ' won!</h2><br/><img src="' + winImage + '">';
    $('#formDiv').html(bigOlString);
    raceCountdown = -1;     //locks out w & o
    $('.crowd').removeClass(animateCrowd);
  }


  $(document).keypress(function(keyPressed) {
    if (raceCountdown===0) {
      if (car1Pos===0 && car2Pos===0) {
        $('.cars').removeClass(animateCar);
        clearInfo();
      }

      if (keyPressed.key==='w') {
        car1Pos += moveInc;
        // console.log("pressed w:" + car1Pos + "px")
        $('#car1').css("margin-left",car1Pos + "px");
        if (car1Pos>(800-200)) {
          wonFunc(1);
        }
      } else if (keyPressed.key==='o') {
        car2Pos += moveInc;
        // console.log("pressed o:" + car2Pos + "px")
        $('#car2').css("margin-left",car2Pos + "px");
        if (car2Pos>(800-200)) {
          wonFunc(2);
        }
      }
    }
  });

});			// on load

function clearInfo(){
  $('#formDiv').html('');
}

function justSayGo () {
  $('#formDiv').html('<h1>GO!</h1>');
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