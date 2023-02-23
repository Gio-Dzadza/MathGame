let playing = false;
let score;
let action;
let timeRemainingValue;
let correctAnswer;

document.getElementById("startReset").onclick = function(){
    if(playing == true){
        location.reload();
    }else{
        playing = true;
        score = 0;
        document.getElementById("scoreValue").innerHTML = score;
        show("timeRemaining")
        timeRemainingValue = 60;
        document.getElementById("timeRemainingValue").innerHTML = timeRemainingValue;
        hide("gameOver");
        document.getElementById("startReset").innerHTML = "Reset Game";
        startCountdown()
        generateQA();
    }
}

for(i=1; i<5; i++){
    document.getElementById("box"+ i).onclick = function(){
        if(playing == true){
            if(this.innerHTML == correctAnswer){
                score++;
                document.getElementById("scoreValue").innerHTML = score;
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                },1000);
                generateQA();
            }else{
                hide("correct");
                    show("wrong");
                    setTimeout(function(){
                        hide("wrong");
                    },1000);
            }
        }
    }
}

function startCountdown(){
    action = setInterval(function(){
        timeRemainingValue -=1;
        document.getElementById("timeRemainingValue").innerHTML = timeRemainingValue;
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

function stopCountdown(){
    clearInterval(action);
}

function hide(Id){
    document.getElementById(Id).style.display = "none";
}

function show(Id){
    document.getElementById(Id).style.display = "block";
}

function generateQA(){
    let x = 1 + Math.round(9*Math.random());
    let y = 1 * Math.round(9*Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    let correctPosition = 1 + Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;
    let answers = [correctAnswer];
    for(i=1; 1<5; i++){
        if(i != correctPosition){
            let wrongAnswer;
            do{
                wrongAnswer = (1 + Math.round(9*Math.random())+1 + Math.round(9*Math.random()));
            }while(answers.indexOf(wrongAnswer)>-1);
            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}
