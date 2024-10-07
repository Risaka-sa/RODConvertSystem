from typing import Annotated
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import glob
import convertFunction
from flask import Flask, send_from_directory, request, jsonify
import os
import pathlib


some_file_path = "large-video-file.mp4"
app = FastAPI()
app2 = Flask(__name__)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/upload")
async def create_upload_file(file: UploadFile):
    # Save the file or handle it as needed
    file_location = f"upload/{file.filename}"
    with open(file_location, "wb") as f:
        f.write(await file.read())
    return {"filename": '.'.join(file.filename.split(".")[:-1])}

@app.post("/download")
async def download_file(response_class=FileResponse):
    files = glob.glob('./upload/*')
    return FileResponse(path=convertFunction.main(files[0]), filename="example.xlsx", media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')



# Make sure the upload folder exists
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'upload')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/getFileName', methods=['GET'])
def get_filename(filename):
    try:
        return send_from_directory(UPLOAD_FOLDER, filename, as_attachment=True)
    except FileNotFoundError:
        return jsonify({'error': 'File not found'}), 404

if __name__ == '__main__':
    app2.run(host='0.0.0.0', port=8000)
    
