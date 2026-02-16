const params = new URLSearchParams(window.location.search);
const poseId = params.get("pose");

const pose = yogaPoses.find(p => p.id === poseId);
document.getElementById("poseName").innerText =
  `${pose.name_en} (${pose.name_hi})`;
document.getElementById("holdTime").innerText = pose.holdTime;

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const feedback = document.getElementById("feedback");

const poseAI = new Pose({
  locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${f}`
});

poseAI.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  enableSegmentation: false,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

poseAI.onResults(results => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!results.poseLandmarks) {
    feedback.innerText = "No body detected";
    feedback.style.color = "red";
    resetTimer();
    return;
  }

  drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS, { color: "#00FF00" });
  drawLandmarks(ctx, results.poseLandmarks, { color: "#FF0000", radius: 4 });

  const check = checkPose(poseId, results.poseLandmarks);

feedback.innerText = `Step ${check.step || ""}: ${check.msg}`;
feedback.style.color = check.ok ? "green" : "red";

if (check.speak) {
  speak(check.speak, "en-IN");   // English voice
}

if (check.ok) {
  startTimer(pose.holdTime);
} else {
  resetTimer();
  }
});

const camera = new Camera(video, {
  onFrame: async () => {
    await poseAI.send({ image: video });
  },
  width: 640,
  height: 480
});

camera.start();
