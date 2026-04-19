import os
import shutil

base_dir = r"c:\Users\Sachin\OneDrive\Desktop\careerflow-nextgen-landing\public\mainsvg"
print(f"Listing directory: {base_dir}")
try:
    for filename in os.listdir(base_dir):
        print(f"Found: {filename}")
        if filename.startswith("a-premium"):
            old_path = os.path.join(base_dir, filename)
            new_path = os.path.join(base_dir, "hero-premium.svg")
            print(f"Attempting valid rename from {old_path} to {new_path}")
            try:
                os.rename(old_path, new_path)
                print("Rename success")
            except OSError as e:
                print(f"Rename failed: {e}")
                # Try shutil.move as fallback
                try:
                    shutil.move(old_path, new_path)
                    print("Move success")
                except Exception as e2:
                    print(f"Move failed: {e2}")
except Exception as e:
    print(f"Directory access failed: {e}")
