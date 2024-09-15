from typing import Annotated
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import glob
import convertFunction


some_file_path = "large-video-file.mp4"
app = FastAPI()

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
    return {"filename": file.filename}

@app.post("/download")
async def download_file(response_class=FileResponse):
    files = glob.glob('./upload/*')
    return FileResponse(path=convertFunction.main(files[0]), filename="example.xlsx", media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    
    
