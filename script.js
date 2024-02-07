var boy = document.getElementById("boy");
var idleImageNumber = 1;
var idleAnimationNumber = 0;
var runImageNumber = 1;
var runAnimationNumber = 0;
var backgroundImagePositionX = 0;
var moveBackgroundAnimationId = 0;
var jumpAnimationNumber = 0;
var jumpImageNumber = 0;
var boyMarginTop = 460;   
var boxMarginLeft = 1600;
var boxAnimationId = 0;
var deadAnimationNumber = 0;
var deadImageNumber = 0; 

function idleAnimation() {
    idleImageNumber += 1;
    if (idleImageNumber == 11) {
        idleImageNumber = 1;
    }
    boy.src = "/resources/character/idle (" + idleImageNumber + ").png";
}

function idleAnimationStart() {
    idleAnimationNumber = setInterval(idleAnimation, 170);
}

function runAnimation() {
    runImageNumber += 1;
    if (runImageNumber == 11) {
        runImageNumber = 1;
    }
    boy.src = "/resources/character/run (" + runImageNumber + ").png";
}

function runAnimationStart() {
    runAnimationNumber = setInterval(runAnimation, 100);
    clearInterval(idleAnimationNumber);
}

function keyCheck(event) {
    var keyCode = event.which;

    if (keyCode == 13) {
        if (runAnimationNumber == 0) {
            runAnimationStart();
        }

        if (moveBackgroundAnimationId == 0) {
            moveBackgroundAnimationId = setInterval(moveBackground, 100);
        }

        if (boxAnimationId == 0) { 
            boxAnimationId = setInterval(boxAnimation, 100);
        }
    }

    if (keyCode == 32) {
        if (jumpAnimationNumber == 0) {
            jumpAnimationStart();
        }
        if (moveBackgroundAnimationId == 0) {
            moveBackgroundAnimationId = setInterval(moveBackground, 100);
        }

        if (boxAnimationId == 0) { 
            boxAnimationId = setInterval(boxAnimation, 100);
        }
    }
}
var score = 0;


function moveBackground() {
    backgroundImagePositionX -= 15;
    document.getElementById("background").style.backgroundPositionX = backgroundImagePositionX + "px";
    score += 1;
    document.getElementById("score").innerHTML = score; 
}

function jumpAnimation() {
    jumpImageNumber += 1;

    if (jumpImageNumber <= 6) {
        boyMarginTop -= 35;
        boy.style.marginTop = boyMarginTop + "px";
    }

    if (jumpImageNumber >= 7) {
        boyMarginTop += 35;
        boy.style.marginTop = boyMarginTop + "px";
    }

    if (jumpImageNumber == 11) {
        jumpImageNumber = 1;
        clearInterval(jumpAnimationNumber);
        jumpAnimationNumber = 0;
        runImageNumber = 0;
        runAnimationStart();
    }
    boy.src = "/resources/character/Jump (" + jumpImageNumber + ").png";
}

function jumpAnimationStart() {
    clearInterval(idleAnimationNumber);
    runImageNumber = 0;
    clearInterval(runAnimationNumber);
    jumpAnimationNumber = setInterval(jumpAnimation, 100);
}

function createBoxes() {
    for (var i = 0; i < 10; i++) {
        var box = document.createElement("div");
        box.className = "box";
        document.getElementById("background").appendChild(box);
        box.style.marginLeft = boxMarginLeft + "px";
        box.id = "box" + i;
        if (i < 5) {
            boxMarginLeft += 2000;
        }
        if (i >= 5) {
            boxMarginLeft += 1000;
        } 
    }
}

function boxAnimation() {
    for (var j = 0; j < 10; j++) {
        var box = document.getElementById("box" + j);
        var currentMarginLeft = parseInt(getComputedStyle(box).marginLeft);
        var newMarginLeft = currentMarginLeft - 35;
        box.style.marginLeft = newMarginLeft + "px";

        if (newMarginLeft >= -110 && newMarginLeft <= 100) {
            if (boyMarginTop > 400) {
                clearInterval(boxAnimationId); 
    
                clearInterval(runAnimationNumber);
                runAnimationNumber = -1;
    
                clearInterval(jumpAnimationNumber);
                jumpAnimationNumber = -1;
    
                clearInterval(moveBackgroundAnimationId);
                moveBackgroundAnimationId = -1;

               deadAnimationNumber = setInterval(boyDeadAnimation,100); 
            }
        }
    }
}

//document.addEventListener("keydown", keyCheck);
//createBoxes();
function boyDeadAnimation(){
    deadImageNumber += 1;
    if (deadImageNumber == 11) {
        deadImageNumber = 10;
        
        document.getElementById("end").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = score;
    }

    boy.src = "resources/character/Dead ("+ deadImageNumber +").png"
}

function reload(){
    location.reload();
}