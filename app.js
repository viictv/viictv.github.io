const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
let score = document.querySelector('#score');
const restartButton = document.querySelector('#restart-button');



let result = 0;
let hitPosition;
let currentTime = 10;
let timerId = null;
let previousSquare = null;

document.addEventListener('mousemove', function(event) {
    var hiddenCursor = document.querySelector('.cursor-hidden');
    cursor.style.left = event.pageX + 'px';
    cursor.style.top = event.pageY + 'px';
  });



document.addEventListener('mousemove', function(event) {
    var cursor = document.querySelector('.custom-cursor');
    cursor.style.left = event.pageX + 'px';
    cursor.style.top = event.pageY + 'px';
  });


function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole');
    });

    let tempSquare = squares[Math.floor(Math.random() * 9)];

    while (tempSquare === previousSquare) {
        tempSquare = squares[Math.floor(Math.random() * 9)];
    }

    previousSquare = tempSquare;

    tempSquare.classList.add('mole');

    hitPosition = tempSquare.id;
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPosition) {
            result++;
            score.textContent = result;
            hitPosition = null;
        }
    });
});

function moveMole() {
    timerId = setInterval(randomSquare, 300);
}

moveMole();





function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        alert('GAME OVER! Your final score is ' + result);
    }
}

let countDownTimerId = setInterval(countDown, 1000);

restartButton.addEventListener('click', () => {
    result = 0;
    score.textContent = result;
    currentTime = 10;
    timeLeft.textContent = currentTime;
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    moveMole();
    countDownTimerId = setInterval(countDown, 1000);
});