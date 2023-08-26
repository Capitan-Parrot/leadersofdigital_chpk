import pandas as pd
import io
import csv

import pandas.errors
from fastapi import HTTPException
from starlette.responses import StreamingResponse


async def process_file(file):
    try:
        addresses = pd.read_csv(file.file)
        return addresses.values.tolist()
    except pandas.errors.EmptyDataError:
        raise HTTPException(status_code=404, detail="Файл пуст")


def create_csv_response(addresses):
    df = pd.DataFrame(addresses)
    stream = io.StringIO()
    df.to_csv(stream, index=False)
    response = StreamingResponse(
        iter([stream.getvalue()]), media_type="text/csv")
    response.headers["Content-Disposition"] = "attachment; filename=export.csv"
    return response


def process_address(address: str):
    short_to_full = {'бульв': 'бульвар', 'дор': 'дорога',
                     'наб': 'набережная', 'пер': 'переулок', 'пл': 'площадь', 'пр': 'проспект',
                     'ул': 'улица', 'д': 'дом', 'к': 'корпус', 'г': 'город', 'б-р': 'бульвар',
                     'пр-кт': 'проспект'}
    punctuation = [("(", ""), (")", ""), (".", " "), (',', ' ,')]
    for (old, new) in punctuation:
        address = address.replace(old, new)
    address = address.split()
    if address[0] == "россия":
        address[0] = ""
    for index, word in enumerate(address):
        if word.isdigit() and len(word) == 6:
            address[index] = ""
        else:
            address[index] = short_to_full.get(word, word)
    while address[0] == "," or address[0] == "":
        address = address[1:]
    return " ".join(address).replace(' ,', ',')