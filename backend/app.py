from os import getenv

import uvicorn
from fastapi import FastAPI, UploadFile
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import FileResponse, StreamingResponse

from backend import schemas
from backend.process import process_file, process_address, create_csv_response

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Привет от команды ЧПК МИСИС!"}


@app.post("/oneAddress", response_model=list[schemas.Target])
async def one_address(input_address: schemas.Address):
    target = await correct_address(input_address)
    return target


@app.post("/file", response_model=StreamingResponse)
async def file(address_file: UploadFile):
    address_list = await process_file(address_file)
    print(address_list)
    correct_addresses = []
    for address in address_list:
        processed_address = process_address(address[1])
        correct = await correct_address(processed_address)
        correct_addresses.append(correct)
    return create_csv_response(correct_addresses)


async def correct_address(input_address):
    # result = await
    return {"target_building_id": 1, "target_address": "Санкт-Петербург", "score": 98.7}


if __name__ == "__main__":
    uvicorn.run(
        app,
        host=getenv("SERVER_HOST", "0.0.0.0"),
        port=int(getenv("PORT", 3000)),
        workers=4
    )
