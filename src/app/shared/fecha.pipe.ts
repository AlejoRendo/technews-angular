import { Pipe, PipeTransform } from '@angular/core';

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

@Pipe({ name: 'fecha' })
export class FechaPipe implements PipeTransform {
  transform(iso: string): string {
    const [anio, mes, dia] = String(iso).split('-');
    if (!anio || !mes || !dia) return iso;
    return `${Number(dia)} de ${MESES[Number(mes) - 1]} de ${anio}`;
  }
}
