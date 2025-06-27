const switchButton = document.getElementById("switch_Button");
const hoursObj = document.querySelector('[data-role="hours"]');
const minutesObj = document.querySelector('[data-role="minutes"]');
const secondsObj = document.querySelector('[data-role="seconds"]');

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

function animateStopped(el) {
  if (!el.classList.contains("stopped_Appear")) {
    setTimeout(() => {
      el.classList.add("stopped_Appear");
    }, 100);
  }
}

function showStoppedTime() {
  const html = `
    <main class="wrap_line stopped" id="stoppedClock">
      <div class="clock temp" data-role="stopped-hours"></div>
      <div class="clock temp" data-role="stopped-minutes"></div>
      <div class="clock temp" data-role="stopped-seconds"></div>
    </main>
  `;

  const wrapper = document.querySelector(".wrap");
  const liveClock = document.getElementById("liveClock");

  // Вставляем перед живыми часами
  liveClock.insertAdjacentHTML("beforebegin", html);

  const stoppedClock = document.getElementById("stoppedClock");
  animateStopped(stoppedClock);

  stoppedHoursObj = stoppedClock.querySelector('[data-role="stopped-hours"]');
  stoppedMinutesObj = stoppedClock.querySelector(
    '[data-role="stopped-minutes"]'
  );
  stoppedSecondsObj = stoppedClock.querySelector(
    '[data-role="stopped-seconds"]'
  );

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

function resetClock() {
  const el = document.getElementById("stoppedClock");
  if (!el) return;

  el.classList.remove("stopped_Appear");

  const onTransitionEnd = () => {
    el.removeEventListener("transitionend", onTransitionEnd);
    el.remove();
  };

  el.addEventListener("transitionend", onTransitionEnd);
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
