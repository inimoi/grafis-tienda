interface SeedProduct {

    descripcion: string;
    imagenes: string[];
    enStock: number;
    precio: number;
    slug: string;
    tags: string[];
    titulo: string;
    categoria: ValidCategorias;
    
}

type ValidCategorias = 'Acuarelas'|'Agenda escolar'|'Boligrafos'|'Calculadoras';

interface SeedData {
    products: SeedProduct[],
}




export const initialData: SeedData = {
    products: [
        {
            descripcion: "Acuarelas de 18 colores de la marca Jovi.",
            imagenes: [
                'Acuarelas_18_colores_fondo.jpg',
                ],
            enStock: 7,
            precio: 75,
            slug: "Acuarelas_18_colores",
            tags: ['acuarelas'],
            titulo: "Acuarelas 18 colores",
            categoria: 'Acuarelas'
        },
        
    ]
}