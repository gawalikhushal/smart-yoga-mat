import numpy as np

def angle(a, b, c):
    a, b, c = np.array(a), np.array(b), np.array(c)
    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - \
              np.arctan2(a[1]-b[1], a[0]-b[0])
    ang = abs(radians * 180.0 / np.pi)
    return ang if ang <= 180 else 360 - ang


def tree_pose_steps(step, lm):

    # -------- STEP 0: STANDING STRAIGHT --------
    if step == 0:
        shoulder_hip_diff = abs(lm[11]["x"] - lm[23]["x"])

        if shoulder_hip_diff < 0.08:
            return {
                "correct": True,
                "message": "Good! Standing straight.",
                "next_step": 1
            }
        else:
            return {
                "correct": False,
                "message": "Stand straight with spine aligned",
                "reset_step": 0
            }

    # -------- STEP 1: LEG LIFTED --------
    if step == 1:
        knee_angle = angle(
            (lm[23]["x"], lm[23]["y"]),
            (lm[25]["x"], lm[25]["y"]),
            (lm[27]["x"], lm[27]["y"])
        )

        if knee_angle < 60:
            return {
                "correct": True,
                "message": "Nice! Leg lifted correctly.",
                "next_step": 2
            }
        else:
            return {
                "correct": False,
                "message": "Lift one leg and bend the knee",
                "reset_step": 1
            }

    # -------- STEP 2: HANDS UP --------
    if step == 2:
        wrist_y = lm[15]["y"]
        nose_y = lm[0]["y"]

        if wrist_y < nose_y:
            return {
                "correct": True,
                "message": "Hands raised properly!",
                "completed": True
            }
        else:
            return {
                "correct": False,
                "message": "Raise your hands above your head",
                "reset_step": 2
            }
