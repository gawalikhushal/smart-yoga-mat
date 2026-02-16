let time = 0;
let interval = null;

function startTimer(max) {
  if (interval) return;
  interval = setInterval(() => {
    time++;
    if (time >= max) {
      clearInterval(interval);
      alert("Pose Completed 🎉");
      savePerformance();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(interval);
  interval = null;
  time = 0;
}
