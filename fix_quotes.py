import os
import glob

files = glob.glob('src/**/*.jsx', recursive=True)

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()

    # The raw string in python left literal backslashes before single quotes
    if r"\'" in content:
        content = content.replace(r"\'", "'")
        with open(filepath, 'w') as f:
            f.write(content)

