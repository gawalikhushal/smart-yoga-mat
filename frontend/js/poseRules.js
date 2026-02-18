const poseRules = {
  vrikshasana: {
    steps: [
      {
        id: 1,
        text: {
          en: "Lift one leg",
          hi: "एक पैर उठाइए"
        },
        speak: {
          en: "Lift one leg for Tree Pose",
          hi: "वृक्षासन के लिए एक पैर उठाइए"
        },
        check: lm => Math.abs(lm[27].y - lm[28].y) > 0.15
      },

      {
        id: 2,
        text: {
          en: "Balance your body",
          hi: "शरीर का संतुलन बनाए रखें"
        },
        speak: {
          en: "Balance your body",
          hi: "अपने शरीर का संतुलन बनाए रखें"
        },
        check: lm =>
          Math.abs(lm[23].y - lm[24].y) < 0.06 &&
          Math.abs(lm[11].y - lm[12].y) < 0.06
      },

      {
        id: 3,
        text: {
          en: "Raise your hands up",
          hi: "हाथ ऊपर उठाइए"
        },
        speak: {
          en: "Raise your hands up",
          hi: "अपने हाथ ऊपर उठाइए"
        },
        check: lm =>
          lm[15].y < lm[11].y &&
          lm[16].y < lm[12].y
      }
    ]
  },

  tadasana: {
    steps: [
      {
        id: 1,
        text: {
          en: "Stand straight",
          hi: "सीधे खड़े रहें"
        },
        speak: {
          en: "Stand straight",
          hi: "सीधे खड़े रहें"
        },
        check: lm =>
          Math.abs(lm[11].y - lm[12].y) < 0.05 &&
          Math.abs(lm[23].y - lm[24].y) < 0.05
      }
    ]
  }

  // 👉 Add remaining 82 poses here ONLY
};
