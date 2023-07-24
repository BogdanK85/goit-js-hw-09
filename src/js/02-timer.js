import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const inputElems = document.querySelector('#datetime-picker');
const startTimerBtn = document.querySelector('[data-start]');
const daysElems = document.querySelector('[data-days]');
const hoursElems = document.querySelector('[data-hours]');
const minutesElems = document.querySelector('[data-Minutes]');
const secondsElems = document.querySelector('[data-seconds]');

inputElems.disabled = false;
startTimerBtn.disabled = true;
let startedTimer = false;
let overTime = null;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const validTime = selectedDates[0] > new Date();
        if (!validTime || startedTimer) {
            startTimerBtn.disabled = true;

            if (!validTime) {
                window.alert("Please choose a date in the future");
            }
        } else {
            startTimerBtn.disabled = false;
            startTimerBtn.addEventListener('click', onStartTimerBtnClick)
        }
    },
}

const flatPickrElem = flatpickr(inputElems, options);

function onStartTimerBtnClick() {
    startTimerBtn.disabled = true;
    inputElems.disabled = true;
    startedTimer = true;
    const choicedDates = flatPickrElem.selectedDates[0]
    const interval = setInterval(() => {
        const currentDate = new Date();
        overTime = choicedDates - currentDate;

        if (overTime > 0) {
            showUpdateTimer(overTime)
            startTimerBtn.removeEventListener('click', onStartTimerBtnClick)
        } else {
            clearInterval(interval);
            startedTimer = false;
            startTimerBtn.disabled = false;
            inputElems.disabled = false;
        }
    }, 1000)
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function showUpdateTimer(time) {
    const { days, hours, minutes, seconds } = convertMs(time);
    daysElems.textContent = addLeadingZero(days);
    hoursElems.textContent = addLeadingZero(hours);
    minutesElems.textContent = addLeadingZero(minutes);
    secondsElems.textContent = addLeadingZero(seconds);
}   