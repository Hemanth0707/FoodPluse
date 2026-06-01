import json

input_path = r"C:\Users\heman\.gemini\antigravity\brain\3e5f9746-6108-4d18-a867-2d522571a144\.system_generated\logs\transcript.jsonl"
output_path = r"C:\Users\heman\.gemini\antigravity\brain\3e5f9746-6108-4d18-a867-2d522571a144\all_user_inputs.txt"

with open(input_path, "r", encoding="utf-8") as f, open(output_path, "w", encoding="utf-8") as out:
    for line in f:
        try:
            obj = json.loads(line)
            if obj.get("type") == "USER_INPUT":
                step_idx = obj.get("step_index", "unknown")
                content = obj.get("content", "")
                out.write(f"=== STEP {step_idx} ===\n{content}\n\n")
        except Exception as e:
            print("Error parsing line:", e)
