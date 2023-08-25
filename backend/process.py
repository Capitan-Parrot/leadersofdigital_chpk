import pandas as pd


async def process_file(file):
    new_file = await file.read()
    flats = pd.read_excel(new_file)
    return flats.values.tolist()


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
        address = address[2:]
    for index, word in enumerate(address):
        address[index] = short_to_full.get(word, word)
    return " ".join(address).replace(' ,', ',')