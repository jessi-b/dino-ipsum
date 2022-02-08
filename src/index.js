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
  });
  $("#submit").click(function() {
    $(".dinoResult").html("");
    console.log(dinoArray);
    let inputLetter = $("#inputLetter").val().toLowerCase();
    dinoArray.forEach(function(letter, index) {
      if (inputLetter === letter) {
        outputArray[index] = `&nbsp;&nbsp; ${letter}  &nbsp;&nbsp;`;
      }
    });
        outputArray.forEach(function(space) {
      $(".dinoResult").append(space);
    });
    //console.log(outputArray);
  });
});