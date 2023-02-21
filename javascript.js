//we create a math game, this game will have questions of multiplications, between two digits
//from 1 to 10. also it will have 4 answerrs and only one of them will be correct answer.
//and also it will have a timer with 60 seconds duration, 
//also score counter and reset game button.
//let's comment every step at first and then let's start:

let playing = false;
let score;
let action;
let timeRemainingValue;
let correctAnswer;
//if we click on the start/reset button:
document.getElementById("startReset").onclick = function(){
    //if we are playing:
    if(playing == true){
        //reload page:
        location.reload();
    }else{//if we are not playing:
        //change mode to playing:
        playing = true;

        //set score to 0:
        score = 0;
        document.getElementById("scoreValue").innerHTML = score;

        //show countown box:
        show("timeRemaining")
        timeRemainingValue = 60;
        document.getElementById("timeRemainingValue").innerHTML = timeRemainingValue;

        //hide gameover box when time is up:
        hide("gameOver");

        //change button to reset:
        document.getElementById("startReset").innerHTML = "Reset Game";
        
        //start the countdown:
        startCountdown()

        //generate new Q&A
        generateQA();
    }
}


//clicking on an answer box
for(i=1; i<5; i++){
    document.getElementById("box"+ i).onclick = function(){
        //checking if we are playing:
        if(playing == true){//yes:
            if(this.innerHTML == correctAnswer){
                //correct answer
                //increase score by 1
                score++;
                document.getElementById("scoreValue").innerHTML = score;
                
                //show correct box for 1 sec and hide wrong box:
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                },1000);

                //generate new Q&A:
                generateQA();
            }else{//wrong answer
                hide("correct");
                    show("wrong");
                    setTimeout(function(){//show try again box for 1 sec
                        hide("wrong");
                    },1000);
            }
        }
    }
}

//functions:
//start countdown function:
function startCountdown(){
    //reduce time by one second in loops:
    action = setInterval(function(){
        timeRemainingValue -=1;//if timeleft?:
        document.getElementById("timeRemainingValue").innerHTML = timeRemainingValue;//yes-> continue
        //no-> gameover:
        if(timeRemainingValue == 0){
            stopCountdown();
            show("gameOver");
            document.getElementById("gameOver").innerHTML = "<p>Game Over!</p><p>Your Score is "+ score +".</p>";
            hide("timeRemaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startReset").innerHTML = "Start Game";
        }
    },1000);
}

//stop countdown function:
function stopCountdown(){
    clearInterval(action);
}

//create functions that help us to hide and show elements in order to 
//not using display none style a lot of time:
//hide function:
function hide(Id){
    document.getElementById(Id).style.display = "none";
}

//show function
function show(Id){
    document.getElementById(Id).style.display = "block";
}

//questions and multiple answers generator function:
function generateQA(){
    let x = 1 + Math.round(9*Math.random());//random method in math gives any number between 0-1
    //so that's is why we multiple it to 9 to get digit between 0-9 and plus to it 1,
    //to get any number beside zero.
    // and also we use round method to get whole number
    let y = 1 * Math.round(9*Math.random());//the same is here

    //definethe result
    correctAnswer = x*y;//we should define this variable before this function
    //because we need to use it another time.

    //add it to the question div:
    document.getElementById("question").innerHTML = x + "x" + y;//when we sum numbers and 
    //strings everything becomes string.

    //place the correct answer in a random div
    let correctPosition = 1 + Math.round(3*Math.random());//defining some numbers between 1-4,
    //in order to use it below in random placement:
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;

    //fill other boxes with wrong answers:
    let answers = [correctAnswer];
    for(i=1; 1<5; i++){
        if(i != correctPosition){//two equal signs means equal values and three means equal values and 
            //equal types, here we looking for value only so we used only one equal sign.
            
            let wrongAnswer;
            //we need to be sure that wrong answers are different
            //we need to be sure that wrong answer is not the same as correct answer:
            do{//at first we do degenerate wrong answer between 1-9 numbers sum and then we use 
                //while, in order to do defining wrong unswers untill they are not equal corect one.
                wrongAnswer = (1 + Math.round(9*Math.random())+1 + Math.round(9*Math.random()));
            }while(answers.indexOf(wrongAnswer)>-1);//here we check if 
            //wrong answer is in the answers, where we put correct answer, so if it is in it,
            // we generate another wrong answer.

            document.getElementById("box" + i).innerHTML = wrongAnswer;//place wrong
            //asnwer into the boxes vwith ids between 1-4, but if it is correctposition then
            //plac it in another one.

            answers.push(wrongAnswer);//here we add wrong answers into answers array, and
            //the code uppon checks it every time that the generated number in not in 
            //snswers arry.
        }
    }
}
