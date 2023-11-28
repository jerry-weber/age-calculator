const btnEl = document.getElementById("btn");
const birthdayEl = document.getElementById("birthday");
const resultEl = document.getElementById("result");

function calculateAge() {
  const birthdayValue = birthdayEl.value;
  const isValidDate = isValidDateFormat(birthdayValue);

  if (!isValidDate) {
    alert("Please enter a valid date in the format YYYY-MM-DD");
    return;
  }

  const age = getAge(birthdayValue);
  displayAge(age);
  triggerConfetti();
}

function triggerConfetti() {
  const duration = 5 * 1000; // Duration of the confetti animation in milliseconds
  const animationEnd = Date.now() + duration;

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    confetti();
  }, 50);
}

function isValidDateFormat(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}

function getAge(birthdayValue) {
  const currentDate = new Date();
  const birthdayDate = new Date(birthdayValue);
  let age = currentDate.getFullYear() - birthdayDate.getFullYear();
  const month = currentDate.getMonth() - birthdayDate.getMonth();

  if (
    month < 0 ||
    (month === 0 && currentDate.getDate() < birthdayDate.getDate())
  ) {
    age--;
  }

  return age;
}

function displayAge(age) {
  resultEl.innerText = `Your age is ${age} ${age > 1 ? "years" : "year"} old`;
}

btnEl.addEventListener("click", calculateAge);
birthdayEl.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    calculateAge();
  }
});
