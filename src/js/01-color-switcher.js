const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
stopBtn.disabled = true;
startBtn.disabled = false;
let intervalChangeColor;

startBtn.addEventListener('click', onStartBtnChangeColor)
stopBtn.setAttribute('disabled', true)

function onStartBtnChangeColor() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    intervalChangeColor = setInterval(changeRandomBodyColor, 1000)
}

stopBtn.addEventListener('click', onStopBtnChangeColor)

function onStopBtnChangeColor() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(intervalChangeColor)
}

function changeRandomBodyColor() {
    const colorOfBody = document.body;
    const randomHexBody = getRandomHexColor()
    colorOfBody.style.backgroundColor = randomHexBody;

}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}