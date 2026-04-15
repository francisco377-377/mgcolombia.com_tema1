const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Raiz/PaginasWeb_IA/mgcolombia.com_tema1';
const indexPath = path.join(rootDir, 'index.html');
const templatePath = path.join(rootDir, 'template-city.html');

let html = fs.readFileSync(indexPath, 'utf8');

// 1. Update relative resource paths to go up 2 levels (since they will be in /ciudad/[slug]/)
html = html.replace(/href="assets\//g, 'href="../../assets/');
html = html.replace(/src="assets\//g, 'src="../../assets/');
html = html.replace(/href="css\//g, 'href="../../css/');
html = html.replace(/href="js\//g, 'href="../../js/');
html = html.replace(/href="pruebas-/g, 'href="../../pruebas-');
html = html.replace(/href="servicio-a-/g, 'href="../../servicio-a-');
html = html.replace(/href="contactenos\//g, 'href="../../contactenos/');
html = html.replace(/src="js\//g, 'src="../../js/');

// Mega menu ciudad-a-ciudad: desde /ciudad/bogota/ → ../medellin/
// index.html usa href="ciudad/medellin/" → en city pages debe ser href="../medellin/"
html = html.replace(/href="ciudad\//g, 'href="../');

// specifically update href="# anchors to jump to root if needed, wait! Actually if they click an anchor inside the city page, it should scroll down the CITY page!
// So href="#inicio" should REMAIN href="#inicio" because the page is identical and has those sections!
// Except the nav links! If they are on /ciudad/medellin/ and click href="#inicio", the browser scrolls down. This is perfect! 
// No need to change href="#"!

// 2. SEO & META REPLACEMENTS
html = html.replace(
    '<title>Mundo Genético | Certeza y Precisión en Pruebas de ADN</title>', 
    '<title>{{PAGE_TITLE}}</title>'
);
html = html.replace(
    '<meta name="description" content="Sal de la duda con una prueba de ADN con precisión superior al 99.99%. Laboratorio Genes SAS con más de 24 años de experiencia física y jurídica.">',
    '<meta name="description" content="Sal de la duda con una prueba de ADN en {{CITY_NAME}} con precisión superior al 99.99%. Laboratorio Genes SAS con más de 24 años de experiencia física y jurídica.">'
);
html = html.replace(
    '<meta property="og:title" content="Mundo Genético | Certeza y Precisión en Pruebas de ADN">',
    '<meta property="og:title" content="{{PAGE_TITLE}}">'
);
html = html.replace(
    '<meta property="og:description" content="Pruebas de paternidad discretas y 100% seguras. Solicita tu asesoría gratuita.">',
    '<meta property="og:description" content="Pruebas de paternidad en {{CITY_NAME}} discretas y 100% seguras. Solicita tu asesoría gratuita.">'
);
html = html.replace(
    '<meta property="og:url" content="https://mundogeneticocolombia.com/ventasexamendepaternidad/">',
    '<meta property="og:url" content="https://mundogeneticocolombia.com/ciudad/{{CITY_SLUG}}/">'
);

// 3. HERO SECTION REPLACEMENTS
// Replace the H1 block completely
html = html.replace(
    /<h1 class="hero-title text-white"[\s\S]*?<\/h1>/,
    '<h1 class="hero-title text-white" style="text-shadow: 0 4px 20px rgba(0,0,0,0.8); text-wrap: balance;">{{HERO_TITLE}}</h1>'
);
// Replace the Subtitle completely
html = html.replace(
    /<p class="hero-subtitle text-white"[\s\S]*?<\/p>/,
    '<p class="hero-subtitle text-white" style="text-shadow: 0 2px 10px rgba(0,0,0,0.8);">{{HERO_SUBTITLE}}</p>'
);

// 4. WHATSAPP REPLACEMENTS
// Replace all whatsapp button links with the dynamic variables
// Match exactly: href="https://api.whatsapp.com/send/?phone=573003095039&text=Hola%2C+me+gustar%C3%ADa+recibir+m%C3%A1s+informaci%C3%B3n+y+asesor%C3%ADa.&type=phone_number&app_absent=0"
// Or broadly just replace the whole URL
html = html.replace(
    /https:\/\/api\.whatsapp\.com\/send\/\?phone=[^"']+/g, 
    'https://api.whatsapp.com/send/?phone={{WHATSAPP_NUMBER}}&text={{WHATSAPP_MESSAGE}}'
);

// 5. CITY SPECIFIC TWEAKS inside body
// Under the header "Área comercial y de ventas del"
html = html.replace(
    '<span class="tagline-top">Área comercial y de ventas del</span>',
    '<span class="tagline-top">Atención y Toma de muestras en <strong>{{CITY_NAME}}</strong></span>'
);

// In the transparency section, lets add delivery time just to use the variable
html = html.replace(
    'En pocas palabras, con estas pruebas se busca establecer si un hombre es el padre biológico de un individuo.',
    'En pocas palabras, con estas pruebas se busca establecer si un hombre es el padre biológico de un individuo. <strong>Entrega de resultados en {{DELIVERY_TIME}} para {{CITY_NAME}}.</strong>'
);

fs.writeFileSync(templatePath, html, 'utf8');
console.log("template-city.html has been successfully rebuilt identical to index.html with dynamic variables.");
