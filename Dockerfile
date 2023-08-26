#
FROM python:3.10

#
WORKDIR /src

#
COPY requirements.txt /src/requirements.txt

#
RUN pip install --no-cache-dir --upgrade -r /src/requirements.txt

#
COPY backend /src

CMD ["python", "app.py"]