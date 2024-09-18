from fastapi import FastAPI, File, UploadFile
import io
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['TF_CPP_MIN_LOG_LEVEL'] ='1'
import uvicorn
from PIL import Image
import numpy as np
import tensorflow as tf
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
# Installed pymon - similar to nodemon -> pymon {pythonfile.py}

load_dotenv()
PORT = os.getenv('PORT')

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins = ["*"],
  allow_credentials = True,
  allow_methods=["*"],
  allow_headers=["*"]
)

cwd = os.path.dirname(os.path.abspath(__file__))
plantModel = tf.keras.models.load_model(f"{cwd}/models/plant_model.h5")
# animalModel = tf.keras.models.load_model(f"{cwd}/models/animal_model.h5")
# Model.compiled_metrics =  NONE #tf.keras.metrics.load_metrics

@app.get("/")
async def ping():
  return "Welcome to DigiFarm"
  # return "Website running on 8000"

def read_file_as_image(data) -> np.ndarray:
  print("Data address = ", io.BytesIO(data))
  imgarr = np.array(Image.open(io.BytesIO(data)))
  # print("Img Array = ", imgarr)
  return imgarr

# @app.post("/animal")
# async def predict(
#   file:UploadFile = File(...)
#   ):
#   imgarr = read_file_as_image(await file.read())
#   img_batch = np.expand_dims(imgarr, axis=0)
#   img_process = img_batch.astype('float32')/255
#   prediction = animalModel.predict(img_process)
#   prediction_class = np.argmax(prediction, axis=1)[0]
#   print("Prediction class - ", prediction_class)
#   return prediction_class

@app.post("/plant")
async def predict(
  file:UploadFile = File(...)
  ):
  imgarr = read_file_as_image(await file.read())
  # print("Image Array List - ", imgarr.tolist())

  img_batch = np.expand_dims(imgarr, axis=0)
  # print("Image batch - ", img_batch.tolist())

  img_process = img_batch.astype('float32')/255
  # print("Processed Image batch - ", img_batch.tolist())

  prediction = plantModel.predict(img_process)
  # print("Prediction - ", prediction)

  # prediction_class = np.argmax(prediction, axis=0)
  # print("Prediction class axis 0 - ", prediction_class)

  # prediction_class = np.argmax(prediction, axis=1)
  # print("Prediction class axis 1 - ", prediction_class)

  prediction_class = np.argmax(prediction, axis=1)[0]
  print("Prediction class - ", prediction_class)
  return prediction_class
  
  # content = await file.read()
  # print(content)
  # return {"message" : content}

  # Below code doesn't work
  # with open(file) as f:
  # f = open(file, 'r')
  # print(await file.read())

if __name__ == "__main__":
  uvicorn.run(app, host="localhost", port=PORT)
  