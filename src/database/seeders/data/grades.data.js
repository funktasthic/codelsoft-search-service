const grades = [
  {
    _id: 'd0b8c4a9-9b7c-49f2-b1b6-0f6a843c4c3f',
    subjectName: 'Inglés',
    gradeName: 'Ensayo',
    grade: 6.8,
    comment: 'Excelente análisis literario y uso avanzado del idioma.',
    studentId: 'a1d42e38-1b76-4930-bd04-2a38f230058e',
  },
  {
    _id: 'e19c89e7-cff0-4b9c-b072-08c80b8bba23',
    subjectName: 'Arte',
    gradeName: 'Trabajo en Grupo',
    grade: 5.0,
    comment: 'Trabajo colaborativo efectivo, pero faltó cohesión en la presentación.',
    studentId: 'a1d42e38-1b76-4930-bd04-2a38f230058e',
  },
  {
    _id: 'd7b7d1e4-96e3-434d-8d4a-bf5e3d95b9a8',
    subjectName: 'Música',
    gradeName: 'Participación en Clase',
    grade: 5.5,
    comment: 'Muy activa en clase, con contribuciones valiosas a las discusiones.',
    studentId: 'a1d42e38-1b76-4930-bd04-2a38f230058e',
  },
  {
    _id: 'c5b7e2e9-4a09-4230-a40b-5044f3d0d787',
    subjectName: 'Educación Física',
    gradeName: 'Examen',
    grade: 6.0,
    comment: 'Comprensión clara de los temas, buen rendimiento físico.',
    studentId: 'a1d42e38-1b76-4930-bd04-2a38f230058e',
  },
  {
    _id: 'f4b82d0e-7e98-4e0d-a40e-6e5f3e36c0ff',
    subjectName: 'Matemáticas',
    gradeName: 'Examen de Cálculo',
    grade: 3.1,
    comment: 'Dificultades con la derivación de funciones.',
    studentId: 'a1d42e38-1b76-4930-bd04-2a38f230058e',
  },
  {
    _id: 'a91c4eae-36b7-4f5e-bfc0-6c6e0f5d3f5c',
    subjectName: 'Física',
    gradeName: 'Examen Final',
    grade: 6.2,
    comment: 'Gran progreso, especialmente en los conceptos de dinámica.',
    studentId: 'a66e6db1-2d93-4e83-aea6-7e234a004c70',
  },
  {
    _id: 'f2b7e4b9-8d94-4a93-b6e5-6e6d887e4d1e',
    subjectName: 'Biología',
    gradeName: 'Examen Parcial',
    grade: 4.2,
    comment: 'Requiere más práctica en los conceptos de biología celular.',
    studentId: 'a66e6db1-2d93-4e83-aea6-7e234a004c70',
  },
  {
    _id: 'e41d9ef2-3bf2-47d6-9b4e-6dc9f7a888b1',
    subjectName: 'Matemáticas',
    gradeName: 'Prueba de Álgebra',
    grade: 3.8,
    comment: 'Dificultades con ecuaciones lineales.',
    studentId: 'a66e6db1-2d93-4e83-aea6-7e234a004c70',
  },
  {
    _id: 'd41b8b9e-5b93-4d8b-8e26-2f5e7d8815aa',
    subjectName: 'Química',
    gradeName: 'Laboratorio',
    grade: 3.5,
    comment: 'Se requiere mejorar en la precisión de los resultados.',
    studentId: 'a66e6db1-2d93-4e83-aea6-7e234a004c70',
  },
  {
    _id: 'b62f9c22-1b62-4a1d-9b72-b63f4d5f576e',
    subjectName: 'Historia',
    gradeName: 'Prueba de Historia Mundial',
    grade: 6.5,
    comment: 'Excelente conocimiento de los eventos históricos.',
    studentId: 'a66e6db1-2d93-4e83-aea6-7e234a004c70',
  },
  {
    _id: 'b32c68b4-8f7e-4d16-a564-d576c2b57276',
    subjectName: 'Química',
    gradeName: 'Proyecto',
    grade: 4.3,
    comment: 'Buen esfuerzo en el proyecto, pero requiere más profundidad en el análisis.',
    studentId: 'd4d3c7ef-d908-4a82-bc2d-9c4461c5b0aa',
  },
  {
    _id: 'c21d8f87-94b5-46b8-bb29-6f30b58c9e48',
    subjectName: 'Filosofía',
    gradeName: 'Examen Parcial',
    grade: 5.8,
    comment: 'Buen análisis filosófico, pero algunas ideas podrían desarrollarse mejor.',
    studentId: 'd4d3c7ef-d908-4a82-bc2d-9c4461c5b0aa',
  },
  {
    _id: 'f81d3e94-91f1-4c26-9f43-4ed3f0b75c34',
    subjectName: 'Matemáticas',
    gradeName: 'Examen de Geometría',
    grade: 3.2,
    comment: 'Problemas con la visualización de figuras geométricas.',
    studentId: 'd4d3c7ef-d908-4a82-bc2d-9c4461c5b0aa',
  },
  {
    _id: 'b93d8c25-66b8-4742-9363-8fd9db9a6221',
    subjectName: 'Física',
    gradeName: 'Tarea de Dinámica',
    grade: 2.9,
    comment: 'No aplicó correctamente las leyes de Newton.',
    studentId: 'd4d3c7ef-d908-4a82-bc2d-9c4461c5b0aa',
  },
  {
    _id: 'a3f1c5c9-df9b-4397-a6d2-f2e6ae4f8824',
    subjectName: 'Química',
    gradeName: 'Examen Final',
    grade: 6.9,
    comment: 'Muy buen desempeño en el examen final, claridad en los conceptos.',
    studentId: 'd4d3c7ef-d908-4a82-bc2d-9c4461c5b0aa',
  },
  {
    _id: 'b3b226e7-d99b-43a8-9d52-30a1623f045b',
    subjectName: 'Lengua',
    gradeName: 'Participación en Clase',
    grade: 6.5,
    comment: 'Muy activa en clase, con comentarios profundos sobre la literatura.',
    studentId: 'd4d3c7ef-d908-4a82-bc2d-9c4461c5b0aa',
  },
];

module.exports = grades;
