function validatePose(poseId, landmarks) {
  const pose = poseRules[poseId];
  if (!pose) {
    return { ok: false, msg: "Pose not defined" };
  }

  for (let step of pose.steps) {
    if (!step.check(landmarks)) {
      return {
        ok: false,
        step: step.id,
        text: step.text,
        speak: step.speak
      };
    }
  }

  return {
    ok: true,
    step: pose.steps.length + 1,
    text: {
      en: "Perfect pose! Hold steady",
      hi: "सही मुद्रा! बनाए रखें"
    },
    speak: {
      en: "Good job. Hold the pose",
      hi: "बहुत अच्छा। मुद्रा बनाए रखें"
    }
  };
}
