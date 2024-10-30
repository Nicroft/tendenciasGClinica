# Usa una imagen base de Python
FROM python:3.11.10-alpine3.19

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /clinica

# Copia el archivo de requerimientos a la carpeta actual en el contenedor
COPY ./requirements.txt .

# Instala dependencias del sistema y las del proyecto en requirements.txt
RUN apk update \
    && apk add --no-cache gcc musl-dev libffi-dev sqlite-dev \
    && pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Copia todo el proyecto en el contenedor
COPY . .

# Expone el puerto 8000
EXPOSE 8000

# Comando para ejecutar el servidor Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
