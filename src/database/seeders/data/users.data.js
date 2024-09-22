const bcryptjs = require('bcryptjs');
const salt = bcryptjs.genSaltSync();

const users = [
  {
    _id: 'b66e6db1-2d93-4e83-aea6-7e234a004c70',
    name: 'Carlos',
    lastName: 'Gómez',
    fullName: 'Carlos Gómez',
    email: 'carlos.gomez@example.com',
    password: bcryptjs.hashSync('password123', salt),
    roleId: 'fca2f5bb-249d-4e5a-bb69-1d938872f07f',
  },
  {
    _id: 'd4d3c7ef-d908-4a82-bc2d-9c4461c5b0aa',
    name: 'Jorge',
    lastName: 'Martínez',
    fullName: 'Jorge Martínez',
    email: 'jorge.martinez@example.com',
    password: bcryptjs.hashSync('password123', salt),
    roleId: 'fca2f5bb-249d-4e5a-bb69-1d938872f07f',
  },
  {
    _id: 'a1d42e38-1b76-4930-bd04-2a38f230058e',
    name: 'Carla',
    lastName: 'Silva',
    fullName: 'Carla Silva',
    email: 'carla.silva@example.com',
    password: bcryptjs.hashSync('password123', salt),
    roleId: 'fca2f5bb-249d-4e5a-bb69-1d938872f07f',
  },
  {
    _id: 'f5fbd7d6-7e61-4a80-b174-3b8a77d45714',
    name: 'Pedro',
    lastName: 'Ruiz',
    fullName: 'Pedro Ruiz',
    email: 'pedro.ruiz@example.com',
    password: bcryptjs.hashSync('password123', salt),
    roleId: 'cbe0e8b5-0a16-42d4-bb9b-8d6608a3ff8b',
  },
  {
    _id: 'c32ef726-16f2-4bb7-8374-3e7d7882b68a',
    name: 'Elena',
    lastName: 'Gómez',
    fullName: 'Elena Gómez',
    email: 'elena.gomez@example.com',
    password: bcryptjs.hashSync('password123', salt),
    roleId: 'cbe0e8b5-0a16-42d4-bb9b-8d6608a3ff8b',
  },
  {
    _id: 'd4fc4c2d-e9b1-4d6e-96a4-9f95a2f773f7',
    name: 'Ignacio',
    lastName: 'Avendaño',
    fullName: 'Ignacio Avendaño',
    email: 'ignacio.avendano@alumnos.ucn.cl',
    password: bcryptjs.hashSync('admin123', salt),
    roleId: 'b8a9f9a6-7a34-4f96-bd3c-72f1f623df9c',
  },
];

module.exports = users;
