const fs = require('fs');
const path = require('path');
const cities = ['medellin', 'acacias', 'apartado', 'arauca', 'armenia', 'barranquilla', 'bogota', 'bucaramanga', 'cajica', 'cali', 'cartagena', 'caucasia', 'cucuta', 'granada', 'ibague', 'ipiales', 'magangue', 'manizales', 'mocoa', 'montelibano', 'monteria', 'monterrey', 'neiva', 'palmira', 'pasto', 'pereira', 'pitalito', 'popayan', 'quibdo', 'san-andres', 'sincelejo', 'tocancipa', 'tumaco', 'tunja', 'tuquerres', 'valledupar', 'villavicencio', 'yopal'];
const rootDir = 'c:/Raiz/PaginasWeb_IA/mgcolombia.com_tema1';
for (let c of cities) {
   let p = path.join(rootDir, c);
   if (fs.existsSync(p)) fs.rmSync(p, {recursive:true, force:true});
}

// Ensure the subpages have their mega menus fixed too
const folders = ['pruebas-de-paternidad', 'pruebas-de-paternidad-anonima', 'pruebas-de-paternidad-prenatal', 'pruebas-de-consanguinidad', 'servicio-a-domicilio', 'contactenos'];
for (let f of folders) {
   let fp = path.join(rootDir, f, 'index.html');
   if (fs.existsSync(fp)) {
       let html = fs.readFileSync(fp, 'utf8');
       for (let city of cities) {
           html = html.split('href="../' + city + '/"').join('href="../ciudades/' + city + '/"');
       }
       fs.writeFileSync(fp, html);
   }
}
console.log("Cleanup and update DONE");
