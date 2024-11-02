FROM python:3.11.10-alpine3.19

WORKDIR /clinica

COPY ./requirements.txt .

RUN apk update \
    && apk add --no-cache gcc musl-dev libffi-dev sqlite-dev \
    && pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt


COPY . .


EXPOSE 8000


CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
