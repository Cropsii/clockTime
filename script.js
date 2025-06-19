const switchButton = document.getElementById("switch_Button");
let timerID = null;
let clicked = false;

const hoursObj = document.querySelector('[data-role="hours"]');
const minutesObj = document.querySelector('[data-role="minutes"]');
const secondsObj = document.querySelector('[data-role="seconds"]');
let stoppedHoursObj = null;
let stoppedMinutesObj = null;
let stoppedSecondsObj = null;

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
  const time = new Date();
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

function showStoppedTime() {
  if (!document.querySelector('[data-role="stopped-hours"]')) {
    document.querySelector("main").insertAdjacentHTML(
      "beforebegin",
      `<main class="wrap_line stopped" id="stoppedClock">
        <div class="clock" data-role="stopped-hours"></div>
        <div class="clock" data-role="stopped-minutes"></div>
        <div class="clock" data-role="stopped-seconds"></div>
      </main>`
    );
    stoppedHoursObj = document.querySelector('[data-role="stopped-hours"]');
    stoppedMinutesObj = document.querySelector('[data-role="stopped-minutes"]');
    stoppedSecondsObj = document.querySelector('[data-role="stopped-seconds"]');
  }
  const stoppedTime = new Date();
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

function resetClock() {
  const stoppedClock = document.querySelector("#stoppedClock");
  if (stoppedClock) {
    stoppedClock.remove();
  }
}

switchButton.addEventListener("change", () => {
  clicked = switchButton.checked;
  if (clicked) {
    showStoppedTime();
  } else {
    resetClock();
  }
});

startClock();
