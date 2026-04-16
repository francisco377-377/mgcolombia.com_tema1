const fs = require('fs');
const path = require('path');

const domain = 'https://mundogeneticocolombia.com/';
const cities = [
  "medellin", "acacias", "apartado", "arauca", "armenia", "barranquilla", "bogota", "bucaramanga", "cajica", "cali", "cartagena", "caucasia", "cucuta", "duitama", "granada", "ibague", "ipiales", "magangue", "manizales", "mocoa", "montelibano", "monteria", "monterrey", "neiva", "palmira", "pasto", "pereira", "pitalito", "popayan", "quibdo", "san-andres", "sincelejo", "tocancipa", "tumaco", "tunja", "tuquerres", "valledupar", "villavicencio", "yopal"
];

const servicePages = [
  "pruebas-de-paternidad/",
  "pruebas-de-paternidad-anonima/",
  "pruebas-de-paternidad-prenatal/",
  "pruebas-de-consanguinidad/",
  "servicio-a-domicilio/",
  "contactenos/"
];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${domain}</loc>
        <priority>1.00</priority>
    </url>\n`;

// Add Service Pages
servicePages.forEach(page => {
    sitemap += `    <url>
        <loc>${domain}${page}</loc>
        <priority>0.80</priority>
    </url>\n`;
});

// Add City Pages
cities.forEach(slug => {
    sitemap += `    <url>
        <loc>${domain}ciudad/${slug}/</loc>
        <priority>0.70</priority>
    </url>\n`;
});

sitemap += `</urlset>`;

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap);
console.log('✓ sitemap.xml generado con éxito.');
