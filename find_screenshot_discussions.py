import json
import sys

input_path = r"C:\Users\heman\.gemini\antigravity\brain\3e5f9746-6108-4d18-a867-2d522571a144\.system_generated\logs\transcript.jsonl"
output_path = r"C:\Users\heman\.gemini\antigravity\brain\3e5f9746-6108-4d18-a867-2d522571a144\screenshot_discussions.txt"

media_ids = ["1779269302133", "1779269663120", "1779269918738", "1779270200320", "1779270406373", "1779261096017"]

with open(input_path, "r", encoding="utf-8") as f, open(output_path, "w", encoding="utf-8") as out:
    for line in f:
        for mid in media_ids:
            if mid in line:
                try:
                    obj = json.loads(line)
                except Exception as e:
                    continue
                step_idx = obj.get("step_index", "unknown")
                source = obj.get("source")
                type_ = obj.get("type")
                out.write(f"=== STEP {step_idx} ({source}, {type_}) mentions {mid} ===\n")
                
                content = obj.get("content", "")
                if content:
                    out.write("Content:\n")
                    out.write(content)
                    out.write("\n")
                
                thinking = obj.get("thinking", "")
                if thinking:
                    out.write("Thinking:\n")
                    out.write(thinking)
                    out.write("\n")
                
                out.write("-" * 50 + "\n")
                break

print("Done! Discussions written to screenshot_discussions.txt")
