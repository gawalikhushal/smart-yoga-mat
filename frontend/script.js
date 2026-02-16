let selectedPose = "";
let lastApiCall = 0;
const API_INTERVAL = 800; // ms

let feedbackIndex = 0;
let feedbackTimer = null;
let currentFeedback = [];

// ================= POSE SELECTION =================
function selectPose(pose) {
  selectedPose = pose;
  document.getElementById("feedback").innerHTML =
    "🧘 Pose Selected: <b>" + pose + "</b>";
}

// ================= CAMERA =================
const video = document.getElementById("video");

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => video.srcObject = stream)
  .catch(() => alert("Camera access denied"));

// ================= MEDIAPIPE =================
const pose = new Pose({
  locateFile: file =>
    `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
});

pose.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  minDetectionConfidence: 0.6,
  minTrackingConfidence: 0.6
});

// ================= POSE RESULTS =================
pose.onResults(results => {

  if (!results.poseLandmarks || selectedPose === "") return;

  const now = Date.now();
  if (now - lastApiCall < API_INTERVAL) return;
  lastApiCall = now;

  const lm = results.poseLandmarks;

  const landmarks = {
    nose: [lm[0].x, lm[0].y],
    left_shoulder: [lm[11].x, lm[11].y],
    right_shoulder: [lm[12].x, lm[12].y],
    left_elbow: [lm[13].x, lm[13].y],
    right_elbow: [lm[14].x, lm[14].y],
    left_wrist: [lm[15].x, lm[15].y],
    right_wrist: [lm[16].x, lm[16].y],
    left_hip: [lm[23].x, lm[23].y],
    right_hip: [lm[24].x, lm[24].y],
    left_knee: [lm[25].x, lm[25].y],
    right_knee: [lm[26].x, lm[26].y],
    left_ankle: [lm[27].x, lm[27].y],
    right_ankle: [lm[28].x, lm[28].y]
  };

  fetch("http://127.0.0.1:5000/check_pose", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pose: selectedPose,
      landmarks: landmarks
    })
  })
  .then(res => res.json())
  .then(data => updateFeedback(data))
  .catch(err => console.error("API error:", err));
});

// ================= FEEDBACK HANDLER =================
function updateFeedback(data) {
  const box = document.getElementById("feedback");

  // If correct pose
  if (data.correct) {
    clearInterval(feedbackTimer);
    feedbackTimer = null;
    box.innerHTML = "✅ " + data.message[0];
    return;
  }

  // If same feedback, do nothing
  if (JSON.stringify(currentFeedback) === JSON.stringify(data.message)) {
    return;
  }

  // New feedback set
  currentFeedback = data.message;
  feedbackIndex = 0;

  clearInterval(feedbackTimer);

  feedbackTimer = setInterval(() => {
    box.innerHTML = "❌ " + currentFeedback[feedbackIndex];
    feedbackIndex++;

    if (feedbackIndex >= currentFeedback.length) {
      feedbackIndex = 0;
    }
  }, 2000);
}

// ================= CAMERA START =================
const camera = new Camera(video, {
  onFrame: async () => {
    await pose.send({ image: video });
  },
  width: 640,
  height: 480
});

camera.start();
