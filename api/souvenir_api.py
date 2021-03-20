from flask import Flask
from flask import request
from dotenv import load_dotenv
from pathlib import Path
import requests
import os

app = Flask(__name__)
load_dotenv()
headers = {
    "pinata_api_key": os.getenv("PINATA_API_KEY"),
    "pinata_secret_api_key": os.getenv("PINATA_SECRET_API_KEY"),
}

# Function managing Pinata pinning post request
def pinata_pin(file_dict):
    r = requests.post(
            "https://api.pinata.cloud/pinning/pinFileToIPFS", 
            headers=headers,
            files=file_dict
        )
    return r


# API functionality

# Pin file via API
@app.route('/pin-image',methods=['GET','POST'])
def pin_image():
    print("Posted file: {}".format(request.files['file']))
    file = {'file' : request.files['file'].read()}
    
    r = pinata_pin(file)
    print(r.text)

    if 'IpfsHash' in str(r.text):
        # print(str(r.text))
        return r.json()
    else:
        return "Error uploading file!" 

    # Example POST request:
    ## requests.post("http://localhost:105/pin-image",files = {'file': open(Path('./pics/myface.png'),'rb')})



    



if __name__ == '__main__':

    port_num = 105
    host_address = "127.0.0.1" # localhost

    print(f"Open http://localhost:{port_num}/(base_url) in browser")

    app.run(host=host_address, port=port_num,debug=True)