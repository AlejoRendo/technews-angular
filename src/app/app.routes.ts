import { Routes } from '@angular/router';
import { ContactoComponent } from './pages/contacto/contacto';
import { DetalleComponent } from './pages/detalle/detalle';
import { FavoritosComponent } from './pages/favoritos/favoritos';
import { GestionarComponent } from './pages/gestionar/gestionar';
import { HomeComponent } from './pages/home/home';
import { NoEncontradaComponent } from './pages/no-encontrada/no-encontrada';
import { NoticiasComponent } from './pages/noticias/noticias';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'TechNews | Inicio' },
  { path: 'noticias', component: NoticiasComponent, title: 'TechNews | Noticias' },
  { path: 'noticia/:id', component: DetalleComponent },
  { path: 'favoritos', component: FavoritosComponent, title: 'TechNews | Favoritos' },
  { path: 'gestionar', component: GestionarComponent, title: 'TechNews | Gestionar noticias' },
  { path: 'contacto', component: ContactoComponent, title: 'TechNews | Contacto' },
  { path: '**', component: NoEncontradaComponent, title: 'TechNews | Página no encontrada' }
];
