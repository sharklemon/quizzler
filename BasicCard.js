var inquirer = require("inquirer");
var fs = require("fs");

var counter = 0
var questions_count= 0

var BasicCard = function(){
  inquirer.prompt([

    {
      type: "input",
      name: "questionnum",
      message: "How many questions would you like to make? (Max of 20)"
    }
  ]).then(function(response) {
    console.log(response)
    counter = parseInt(response.questionnum);
    console.log(counter);
    if(counter > 20){
      console.log("that's too many questions!")
    }
    else{
      individ_qs();
    }
  }); //end the then
};

//loop to go over for each number of questions the user wants to answer
function individ_qs(){
  if(questions_count<counter){
    
    inquirer.prompt([
      {
        type: "input",
        name: "front",
        message: "What is your question?"
      },
      {
        type: "input",
        name: "back",
        message: "What is the answer?"
      }
    ]).then(function(response2){
      var for_append = {
        front: response2.front,
        back: response2.back
      }
      fs.appendFile("questionlog.txt", JSON.stringify(for_append), function(err) {
        if (err) {return console.log(err);};
      });
    questions_count=questions_count+1;
    individ_qs();      
    }); 
  }  
}


module.exports = BasicCard;



