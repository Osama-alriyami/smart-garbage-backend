import json

def remove_ids(data):
    if isinstance(data, dict):
        return {k: remove_ids(v) for k, v in data.items() if k != "_id"}
    elif isinstance(data, list):
        return [remove_ids(item) for item in data]
    else:
        return data

# Load the original JSON file
with open("garbage_bin_with_predictions.json", "r") as f:
    json_data = json.load(f)

# Remove all "_id" keys
cleaned_data = remove_ids(json_data)

# Save to a new JSON file
with open("cleaned_output.json", "w") as f:
    json.dump(cleaned_data, f, indent=4)

print("Cleaned JSON saved as 'cleaned_output.json'")
