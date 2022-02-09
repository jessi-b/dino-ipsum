import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import DinoFinder from './js/dino-finder.js';

$(document).ready(function() {
  const dinoArray = [];
  let outputArray = [];
  $("#play-game").click(function() {
    $("#game").show();
    $("#play-game").hide();
    let promise = DinoFinder.getDino();
    promise.then(function(response) {
      const body = JSON.parse(response);
      let dinoWord = (body[0][0].toLowerCase()).split("");
      dinoWord.forEach(function(letter) {
        outputArray.push('&nbsp;&nbsp; __  &nbsp;&nbsp;');
        dinoArray.push(letter);
        $(".dinoResult").append(`&nbsp;&nbsp; __  &nbsp;&nbsp;`);
      });
    }, function(error) {
      console.log(error);
    });
    console.log(dinoArray);
  });
  
  $("#submit").click(function() {
    $(".dinoResult").html("");
    let dinoString = "";
    let inputLetter = $("#inputLetter").val().toLowerCase();
    dinoArray.forEach(function(letter, index) {
      dinoString += letter;
      if (inputLetter === letter) {
        outputArray[index] = `&nbsp;&nbsp; ${letter}  &nbsp;&nbsp;`;
      }
    });
    outputArray.forEach(function(space) {
      $(".dinoResult").append(space);
    });
    if (!(dinoString.includes(inputLetter))) { 
      $(".wrongLetters").append(inputLetter);
      let count = parseInt($(".hangman").html());
      $(`#hangman-${count}`).show();
      count = count - 1;
      if (count === 0) {
        $("#game").hide(5000);
        $(".hidden").show(6000);
        $("#game-result").text("You Lose!");
        $("#new-game").show();
      }
      $(".hangman").html(count);
    }
    if (!(outputArray.includes("&nbsp;&nbsp; __  &nbsp;&nbsp;"))) {
      $("#game").hide(1000);
      $(".hidden").show(1000);
      $("#game-result").text("You Win!");
      $("#new-game").show();
    }
    $("#inputLetter").val("");
  });

  $("#new-game").click(function() {
    location.reload(true);
  });
});