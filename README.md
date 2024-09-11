# Codelsoft - Search Service

Este proyecto es una aplicación para la gestión de estudiantes, calificaciones y restricciones en universidades chilenas. Desarrollado como un monolito con influencias de arquitectura SOA, está construido con Node.js, Express.js, MongoDB, y MongoDB Atlas en producción.

![Logo](https://i.imgur.com/7R9KWRA.png)

## Tecnologías

- Node.js v20.16.0
- Express.js
- MongoDB
- MongoDB Atlas
- Mongoose

## Requisitos

- [Node](https://nodejs.org/en/download/current)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- Puerto de MongoDB = 27017 (configura según corresponda para otros entornos)
- Puerto del servidor = 3000
- Crear una base de datos llamada codelsoft

## Instalación

1. Clona el repositorio desde GitHub ejecutando los siguientes comandos en tu terminal:

```bash
git clone https://github.com/funktasthic/codelsoft-search-service.git

cd codelsoft-search-service
```

2. Verifica las ramas disponibles y cambia a la rama que deseas:

```bash
git branch -a

git checkout [nombre de tu rama]
```

3. Copia el archivo .env.example y configura el archivo .env con la información necesaria según el entorno que utilices:

```bash
copy .env.example .env
```

4. Run migrations and seeders:

```bash
npm run seed
```

5. Instala Nodemon globalmente y las dependencias del proyecto:

```bash
npm i -g nodemon
npm i
```

6. Ejecutar el proyecto según el entorno que utilice:

- Desarrollo:

```bash
npm run dev
```

- Pruebas:

```bash
npm run test
```

- Producción:

```bash
npm run start
```

## Authors

- [@funktasthic](https://www.github.com/funktasthic)
