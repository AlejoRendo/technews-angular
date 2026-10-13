const fs = require('fs');
const path = require('path');

const SALIDA = path.join(__dirname, '..', 'dist', 'technews-angular', 'browser');

// GitHub Pages sirve 404.html ante rutas que no son archivos; al ser una copia
// del index, el enrutador de Angular resuelve la navegación directa.
fs.copyFileSync(path.join(SALIDA, 'index.html'), path.join(SALIDA, '404.html'));

// Evita que Jekyll descarte los archivos que empiezan por guion bajo.
fs.writeFileSync(path.join(SALIDA, '.nojekyll'), '');

console.log('404.html y .nojekyll generados en', SALIDA);
