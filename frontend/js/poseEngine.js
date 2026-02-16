function angle(a, b, c) {
  const rad =
    Math.atan2(c.y - b.y, c.x - b.x) -
    Math.atan2(a.y - b.y, a.x - b.x);
  let deg = Math.abs(rad * 180 / Math.PI);
  if (deg > 180) deg = 360 - deg;
  return deg;
}

function checkPose(poseName, lm) {

  if (poseName !== "vrikshasana") {
    return { ok: false, msg: "Pose logic coming soon" };
  }

  // Landmarks
  const ls = lm[11], rs = lm[12];
  const lh = lm[23], rh = lm[24];
  const la = lm[27], ra = lm[28];
  const lw = lm[15], rw = lm[16];

  /* ---------------- STEP 1: LEG LIFT ---------------- */
  const footLifted = Math.abs(la.y - ra.y) > 0.15;

  if (!footLifted) {
    return {
      step: 1,
      ok: false,
      msg: "Lift one leg",
      speak: "Lift one leg for Tree Pose"
    };
  }

  /* ---------------- STEP 2: BALANCE ---------------- */
  const hipsLevel = Math.abs(lh.y - rh.y) < 0.06;
  const shouldersLevel = Math.abs(ls.y - rs.y) < 0.06;

  if (!hipsLevel || !shouldersLevel) {
    return {
      step: 2,
      ok: false,
      msg: "Balance your body",
      speak: "Balance your body and keep straight"
    };
  }

  /* ---------------- STEP 3: HAND POSITION ---------------- */
  const handsUp = lw.y < ls.y && rw.y < rs.y;

  if (!handsUp) {
    return {
      step: 3,
      ok: false,
      msg: "Raise your hands up",
      speak: "Raise your hands above your head"
    };
  }

  /* ---------------- STEP 4: PERFECT POSE ---------------- */
  return {
    step: 4,
    ok: true,
    msg: "Perfect Tree Pose 🌳 Hold steady",
    speak: "Good job. Hold the pose"
  };
}
