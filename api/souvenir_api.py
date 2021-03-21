from flask import Flask
from flask import request
from dotenv import load_dotenv
from pathlib import Path
from flask_cors import CORS
from PIL import Image, ImageFont, ImageDraw 
import json
import requests
import os

app = Flask(__name__)
CORS(app)
load_dotenv()
headers = {
    "pinata_api_key": os.getenv("PINATA_API_KEY"),
    "pinata_secret_api_key": os.getenv("PINATA_SECRET_API_KEY"),
}

default_stamps = {
    "1":Image.open("./test_pics/stamp1.jpg"),
    "2":Image.open("./test_pics/stamp2.jpg"),
    "3":Image.open("./test_pics/stamp3.jpg")
}

# Function managing Pinata pinning post request
def pinata_pin(file_dict):
    r = requests.post(
            "https://api.pinata.cloud/pinning/pinFileToIPFS", 
            headers=headers,
            files=file_dict
        )
    return r

# Function managing Pinata pinning post request
def pinata_pin_json(metadata):
    print(metadata)
    r = requests.post(
            "https://api.pinata.cloud/pinning/pinJSONToIPFS", 
            headers=headers,
            data=metadata
        )

    return r

# Function that puts city name on default stamp
def put_title(image,city_name,color = "#000000"):
    # Making image editable
    image_editable = ImageDraw.Draw(image)

    # Setting font
    font_size = int(image_editable.im.size[0]*0.05)
    title_font = ImageFont.truetype('roboto/Roboto-Bold.ttf',  font_size)

    # Getting font color
    adjcolor = color.lstrip('#')
    print(adjcolor)
    color_tuple = tuple(int(adjcolor[i:i+2], 16) for i in (0, 2, 4))

    half_image_width = image_editable.im.size[0]/2
    half_text_width = title_font.getsize(city_name)[0]/2
    half_text_height = title_font.getsize(city_name)[1]/2
    entire_image_length = image_editable.im.size[1]
    seventh_image_length = image_editable.im.size[1]*0.07

    # Applying text
    image_editable.text(
                        ( half_image_width - half_text_width, entire_image_length - (seventh_image_length + half_text_height) ), # positioning (bottom center)
                        city_name, # city name
                        color_tuple, # color
                        font=title_font # font
                        )
    image.save("result.jpg")

########## API functionality ##########

# Pin file via API
@app.route('/pin-image',methods=['POST'])
def pin_image():
    print("Posted file: {}".format(request.files['file']))
    file = {'file' : request.files['file'].read()}
    
    name = request.files['name']
    description = request.files['description']
    external_link = request.files['external_link']
    gps = request.files['gps']

    r = pinata_pin(file)
    IPFSHash = (r.json()['IpfsHash'])

    metadata = {
        "image": 'ipfs://' + IPFSHash,
        "name": name,
        "description": description,
        "external_url": external_link,
        "gps": gps
    }

    mp = pinata_pin_json(metadata)

    if 'IpfsHash' in mp.text:
        # print(str(r.text))
        return mp.json()
    else:
        return "Error uploading file!" 

    # Example POST request:
    ## requests.post("http://localhost:105/pin-image",files = {'file': open(Path('./pics/myface.png'),'rb')})

@app.route('/generate-metadata', methods=['POST'])
def generate_metadata():
    data = json.loads(request.data)
    name = data['name']
    description = data['description']
    template = data['template']
    fontColor = data['fontColor']
    external_link = data['external_link']
    gps = data['gps']

    stamp = default_stamps[template]
    f = put_title(stamp,name,fontColor)

    file = {'file' : open(Path('./result.jpg'),'rb') }
    r = pinata_pin(file)
    IPFSHash = (r.json()['IpfsHash'])

    metadata = {
        "image": 'ipfs://' + IPFSHash,
        "name": name,
        "description": description,
        "external_url": external_link,
        "gps": gps
    }

    mp = pinata_pin_json(metadata)

    if 'IpfsHash' in mp.text:
        # print(str(r.text))
        return mp.json()
    else:
        return "Error uploading file!" 


if __name__ == '__main__':

    port_num = 105
    host_address = "127.0.0.1" # localhost

    print(f"Open http://localhost:{port_num}/(base_url) in browser")

    app.run(host=host_address, port=port_num,debug=True)