const bcryptjs = require('bcryptjs');
const salt = bcryptjs.genSaltSync();

const users = [
  {
    _id: 'a19d4464-3b67-47e0-9e30-19465ab054b6',
    name: 'Ana',
    lastName: 'Perez',
    email: 'ana.perez@example.com',
    password: bcryptjs.hashSync('password123', salt),
    roleId: 'fca2f5bb-249d-4e5a-bb69-1d938872f07f',
  },
  {
    _id: 'b66e6db1-2d93-4e83-aea6-7e234a004c70',
    name: 'Carlos',
    lastName: 'Gómez',
    email: 'carlos.gomez@example.com',
    password: bcryptjs.hashSync('password123', salt),
    roleId: 'fca2f5bb-249d-4e5a-bb69-1d938872f07f',
  },
  {
    _id: 'c72c6584-5e62-44aa-b7c7-2df17e58b7cb',
    name: 'María',
    lastName: 'Fernández',
    email: 'maria.fernandez@example.com',
    password: bcryptjs.hashSync('password123', salt),
    roleId: 'fca2f5bb-249d-4e5a-bb69-1d938872f07f',
  },
  {
    _id: 'd4d3c7ef-d908-4a82-bc2d-9c4461c5b0aa',
    name: 'Jorge',
    lastName: 'Martínez',
    email: 'jorge.martinez@example.com',
    password: bcryptjs.hashSync('password123', salt),
    roleId: 'fca2f5bb-249d-4e5a-bb69-1d938872f07f',
  },
  {
    _id: 'e0d2c6a2-788f-4d99-9330-c1a8c983e47b',
    name: 'Laura',
    lastName: 'Díaz',
    email: 'laura.diaz@example.com',
    password: bcryptjs.hashSync('password123', salt),
    roleId: 'fca2f5bb-249d-4e5a-bb69-1d938872f07f',
  },
  {
    _id: 'f5fbd7d6-7e61-4a80-b174-3b8a77d45714',
    name: 'Pedro',
    lastName: 'Ruiz',
    email: 'pedro.ruiz@example.com',
    password: bcryptjs.hashSync('password123', salt),
    roleId: 'fca2f5bb-249d-4e5a-bb69-1d938872f07f',
  },
  {
    _id: 'a1d42e38-1b76-4930-bd04-2a38f230058e',
    name: 'Claudia',
    lastName: 'Silva',
    email: 'claudia.silva@example.com',
    password: bcryptjs.hashSync('password123', salt),
    roleId: 'cbe0e8b5-0a16-42d4-bb9b-8d6608a3ff8b',
  },
  {
    _id: 'b51e8a44-1940-48b0-8d96-3b807c606db7',
    name: 'David',
    lastName: 'Castro',
    email: 'david.castro@example.com',
    password: bcryptjs.hashSync('password123', salt),
    roleId: 'cbe0e8b5-0a16-42d4-bb9b-8d6608a3ff8b',
  },
  {
    _id: 'c32ef726-16f2-4bb7-8374-3e7d7882b68a',
    name: 'Elena',
    lastName: 'Gómez',
    email: 'elena.gomez@example.com',
    password: bcryptjs.hashSync('password123', salt),
    roleId: 'cbe0e8b5-0a16-42d4-bb9b-8d6608a3ff8b',
  },
  {
    _id: 'd4fc4c2d-e9b1-4d6e-96a4-9f95a2f773f7',
    name: 'Ignacio',
    lastName: 'Avendaño',
    email: 'ignacio.avendano@alumnos.ucn.cl',
    password: bcryptjs.hashSync('admin123', salt),
    roleId: 'b8a9f9a6-7a34-4f96-bd3c-72f1f623df9c',
  },
];

module.exports = users;
