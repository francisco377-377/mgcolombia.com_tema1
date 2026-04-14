# Reglas de Desarrollo: Mapa de Cobertura

Este documento establece las directrices arquitectónicas inquebrantables para cualquier edición (humana o mediante Inteligencia Artificial) relacionada con el mapa interactivo de cobertura.

**Objetivo**: Evitar permanentemente que cambios cosméticos o de diseño destruyan la alineación geográfica de los pines (problema histórico del repositorio).

## 1. Coordenadas Congeladas (Data)
*   **Fuente Única de Verdad**: El archivo `js/map-data.js` centraliza el array `locations` con las coordenadas exactas (`left` y `top`) de las 38 ciudades calibradas.
*   **Regla**: ¡Este archivo es de **SOLO LECTURA**! Ninguna IA debe modificar este archivo o añadir ciudades hardcodeadas en `main.js` a menos que el usuario proporcione un nuevo conjunto de coordenadas generadas desde `calibrate.html`.

## 2. Anclaje Cero (Estructura)
*   **La Clase Principal**: En `css/styles.css`, la clase contenedora `.map-pin` tiene obligatoriamente `width: 0; height: 0; transform: translate(-50%, -50%);`.
*   **El Concepto**: El contenedor *no tiene dimensiones*. Representa matemáticamente el punto geométrico de la ciudad.
*   **Regla**: ¡NUNCA agregues `width`, `height`, `padding` o `margin` a `.map-pin`! Hacerlo desplazaría el centro geométrico del contenedor rompiendo la coordenada.

## 3. Modificaciones de Diseño (Visuales)
*   **Flujo de Trabajo**: Si se solicita "crear un pin nuevo", "cambiar al estilo gota", "hacerlo 3D" o cualquier alteración visual, todo el diseño debe aplicarse a **los hijos** del anclaje (por ejemplo, el `<svg>` generado en `main.js`).
*   **Dimensionamiento**: Como el componente padre está centrado, el SVG debe administrarse centrado asumiendo que `0,0` es el ancla. 
*   **Eventos**: Dado que el ancla tiene `pointer-events: none` (para evitar colisiones), los eventos de `hover` e interacción los capta el propio SVG interno (`pointer-events: all; cursor: pointer;`).

## 4. Backup de Seguridad (Snapshot Final)

A continuación se presenta el snapshot exacto de las coordenadas finales calibradas al 2026-04-07. Si el archivo `js/map-data.js` se corrompe o se pierde, esta es la referencia manual obligatoria.

```javascript
/* SNAPSHOT FINAL - COORDENADAS CONGELADAS MUNDO GENÉTICO */
const locations = [
  { name: "Medellín", hq: true, left: 33.62, top: 41.11 },
  { name: "Acacías", hq: false, left: 45.48, top: 53.75 },
  { name: "Apartadó", hq: false, left: 27.35, top: 32.09 },
  { name: "Arauca", hq: false, left: 62.49, top: 39.61 },
  { name: "Armenia", hq: false, left: 33.30, top: 51.10 },
  { name: "Barranquilla", hq: false, left: 37.46, top: 18.45 },
  { name: "Bogotá", hq: false, left: 42.75, top: 48.13 },
  { name: "Bucaramanga", hq: false, left: 49.97, top: 36.26 },
  { name: "Cajicá", hq: false, left: 45.8, top: 49.1 },
  { name: "Cali", hq: false, left: 26.87, top: 55.03 },
  { name: "Cartagena", hq: false, left: 35.53, top: 21.66 },
  { name: "Caucasia", hq: false, left: 36.81, top: 33.69 },
  { name: "Cúcuta", hq: false, left: 53.04, top: 31.13 },
  { name: "Granada", hq: false, left: 49.81, top: 55.03 },
  { name: "Ibagué", hq: false, left: 37.01, top: 53.46 },
  { name: "Ipiales", hq: false, left: 21.41, top: 68.83 },
  { name: "Magangué", hq: false, left: 42.27, top: 30.64 },
  { name: "Manizales", hq: false, left: 34.41, top: 46.85 },
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
  { name: "San Andrés", hq: false, left: 14.40, top: 15.00 },
  { name: "Sincelejo", hq: false, left: 35.69, top: 25.51 },
  { name: "Tocancipá", hq: false, left: 44.36, top: 46.53 },
  { name: "Tumaco", hq: false, left: 14.03, top: 63.86 },
  { name: "Tunja", hq: false, left: 51.41, top: 43.64 },
  { name: "Túquerres", hq: false, left: 17.56, top: 66.42 },
  { name: "Valledupar", hq: false, left: 47.89, top: 21.18 },
  { name: "Villavicencio", hq: false, left: 54.46, top: 52.3 },
  { name: "Yopal", hq: false, left: 61.36, top: 44.28 }
];
```

## Historial y Contexto para IA
*Este documento fue creado tras repetidos incidentes donde agentes de IA, al intentar rediseñar los pines, alteraron involuntariamente el padding y transform del contenedor .map-pin, o inyectaron un array de ciudades corrupto en main.js.* 

**Si estás leyendo esto antes de ejecutar una acción sobre el mapa, mantén estrictamente separados el componente de Datos, el componente de Estructura Cero y el componente Visual.**

## 5. REGLAS DE DESPLIEGUE Y SERVIDORES (DANGER)
*   **Ruta Obligatoria y Absoluta**: En `.github/workflows/deploy.yml`, el parámetro de `server-dir` DEBE SER EXACTAMENTE Y SIEMPRE: `/mundogeneticocolombia.com/public_html/`.
*   **El Motivo Técnico**: Dado que SiteGround a veces estructura los directorios enjaulando a los usuarios FTP, el uso de rutas relativas o atajos (como `./` o `/public_html/`) ha ocasionado que se generen carpetas infinitas redundantes o que el sistema rompa con Error 403.
*   **La Orden para la IA**: Está terminantemente **PROHIBIDO** editar la ruta de `server-dir` a menos que recibas una orden expresa y explícita del humano citando textualmente "Cambio de configuración de servidor". Si ves un fallo en despliegue, **NO BUSQUES ALTERAR LA RUTA COMO PRIMERA OPCIÓN DE REPARACIÓN**.
