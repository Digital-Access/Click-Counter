const clickTarget = document.getElementById("click-target");
const clickCountdown = document.getElementById("click-countdown");
const clickCounter = document.getElementById("click-counter");
const timeLeft = document.getElementById("time-left");
const targetContainer = document.getElementById("click-target__container");
const highScore = document.getElementById("high-score");
const playAgain = document.getElementById("play-again");

let latestHighScore = localStorage.getItem("score");

function setScore() {
  if (latestHighScore === null || latestHighScore === undefined) {
    latestHighScore = localStorage.setItem("score", 0);
  }
}

highScore.textContent = `High Score: ${latestHighScore}`;

function startGame() {
  let clicks = 0;
  let score = 0;

  const countDecrement = (count) => {
    clickCountdown.style.pointerEvents = "none";
    playAgain.style.display = "none";
    const counting = setInterval(() => {
      clickTarget.textContent = count;
      count--;
      clickTarget.style.cursor = "progress";
      timeLeft.textContent = "Get ready...";
      if (count === 0) {
        clearInterval(counting);
        clickTarget.style.pointerEvents = "all";
        clickCountdown.style.display = "none";
        clickTarget.style.cursor = "pointer";
        clickTarget.textContent = "CLICK!";
        clickCounter.textContent = "";
        clickTarget.classList.add("click-target__animation");
        clicks = 0;
        score = 0;
        gameTimer(8);
      }
    }, 1000);
  };

  const gameTimer = (count) => {
    clickTarget.addEventListener("click", registerClicks);
    const counting = setInterval(() => {
      count--;
      timeLeft.textContent = `Time left: ${count}s`;
      let position = Math.round(Math.random() * 3);
      if (position === 3) {
        targetContainer.style.justifyContent = "flex-end";
      } else if (position === 2) {
        targetContainer.style.justifyContent = "center";
      } else {
        targetContainer.style.justifyContent = "start";
      }
      if (count === 0) {
        clearInterval(counting);
        timeLeft.textContent = "Time's up! Your score was";
        targetContainer.style.justifyContent = "center";
        clickTarget.style.pointerEvents = "none";
        playAgain.style.display = "flex";
        clickTarget.textContent = clicks;
        clickCounter.textContent = "";
        if (clicks > localStorage.score) {
          localStorage.setItem("score", clicks);
        }
        highScore.textContent = `High Score: ${localStorage.getItem("score")}`;
      }
    }, 1000);
  };

  const registerClicks = () => {
    clicks++;
    clickCounter.textContent = clicks;
  };

  countDecrement(3);
}

clickCountdown.addEventListener("click", startGame);
playAgain.addEventListener("click", startGame);
window.addEventListener("load", setScore);
