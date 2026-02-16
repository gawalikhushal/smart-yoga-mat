import numpy as np

def calculate_angle(a, b, c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)

    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - \
              np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = abs(radians * 180.0 / np.pi)

    if angle > 180:
        angle = 360 - angle

    return angle


# ================= TREE POSE =================
def tree_pose(landmarks):
    feedback = []

    knee_angle = calculate_angle(
        landmarks["left_hip"],
        landmarks["left_knee"],
        landmarks["left_ankle"]
    )

    if not (35 <= knee_angle <= 55):
        feedback.append("Bend your left knee properly")

    spine_y_diff = abs(landmarks["left_shoulder"][1] - landmarks["left_hip"][1])
    if spine_y_diff > 0.15:
        feedback.append("Keep your spine straight")

    hands_y = landmarks["left_wrist"][1]
    head_y = landmarks["nose"][1]
    if hands_y > head_y:
        feedback.append("Raise your hands above your head")

    return feedback


# ================= WARRIOR II =================
def warrior_pose(landmarks):
    feedback = []

    front_knee_angle = calculate_angle(
        landmarks["right_hip"],
        landmarks["right_knee"],
        landmarks["right_ankle"]
    )

    if not (80 <= front_knee_angle <= 110):
        feedback.append("Bend your front knee to 90 degrees")

    shoulder_diff = abs(
        landmarks["left_shoulder"][1] - landmarks["right_shoulder"][1]
    )

    if shoulder_diff > 0.1:
        feedback.append("Keep your shoulders level")

    arm_angle = calculate_angle(
        landmarks["left_shoulder"],
        landmarks["left_elbow"],
        landmarks["left_wrist"]
    )

    if arm_angle < 160:
        feedback.append("Stretch your arms straight")

    return feedback


# ================= MOUNTAIN POSE =================
def mountain_pose(landmarks):
    feedback = []

    shoulder_hip_diff = abs(
        landmarks["left_shoulder"][0] - landmarks["left_hip"][0]
    )

    if shoulder_hip_diff > 0.1:
        feedback.append("Align shoulders over hips")

    feet_diff = abs(
        landmarks["left_ankle"][0] - landmarks["right_ankle"][0]
    )

    if feet_diff > 0.25:
        feedback.append("Keep your feet together")

    return feedback
