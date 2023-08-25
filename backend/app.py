from os import getenv

import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from backend import schemas
from backend.process import process_file, process_address

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


@app.post("/oneAddress", response_model=schemas.Target)
async def one_address(input_address: schemas.Address):
    target = await correct_address(input_address)
    return target


@app.post("/file", response_model=list[schemas.Target])
async def file(address_file: schemas.AddressFile):
    address_list = await process_file(address_file)
    print(address_file)
    for address in address_list:
        processed_address = process_address(address)
        address_list[address] = await correct_address(processed_address)
    return address_list


async def correct_address(input_address):
    # result = await
    return {"target_building_id": 1, "target_address": "Санкт-Петербург"}


if __name__ == "__main__":
    uvicorn.run(
        app,
        host=getenv("SERVER_HOST", "127.0.0.1"),
        port=int(getenv("SERVER_PORT", 80)),
    )
