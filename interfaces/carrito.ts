

export interface ICarritoProduct {
    _id: string;
    image: string;
    precio: number;
    slug: string;
    titulo: string;
    categoria: ValidCategorias;
    cantidad: number;

   
}

type ValidCategorias = 'Acuarelas'|'Agenda escolar'|'Boligrafos'|'Calculadoras'|'Carpetas'|'Ceras'|'Cinta Dymo'|'Compases'|'Correctores'|'Dossiers'|'Edding'|'Estuches'|'Forro libros'|'Fundas'|'Gomas de borrar'|'Grapadoras'|'Lapices'|'Libretas'|'Marcadores'|'Minas'|'Pegamentos'|'Pendrive'|'Plastilina'|'Porta planos'|'Reglas'|'Resmilleria'|'Roller pilot'|'Rotuladores'|'Sacapuntas'|'Talonarios'|'Tarifarios'|'Tijeras';