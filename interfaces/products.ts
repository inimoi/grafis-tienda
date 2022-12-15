

export interface IProduct {
    _id: string;
    descripcion: string;
    imagenes: string[];
    enStock: number;
    precio: number;
    slug: string;
    tags: string[];
    titulo: string;
    categoria: ValidCategorias;

    //TODO agregar createdAt y updatedAt
    createdAt: string;
    updatedAt: string;
}

type ValidCategorias = 'Acuarelas'|'Agenda escolar'|'Boligrafos'|'Calculadoras'|'Carpetas'|'Ceras'|'Cinta Dymo'|'Compases'|'Correctores'|'Dossiers'|'Edding'|'Estuches'|'Forro libros'|'Fundas'|'Gomas de borrar'|'Grapadoras'|'Lapices'|'Libretas'|'Marcadores'|'Minas'|'Pegamentos'|'Pendrive'|'Plastilina'|'Porta planos'|'Reglas'|'Resmilleria'|'Roller pilot'|'Rotuladores'|'Sacapuntas'|'Talonarios'|'Tarifarios'|'Tijeras';