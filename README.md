# dev-nodejs--leandro-alvarez

  

## Description

  

Ejercicio Práctico BackEnd Developer de Banco Pichincha

Desarrollado en el entorno _NodeJS_ junto con el framework _NestJS_ en cual provee varias herramientas para realizar un Backend escalable
  
- [X] Ejercicio 1
Apoyado en librería _json-server_
```bash
npm run mockServer
```
- [X] Ejercicio 2
- Los controladores generan los endpoints para hacer el CRUD de cada una de las entidades 
```bash
<http://localhost:3000>/api
```
- ORM Base deDatos _cockroachdb_ con _TypeORM_
- Respetando principios Solid con responsabilidad única, herencia, inyección de dependencias basado en modulos 
- Singleton importante para la instancia del ORM
- DTOs aplicando con _class-validator_
- Practica de organizacion de versiones y ramas **trunk-based** aplicada 

- [X] Ejercicio 3
- Relación de entidades aplicadas: _uno a uno_, _uno a muchos_
- Controlador adjunto a repositorios provee endpoint para la obteción de métricas 
- Control de enums y valores con _typeorm_
- Formato de respuesta realizada con _serializadores_ y _querybuilders_

- [X] Ejercicio 4
- Endpoint para descargar archivo _.csv_ 
    

## Installation
 

```bash

$ npm install

```

  

## Running the app

  

```bash

# mock repositories service

$ npm run mockServer

$ <http://localhost:3004>/repositories

# development

$ npm run start

# documentation

$ <http://localhost:3000>/api


# dev

$ npm run start:dev

# production mode

$ npm run start:prod
```


## Variables de Entorno

 
```bash
COCKROACH_DB=defaultdb
COCKROACH_PORT=26257
COCKROACH_PASSWORD=2txdZrIqaON1aE7iLLLLdw
COCKROACH_USER=dev-nodejs-leandro-alvarez-db
COCKROACH_HOST=free-tier11.gcp-us-east1.cockroachlabs.cloud
COCKROACH_CLUSTER=fluffy-husky-1651

MOCK_API=http://localhost:3004/repositories
```
  

## Contacto

  

- Author - [Leandro Alvarez](https://www.linkedin.com/in/leandroalvarezs/)

  

## License

  

Nest is [MIT licensed](LICENSE).
