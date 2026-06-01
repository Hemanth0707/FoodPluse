import json

input_path = r"C:\Users\heman\.gemini\antigravity\brain\3e5f9746-6108-4d18-a867-2d522571a144\.system_generated\logs\transcript.jsonl"
output_path = r"C:\Users\heman\.gemini\antigravity\brain\3e5f9746-6108-4d18-a867-2d522571a144\step_510_full.txt"

with open(input_path, "r", encoding="utf-8") as f:
    for line in f:
        try:
            obj = json.loads(line)
            if obj.get("step_index") == 510:
                content = obj.get("content", "")
                with open(output_path, "w", encoding="utf-8") as out:
                    out.write(content)
                print("Step 510 written successfully!")
                break
        except Exception as e:
            pass
