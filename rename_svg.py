import os
import glob

directory = 'public/mainsvg'
pattern = os.path.join(directory, 'a-premium*')
files = glob.glob(pattern)

if files:
    old_path = files[0]
    new_path = os.path.join(directory, 'hero-premium.svg')
    try:
        os.rename(old_path, new_path)
        print(f"Renamed '{old_path}' to '{new_path}'")
    except Exception as e:
        print(f"Error renaming: {e}")
else:
    print("No file found matching pattern")
