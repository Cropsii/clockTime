const h = document.getElementById("hours");
const m = document.getElementById("minutes");
const s = document.getElementById("seconds");

/**
 * Обновляет время на элементах часов
 * @param {HTMLElement} el - Элемент часов
 * @param {number} value - Значение времени
 */
function updateTime(el, value) {
  const formatted = String(value).padStart(2, "0");
  const [face, backFace] = el.children;
  face.textContent = formatted;
  backFace.textContent = formatted;
}

/**
 * Анимирует переворот элемента часов
 * @param {HTMLElement} el - Элемент для анимации
 * @param {"Hours" | "Minutes" | "Seconds"} typeOf - Тип времени
 */
function updateRotate(el, typeOf) {
  let currentRotation = 0;
  let lastValue = null;

  const initialTime = new Date()[`get${typeOf}`]();
  updateTime(el, initialTime);
  lastValue = initialTime;

  setInterval(() => {
    const timeObj = new Date();
    const currentValue = timeObj[`get${typeOf}`]();

    if (currentValue !== lastValue) {
      currentRotation += 90;
      el.style.transform = `rotateY(${currentRotation}deg)`;

      setTimeout(() => {
        updateTime(el, currentValue);
        lastValue = currentValue;

        currentRotation += 90;
        el.style.transform = `rotateY(${currentRotation}deg)`;
      }, 150);
    }
  }, 1000);
}

updateRotate(h, "Hours");
updateRotate(m, "Minutes");
updateRotate(s, "Seconds");
