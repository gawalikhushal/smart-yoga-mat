from flask import Flask, request, jsonify
from flask_cors import CORS
from pose_steps import tree_pose_steps

app = Flask(__name__)
CORS(app)

@app.route("/check_pose_step", methods=["POST"])
@app.route("/check_pose_step", methods=["POST"])
def check_pose_step():
    data = request.json
    pose = data["pose"]
    step = data["step"]
    lm = data["landmarks"]

    if pose == "tree":
        result = tree_pose_steps(step, lm)
        return jsonify(result)

    return jsonify(correct=False, message="Unsupported pose", reset_step=0)


app.run(debug=True)
