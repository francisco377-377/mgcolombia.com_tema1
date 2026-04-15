const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Raiz/PaginasWeb_IA/mgcolombia.com_tema1';

// Rename the physical directory if it exists
const oldDir = path.join(rootDir, 'ciudades');
const newDir = path.join(rootDir, 'ciudad');
if (fs.existsSync(oldDir)) {
    fs.renameSync(oldDir, newDir);
    console.log("Renamed 'ciudades' folder to 'ciudad'");
}

// 1. Update generate_cities.js
const pGen = path.join(rootDir, 'generate_cities.js');
if (fs.existsSync(pGen)) {
    let script = fs.readFileSync(pGen, 'utf8');
    script = script.split("'ciudades'").join("'ciudad'");
    script = script.split("/ciudades/").join("/ciudad/");
    fs.writeFileSync(pGen, script);
}

// 2. Update template-city.html
const pTemplate = path.join(rootDir, 'template-city.html');
if (fs.existsSync(pTemplate)) {
    let html = fs.readFileSync(pTemplate, 'utf8');
    html = html.split("/ciudades/").join("/ciudad/");
    fs.writeFileSync(pTemplate, html);
}

// 3. Update all folders with index.html that might have links
const folders = [
    '', // stands for index.html at root
    'pruebas-de-paternidad',
    'pruebas-de-paternidad-anonima',
    'pruebas-de-paternidad-prenatal',
    'pruebas-de-consanguinidad',
    'servicio-a-domicilio',
    'contactenos'
];

for (let folder of folders) {
    const pHTML = path.join(rootDir, folder, 'index.html');
    if (fs.existsSync(pHTML)) {
        let content = fs.readFileSync(pHTML, 'utf8');
        content = content.split("/ciudades/").join("/ciudad/"); // covers absolute /ciudades/medellin/
        content = content.split("../ciudades/").join("../ciudad/"); // covers relative ../ciudades/medellin/
        fs.writeFileSync(pHTML, content);
        console.log(`Updated paths in ${folder || 'root'}/index.html`);
    }
}

// Also update the ones generated inside the new 'ciudad' folder itself, just in case! 
// Wait, they are overwritten by generate_cities.js anyway when run, but let's update their template-derived files too.
// Actually, it's safer to just re-run generate_cities.js after this node script, so we don't have to worry about them!
// We'll run `node generate_cities.js` in the next command.

console.log("URL string updates DONE");
