# TechNews

Plataforma web de noticias tipo periódico digital, desarrollada con Angular.
Permite explorar noticias por categoría, consultar su detalle, guardarlas como
favoritas, gestionarlas y contactar con la redacción.

Proyecto académico del módulo Desarrollo de Front-end — Institución Universitaria
Politécnico Grancolombiano.

## Tecnologías

- Angular 22 con componentes standalone
- TypeScript
- Enrutador de Angular con parámetros de ruta
- Formularios reactivos con validadores
- CSS3 con propiedades personalizadas
- localStorage para persistencia

## Cómo ejecutar

```bash
npm install
npm start
```

La aplicación queda disponible en `http://localhost:4200`.

## Estructura

```
src/app/
├─ models/        Interfaces y tipos del dominio
├─ data/          Catálogo inicial de noticias
├─ services/      Almacenamiento, noticias y favoritos
├─ shared/        Encabezado, pie, tarjeta, estado vacío y pipe de fecha
└─ pages/         Un componente por vista
```

## Vistas

| Ruta | Descripción |
|---|---|
| `/` | Bienvenida, noticias destacadas y llamados a la acción |
| `/noticias` | Catálogo completo filtrable por categoría |
| `/noticia/:id` | Contenido íntegro y acción de guardar en favoritos |
| `/favoritos` | Listado personal persistente en el navegador |
| `/gestionar` | Alta y baja de noticias con confirmación |
| `/contacto` | Formulario con validación de campos y de correo |

## Persistencia

Los datos del usuario se guardan en `localStorage` bajo tres claves:

- `technews.favoritos` — identificadores de las noticias marcadas
- `technews.noticias.usuario` — noticias creadas desde la vista de gestión
- `technews.noticias.eliminadas` — identificadores del catálogo inicial eliminados

El catálogo inicial reside en el código y no se copia al almacenamiento: en cada
consulta se combina con los cambios del usuario.

## Despliegue

```bash
npm run build:pages
```

Genera la compilación con la ruta base del repositorio y añade `404.html`, que
permite al enrutador resolver la navegación directa en GitHub Pages.

## Autor

Jhony Alejandro Grisales Rendón
