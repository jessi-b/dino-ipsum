import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import DinoFinder from './js/dino-finder.js';

$(document).ready(function() {
  const dinoArray = [];
  const outputArray = [];
  $("#play-game").click(function() {
    $("#game").show();
    $("#play-game").hide();
    let promise = DinoFinder.getDino();
    promise.then(function(response) {
      const body = JSON.parse(response);
      let dinoWord = (body[0][0]).split("");
      dinoWord.forEach(function(letter) {
        dinoArray.push(letter);
        $(".dinoResult").append(`__  &nbsp;&nbsp;&nbsp;&nbsp;`);
      });
    }, function(error) {
      console.log(error);
    });
  });
  $("#submit").click(function() {
    console.log(dinoArray);
    
    let inputLetter = $("#inputLetter").val();
    let outputString = "";
    dinoArray.forEach(function(letter) { 
      if (letter === inputLetter) {
        outputString += letter;
      } else {
        outputString += "__  &nbsp;&nbsp;&nbsp;&nbsp;"
      }
    });
    $(".dinoResult").html(outputString);
    console.log(outputString);
  });
});