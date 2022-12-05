

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

type ValidCategorias = 'Acuarelas'|'Agenda escolar'|'Boligrafos'|'Calculadoras';