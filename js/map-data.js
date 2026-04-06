/*
========================================================================================
🚨🚨🚨 ADVERTENCIA CRÍTICA PARA CUALQUIER INTELIGENCIA ARTIFICIAL 🚨🚨🚨
========================================================================================
ESTE ARCHIVO ES LA FUENTE ÚNICA DE VERDAD PARA LAS COORDENADAS DEL MAPA.

- BAJO NINGUNA CIRCUNSTANCIA debes modificar, alterar, borrar o refactorizar las ubicaciones de este archivo a menos que el USUARIO explícita y directamente te pida "cambiar las coordenadas o ubicaciones" de una ciudad.
- Si el usuario te pide "cambiar el diseño del pin", "hacer el pin más grande", "cambiar los colores", "añadir animaciones" o "cambiar la forma visual del marcador":
  **¡¡¡NO TOQUES ESTE ARCHIVO!!!**
  Los diseños de pines deben cambiarse únicamente en `css/styles.css` o en las funciones SVG de dibujo dentro de `js/main.js` (como `buildOrbMarker`).

Este archivo garantiza la "Arquitectura de Coordenadas Congeladas" para evitar que cambios de diseño rompan la precisión geográfica de las ubicaciones.
========================================================================================
*/

const locations = [
  { name: "Acacías", hq: false, left: 45.48, top: 53.75 },
  { name: "Apartadó", hq: false, left: 27.35, top: 32.09 },
  { name: "Arauca", hq: false, left: 62.49, top: 38.51 },
  { name: "Armenia", hq: false, left: 32.96, top: 50.38 },
  { name: "Barranquilla", hq: false, left: 37.46, top: 18.45 },
  { name: "Bogotá", hq: false, left: 42.75, top: 48.13 },
  { name: "Bucaramanga", hq: false, left: 49.97, top: 36.26 },
  { name: "Cajicá", hq: false, left: 45.8, top: 49.1 },
  { name: "Cali", hq: false, left: 26.87, top: 55.03 },
  { name: "Cartagena", hq: false, left: 35.53, top: 21.66 },
  { name: "Caucasia", hq: false, left: 36.81, top: 33.69 },
  { name: "Cúcuta", hq: false, left: 53.34, top: 31.13 },
  { name: "Granada", hq: false, left: 49.81, top: 55.03 },
  { name: "Ibagué", hq: false, left: 36.01, top: 52.46 },
  { name: "Ipiales", hq: false, left: 21.41, top: 68.83 },
  { name: "Magangué", hq: false, left: 42.27, top: 30.64 },
  { name: "Manizales", hq: false, left: 34.41, top: 46.85 },
  { name: "Medellín", hq: true, left: 33.12, top: 40.11 },
  { name: "Mocoa", hq: false, left: 30.56, top: 68.35 },
  { name: "Montelíbano", hq: false, left: 32.48, top: 33.69 },
  { name: "Montería", hq: false, left: 31.2, top: 28.24 },
  { name: "Monterrey (Casanare)", hq: false, left: 58.15, top: 47.97 },
  { name: "Neiva", hq: false, left: 34.25, top: 58.56 },
  { name: "Palmira", hq: false, left: 29.43, top: 52.95 },
  { name: "Pasto", hq: false, left: 20.93, top: 66.1 },
  { name: "Pereira", hq: false, left: 31.52, top: 47.01 },
  { name: "Pitalito", hq: false, left: 31.52, top: 62.09 },
  { name: "Popayán", hq: false, left: 25.58, top: 60.17 },
  { name: "Quibdó", hq: false, left: 23.98, top: 44.12 },
  { name: "San Andrés", hq: false, left: 18.84, top: 8.18 },
  { name: "Sincelejo", hq: false, left: 35.69, top: 25.51 },
  { name: "Tocancipá", hq: false, left: 44.36, top: 46.53 },
  { name: "Tumaco", hq: false, left: 14.03, top: 63.86 },
  { name: "Tunja", hq: false, left: 51.41, top: 43.64 },
  { name: "Túquerres", hq: false, left: 17.56, top: 66.42 },
  { name: "Valledupar", hq: false, left: 47.89, top: 21.18 },
  { name: "Villavicencio", hq: false, left: 54.46, top: 52.3 },
  { name: "Yopal", hq: false, left: 61.36, top: 44.28 }
];
