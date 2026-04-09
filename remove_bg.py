from rembg import remove
from PIL import Image
import os

input_path = '/Users/padmanabharoy/Downloads/sj-demo/src/assets/about-section-image.jpg'
output_path = '/Users/padmanabharoy/Downloads/sj-demo/src/assets/about-section-image.png'

print(f"Opening image: {input_path}")
input_image = Image.open(input_path)

print("Removing background... (this might take a few seconds on first run to download the u2net model)")
output_image = remove(input_image)

print(f"Saving background-free image to: {output_path}")
output_image.save(output_path)
print("Background removal complete!")
