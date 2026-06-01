import json

input_path = r"C:\Users\heman\.gemini\antigravity\brain\3e5f9746-6108-4d18-a867-2d522571a144\.system_generated\logs\transcript.jsonl"

with open(input_path, "r", encoding="utf-8") as f:
    for line in f:
        if "media__" in line:
            obj = json.loads(line)
            step_idx = obj.get("step_index", "unknown")
            print(f"=== STEP {step_idx} (source: {obj.get('source')}, type: {obj.get('type')}) ===")
            # Check if there are tool calls or anything
            for tool in obj.get("tool_calls", []):
                if tool.get("name") == "write_to_file" or tool.get("name") == "replace_file_content":
                    print(f"  Tool: {tool.get('name')}, File: {tool.get('args', {}).get('TargetFile')}")
            # If the step content or summary contains it:
            content = obj.get("content", "")
            if "media__" in content:
                print("  Content contains media__ references:")
                for l in content.split("\n"):
                    if "media__" in l:
                        print("    ", l[:120])
