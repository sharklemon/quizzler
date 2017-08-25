var inquirer = require("inquirer");
var fs = require("fs");

var counter = 0
var questions_count= 0

var ClozeCard = function(){
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
        name: "fulltext",
        message: "Create your cloze question by first entering a statement."
      },
      {
        type: "input",
        name: "cloze",
        message: "Input the part of the statement you want to redact for the user to guess."
      }
    ]).then(function(response2){
      var partial = response2.fulltext.replace(response2.cloze, " ... ");
      var for_append = {
        fulltext: response2.fulltext,
        close: response2.close,
        partialtext: partial
      }
      fs.appendFile("questionlog.txt", JSON.stringify(for_append), function(err) {
        if (err) {return console.log(err);};
      });
    questions_count=questions_count+1;
    individ_qs();      
    }); 
  }  
}

ClozeCard();

module.exports = ClozeCard;



