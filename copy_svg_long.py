import os

# Use extended path prefix for Windows long filenames
base_dir = r"\\?\c:\Users\Sachin\OneDrive\Desktop\careerflow-nextgen-landing\public\mainsvg"
target_file = os.path.join(base_dir, "hero-premium.svg")

found = False
try:
    for filename in os.listdir(base_dir):
        if filename.startswith("a-premium"):
            src_file = os.path.join(base_dir, filename)
            print(f"Reading from: {src_file}")
            try:
                with open(src_file, 'rb') as f_src:
                    content = f_src.read()
                
                with open(target_file, 'wb') as f_dst:
                    f_dst.write(content)
                
                print(f"Successfully wrote {len(content)} bytes to {target_file}")
                found = True
                break
            except Exception as e:
                print(f"Error copying: {e}")
except Exception as e:
    print(f"Directory error: {e}")

if not found:
    print("Could not find the premium file to copy (or copy failed).")
