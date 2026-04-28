const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'template-city.html');
const template = fs.readFileSync(templatePath, 'utf8');

const cities = [
  { name: "Medellín", slug: "medellin", hq: true, delivery: "1 a 2 días hábiles", waNumber: "573503189981", waDisplay: "350 318 99 81" },
  { name: "Acacías", slug: "acacias", delivery: "5 a 6 días hábiles" },
  { name: "Apartadó", slug: "apartado", delivery: "5 a 6 días hábiles" },
  { name: "Arauca", slug: "arauca", delivery: "5 a 6 días hábiles" },
  { name: "Armenia", slug: "armenia", delivery: "5 a 6 días hábiles" },
  { name: "Barranquilla", slug: "barranquilla", delivery: "3 a 5 días hábiles" },
  { name: "Bogotá", slug: "bogota", delivery: "5 a 6 días hábiles" },
  { name: "Bucaramanga", slug: "bucaramanga", delivery: "5 a 6 días hábiles", waNumber: "573503189981", waDisplay: "350 318 99 81" },
  { name: "Cajicá", slug: "cajica", delivery: "5 a 6 días hábiles" },
  { name: "Cali", slug: "cali", delivery: "5 a 6 días hábiles", waNumber: "573503189981", waDisplay: "350 318 99 81" },
  { name: "Cartagena", slug: "cartagena", delivery: "5 a 6 días hábiles" },
  { name: "Caucasia", slug: "caucasia", delivery: "5 a 6 días hábiles" },
  { name: "Cúcuta", slug: "cucuta", delivery: "5 a 6 días hábiles", waNumber: "573503189981", waDisplay: "350 318 99 81" },
  { name: "Duitama", slug: "duitama", delivery: "5 a 6 días hábiles" },
  { name: "Granada", slug: "granada", delivery: "5 a 6 días hábiles" },
  { name: "Ibagué", slug: "ibague", delivery: "5 a 6 días hábiles" },
  { name: "Ipiales", slug: "ipiales", delivery: "5 a 6 días hábiles" },
  { name: "Magangué", slug: "magangue", delivery: "5 a 6 días hábiles" },
  { name: "Manizales", slug: "manizales", delivery: "5 a 6 días hábiles" },
  { name: "Mocoa", slug: "mocoa", delivery: "5 a 6 días hábiles" },
  { name: "Montelíbano", slug: "montelibano", delivery: "5 a 6 días hábiles" },
  { name: "Montería", slug: "monteria", delivery: "5 a 6 días hábiles" },
  { name: "Monterrey", slug: "monterrey", delivery: "5 a 6 días hábiles" },
  { name: "Neiva", slug: "neiva", delivery: "5 a 6 días hábiles" },
  { name: "Palmira", slug: "palmira", delivery: "5 a 6 días hábiles" },
  { name: "Pasto", slug: "pasto", delivery: "5 a 6 días hábiles", waNumber: "573503189981", waDisplay: "350 318 99 81" },
  { name: "Pereira", slug: "pereira", delivery: "5 a 6 días hábiles", waNumber: "573503189981", waDisplay: "350 318 99 81" },
  { name: "Pitalito", slug: "pitalito", delivery: "5 a 6 días hábiles" },
  { name: "Popayán", slug: "popayan", delivery: "5 a 6 días hábiles" },
  { name: "Quibdó", slug: "quibdo", delivery: "5 a 6 días hábiles" },
  { name: "San Andrés", slug: "san-andres", delivery: "5 a 7 días hábiles" },
  { name: "Sincelejo", slug: "sincelejo", delivery: "5 a 6 días hábiles" },
  { name: "Tocancipá", slug: "tocancipa", delivery: "5 a 6 días hábiles" },
  { name: "Tumaco", slug: "tumaco", delivery: "5 a 6 días hábiles" },
  { name: "Tunja", slug: "tunja", delivery: "5 a 6 días hábiles" },
  { name: "Túquerres", slug: "tuquerres", delivery: "5 a 6 días hábiles" },
  { name: "Valledupar", slug: "valledupar", delivery: "5 a 6 días hábiles" },
  { name: "Villavicencio", slug: "villavicencio", delivery: "5 a 6 días hábiles" },
  { name: "Yopal", slug: "yopal", delivery: "5 a 6 días hábiles" }
];

cities.forEach(city => {
    const baseDir = path.join(__dirname, 'ciudad');
    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir);
    }
    const cityDir = path.join(baseDir, city.slug);
    if (!fs.existsSync(cityDir)) {
        fs.mkdirSync(cityDir);
    }

    // Dynamic strings
    const pageTitle = `Pruebas de ADN en ${city.name} | Certeza y Precisión 99.99%`;
    const heroTitle = `Encuentra la tranquilidad<br>y certeza que necesitas<br>con una prueba de ADN<br>precisa, segura y confiable<br>en <span style="color: #25D366;">${city.name}</span>`;
    const heroSubtitle = `Resultados con precisión superior al 99.999% y respaldo científico de más de 24 años de experiencia. Toma de muestras profesionales en <strong>${city.name}</strong>.`;
    const waNumber = city.waNumber || "573003095039";
    const waDisplay = city.waDisplay || "300 309 50 39";
    const waMessage = "Hola, me gustaría recibir más información y asesoría.";

    let content = template;
    content = content.replace(/{{PAGE_TITLE}}/g, pageTitle);
    content = content.replace(/{{CITY_NAME}}/g, city.name);
    content = content.replace(/{{CITY_SLUG}}/g, city.slug);
    content = content.replace(/{{HERO_TITLE}}/g, heroTitle);
    content = content.replace(/{{HERO_SUBTITLE}}/g, heroSubtitle);
    content = content.replace(/{{WHATSAPP_NUMBER}}/g, waNumber);
    content = content.replace(/{{WHATSAPP_DISPLAY}}/g, waDisplay);
    content = content.replace(/{{WHATSAPP_MESSAGE}}/g, encodeURIComponent(waMessage));
    content = content.replace(/{{DELIVERY_TIME}}/g, city.delivery);

    fs.writeFileSync(path.join(cityDir, 'index.html'), content);
    console.log(`✓ Generada: ${city.name} (${city.slug}) en /ciudad/`);
});

console.log(`\n¡Listo! Se han generado ${cities.length} landing pages dentro de la carpeta 'ciudad'.`);
