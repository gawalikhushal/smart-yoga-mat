const params = new URLSearchParams(window.location.search);
const selectedPose = params.get("pose");

const poseData = {
  tree: {
    name: "TREE POSE (वृक्षासन)",
    img: "/information imges/Tree pose structure alginment.png",
    info: "Improves balance and focus.",
    hold: 30
  },
  warrior: {
    name: "WARRIOR II (वीरभद्रासन)",
    img: "https://i.imgur.com/z0JYB2n.png",
    info: "Strengthens legs and arms.",
    hold: 30
  },
  mountain: {
    name: "MOUNTAIN POSE (ताड़ासन)",
    img: "https://i.imgur.com/7nQZpGx.png",
    info: "Improves posture and stability.",
    hold: 20
  }
};

document.getElementById("poseTitle").innerText = poseData[selectedPose].name;
document.getElementById("poseImg").src = poseData[selectedPose].img;
document.getElementById("poseInfo").innerText = poseData[selectedPose].info;

const video = document.getElementById("video");
navigator.mediaDevices.getUserMedia({ video: true })
  .then(s => video.srcObject = s);

let currentStep = 0;
let holdTimer = null;
let holdTime = poseData[selectedPose].hold;

const pose = new Pose({
  locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${f}`
});

pose.setOptions({ modelComplexity: 1 });

pose.onResults(results => {
  if (!results.poseLandmarks) return;

    const cleanLandmarks = results.poseLandmarks.map(p => ({
    x: p.x,
    y: p.y
    }));

    fetch("http://127.0.0.1:5000/check_pose_step", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        pose: selectedPose,
        step: currentStep,
        landmarks: cleanLandmarks
    })
    })

  .then(res => res.json())
  .then(data => {

    if (!data.correct) {
      document.getElementById("feedback").innerHTML =
        `<span class="wrong">❌ ${data.message}</span>`;
      currentStep = data.reset_step;
      stopTimer();
      return;
    }

    if (data.next_step) {
      currentStep++;
      document.getElementById("feedback").innerHTML =
        `<span class="correct">✅ ${data.message}</span>`;
    }

    if (data.completed) {
      startTimer();
    }
  });
});

function startTimer() {
  if (holdTimer) return;
  document.getElementById("feedback").innerHTML =
    `<span class="correct">Perfect Pose! Hold steady</span>`;
  holdTimer = setInterval(() => {
    document.getElementById("timer").innerText =
      `Hold Time: ${holdTime--} sec`;
    if (holdTime <= 0) {
      clearInterval(holdTimer);
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(holdTimer);
  holdTimer = null;
  holdTime = poseData[selectedPose].hold;
  document.getElementById("timer").innerText = "";
}

const camera = new Camera(video, {
  onFrame: async () => await pose.send({ image: video }),
  width: 640,
  height: 480
});
camera.start();
