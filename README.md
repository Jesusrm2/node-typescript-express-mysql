### Información-General
***
Backend para las peticiones de la aplicacion para crear itinerarios cuenta con:
* Peticiones get, post, put y delete 
* Encriptamiento de contrasenia
* Creaccion de token
* Validar tokes

## Tecnologías
***
Una lista de tecnologías utilizadas dentro del proyecto:
* Express: Version 4.18.2
* sequelize: Version 6.32.1
* jsonwebtoken:Version 9.0.0
* nodemailer: Version ^6.9.3
* bcryptjs: Version ^2.4.3
## Installation
***
Introducción sobre la instalación. 
```
$ npm install
$ tsc //incluye una carpeta a la compilacion de typescript
$ npm start
```
Cambiar la conexion a la base de datos en la ubicación bd/conexion.ts por el que corresponte:
```
const db = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});
```

