Pasos para ejecutar el proyecto (Windows)
Requisitos previos
Python (versión 3.8 o superior)
Node.js (versión 14 o superior)
Un gestor de paquetes como pip para Python y npm para Node.js
(Opcional) PostgreSQL si eliges usar esta base de datos en lugar de SQLite
Entorno virtual para aislar las dependencias del proyecto
Configuración de la base de datos
El proyecto permite utilizar dos opciones de bases de datos: PostgreSQL o SQLite.

PostgreSQL (opción avanzada): En el archivo clinica/settings.py, encontrarás la configuración para conectar con PostgreSQL:


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'TestDB',
        'USER': 'postgres',
        'PASSWORD': '####',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}


Asegúrate de reemplazar '####' con tu contraseña de PostgreSQL y modificar otros parámetros si es necesario.

SQLite (recomendado para desarrollo local): Si prefieres usar SQLite, está configurado por defecto en el archivo clinica/settings.py:

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": "mydatabase",
    }
}

Nota: Para alternar entre ambas opciones, comenta la configuración que no estés utilizando.


Configuración del entorno virtual
Sigue estos pasos para configurar el entorno virtual:

Abre el Símbolo del sistema o PowerShell.

Navega al directorio del proyecto.

Crea un entorno virtual ejecutando el siguiente comando:

python -m venv env


Activa el entorno virtual con el siguiente comando:

env\Scripts\activate



Instala las dependencias del proyecto con:

pip install -r requirements.txt



Migraciones de la base de datos.

Antes de ejecutar el servidor, es importante aplicar las migraciones a la base de datos. Ejecuta los siguientes comandos en la misma terminal donde activaste el entorno virtual:

python manage.py makemigrations
python manage.py migrate


Ejecutar el proyecto
El proyecto cuenta con un backend en Django y un frontend basado en React. Debes ejecutar ambos servidores en dos terminales diferentes:

En la primera terminal, activa el entorno virtual e inicia el servidor del backend (Django):


python manage.py runserver



En la segunda terminal, navega a la carpeta del frontend y ejecuta el servidor de desarrollo de React:


npm install   # Solo la primera vez para instalar las dependencias
npm install -D tailwindcss postcss autoprefixer

npm run dev



Acceso a la aplicación
Accede al backend (API de Django) en: http://localhost:8000/.
Accede al frontend (React) en: http://localhost:3000/.