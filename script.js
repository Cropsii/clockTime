const switchButton = document.getElementById("switch_Button");
const hoursObj = document.querySelector('[data-role="hours"]');
const minutesObj = document.querySelector('[data-role="minutes"]');
const secondsObj = document.querySelector('[data-role="seconds"]');
const stoppedClock = document.querySelector("#stoppedClock");

let timerID = null;
let clicked = false;
let stoppedHoursObj = null;
let stoppedMinutesObj = null;
let stoppedSecondsObj = null;
let time = null;

function animateChange(el, newText) {
  if (el.innerText !== newText) {
    el.classList.add("fade");
    el.innerText = newText;
    setTimeout(() => {
      el.classList.remove("fade");
    }, 300);
  }
}

function updateTime() {
  time = new Date();
  animateChange(hoursObj, String(time.getHours()).padStart(2, "0"));
  animateChange(minutesObj, String(time.getMinutes()).padStart(2, "0"));
  animateChange(secondsObj, String(time.getSeconds()).padStart(2, "0"));
}

function startClock() {
  if (timerID === null) {
    updateTime();
    timerID = setInterval(updateTime, 1000);
  }
}
/**
 *
 * @param {HTMLElement} el
 */
function animateStopped(el) {
  if (!el.classList.contains("stopped_Appear")) {
    setTimeout(() => {
      el.classList.add("stopped_Appear");
    }, 100);
  }
}

function showStoppedTime() {
  animateStopped(stoppedClock);

  stoppedHoursObj = document.querySelector('[data-role="stopped-hours"]');
  stoppedMinutesObj = document.querySelector('[data-role="stopped-minutes"]');
  stoppedSecondsObj = document.querySelector('[data-role="stopped-seconds"]');

  const stoppedTime = time;
  animateChange(
    stoppedHoursObj,
    String(stoppedTime.getHours()).padStart(2, "0")
  );
  animateChange(
    stoppedMinutesObj,
    String(stoppedTime.getMinutes()).padStart(2, "0")
  );
  animateChange(
    stoppedSecondsObj,
    String(stoppedTime.getSeconds()).padStart(2, "0")
  );
}

function resetClock(el) {
  el.classList.remove("stopped_Appear");
}

switchButton.addEventListener("change", () => {
  clicked = switchButton.checked;
  if (clicked) {
    showStoppedTime();
  } else {
    resetClock(stoppedClock);
  }
});

startClock();
