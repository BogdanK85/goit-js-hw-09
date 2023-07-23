const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let intervalChangeColor;

startBtn.addEventListener('click', onStartBtnChangeColor)
stopBtn.setAttribute('disablet', true)

function onStartBtnChangeColor() {
    startBtn.disablet = true;
    stopBtn.disablet = false;
    intervalChangeColor = setInterval(changeRandomBodyColor, 1000)
}

stopBtn.addEventListener('click', onStopBtnChangeColor)

function onStopBtnChangeColor() {
    startBtn.disablet = false;
    stopBtn.disablet = true;
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