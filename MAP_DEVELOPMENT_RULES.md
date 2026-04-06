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

## Historial y Contexto para IA
*Este documento fue creado tras repetidos incidentes donde agentes de IA, al intentar rediseñar los pines, alteraron involuntariamente el padding y transform del contenedor .map-pin, o inyectaron un array de ciudades corrupto en main.js.* 

**Si estás leyendo esto antes de ejecutar una acción sobre el mapa, mantén estrictamente separados el componente de Datos, el componente de Estructura Cero y el componente Visual.**
