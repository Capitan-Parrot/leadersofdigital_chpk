from fastapi import UploadFile
from pydantic import BaseModel


class AddressFile(BaseModel):
    address_file: UploadFile


class Address(BaseModel):
    address: str


class Target(BaseModel):
    target_building_id: int
    target_address: str
    score: int


