from flask import Flask, request, jsonify
from flask_cors import CORS
from pose_logic import tree_pose, warrior_pose, mountain_pose

app = Flask(__name__)
CORS(app)

@app.route("/check_pose", methods=["POST"])
def check_pose():
    data = request.json
    pose = data["pose"]
    landmarks = data["landmarks"]

    if pose == "Tree Pose":
        feedback = tree_pose(landmarks)
    elif pose == "Warrior Pose":
        feedback = warrior_pose(landmarks)
    elif pose == "Mountain Pose":
        feedback = mountain_pose(landmarks)
    else:
        feedback = ["Pose not supported"]

    if len(feedback) == 0:
        return jsonify({
            "correct": True,
            "message": ["Perfect pose! Hold steady 🧘‍♂️"]
        })

    return jsonify({
        "correct": False,
        "message": feedback
    })

app.run(debug=True)
