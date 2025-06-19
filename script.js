// Switch
const switch_Button = document.getElementById("switch_Button");

let timerID = null;
let clicked = false;

switch_Button.addEventListener("change", () => {
  clicked = switch_Button.checked;
  if (clicked) {
    stopClock();
  } else {
    startClock();
  }
});
// Switch End

// Clock
const hoursObj = document.getElementById("hours");
const minutesObj = document.getElementById("minutes");
const secondsObj = document.getElementById("seconds");

/**
 * change time and apply class
 * @param {HTMLElement} el
 * @param {string} newText
 */
function animateChange(el, newText) {
  if (el.innerText !== newText) {
    el.classList.add("fade");
    setTimeout(() => {
      el.innerText = newText;
      el.classList.remove("fade");
    }, 300);
  }
}

function updateTime() {
  const [h, m, s] = new Date().toLocaleTimeString().split(":");
  animateChange(hoursObj, h);
  animateChange(minutesObj, m);
  animateChange(secondsObj, s);
}

function startClock() {
  if (timerID === null) {
    updateTime();
    timerID = setInterval(updateTime, 1000);
  }
}

function stopClock() {
  clearInterval(timerID);
  timerID = null;
}

startClock();

// Clock End
