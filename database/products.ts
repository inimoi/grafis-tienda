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
                'Acuarelas_18_colores_fondo.png',
                ],
            enStock: 7,
            precio: 75,
            slug: "acuarelas_18_colores",
            tags: ['acuarelas'],
            titulo: "Acuarelas 18 colores",
            categoria: 'Acuarelas'
        },
        {
            descripcion: "Agenda escolar mediana A5, semana vista de color rojo",
            imagenes: [
                'Agenda_A5_Semana_vista_Roja_fondo.png',
                ],
            enStock: 7,
            precio: 75,
            slug: "agenda_A5_semana_vista_Roja",
            tags: ['agenda escolar'],
            titulo: "Agenda A5 Semana vista Roja",
            categoria: 'Agenda escolar'
        },
        {
            descripcion: "Agenda escolar pequeña, semana vista de color rojo",
            imagenes: [
                'Agenda_Semana_Vista_roja_fondo.png',
                ],
            enStock: 7,
            precio: 75,
            slug: "agenda_semana_Vista_roja",
            tags: ['agenda escolar'],
            titulo: "Agenda pequeña Semana Vista roja",
            categoria: 'Agenda escolar'
        },
        {
            descripcion: "Calculadora modelo Casio fx-991SPX11 ideal para tus hijos",
            imagenes: [
                'Calculadora_Casio_fx-991SPX11_fondo.png',
                ],
            enStock: 7,
            precio: 75,
            slug: "calculadora_casio_fx-991SPX11",
            tags: ['calculadoras'],
            titulo: "Calculadora modelo Casio fx-991SPX11",
            categoria: 'Calculadoras'
        },
        {
            descripcion: "Acuarelas de 12 colores de la marca Jovi.",
            imagenes: [
                'Acuarelas_12_colores_fondo.png',
                ],
            enStock: 7,
            precio: 75,
            slug: "acuarelas_12_colores",
            tags: ['acuarelas'],
            titulo: "Acuarelas 12 colores",
            categoria: 'Acuarelas'
        },
        {
            descripcion: "Agenda escolar mediana A5, semana vista de color azul",
            imagenes: [
                'Agenda_A5_Semana_vista_azul_fondo.png',
                ],
            enStock: 7,
            precio: 75,
            slug: "agenda_A5_semana_vista_azul",
            tags: ['agenda escolar'],
            titulo: "Agenda A5 Semana vista azul",
            categoria: 'Agenda escolar'
        },
        {
            descripcion: "Agenda escolar pequeña, semana vista de color azul",
            imagenes: [
                'Agenda_Semana_vista_azul_fondo.png',
                ],
            enStock: 7,
            precio: 75,
            slug: "agenda_semana_vista_azul",
            tags: ['agenda escolar'],
            titulo: "Agenda pequeña Semana vista azul",
            categoria: 'Agenda escolar'
        },
        {
            descripcion: "Calculadora modelo Casio Fx-82SPxII ideal para tus hijos",
            imagenes: [
                'Calculadora_Casio_Fx-82SPxII_fondo.png',
                ],
            enStock: 7,
            precio: 75,
            slug: "calculadora_casio_Fx-82SPxII",
            tags: ['calculadoras'],
            titulo: "Calculadora modelo Casio Fx-82SPxII",
            categoria: 'Calculadoras'
        },
        {
            descripcion: "Acuarelas de 24 colores de la marca Jovi.",
            imagenes: [
                'Acuarelas_24_colores_fondo.png',
                ],
            enStock: 7,
            precio: 75,
            slug: "Acuarelas_24_colores_fondo",
            tags: ['acuarelas'],
            titulo: "Acuarelas 24 colores",
            categoria: 'Acuarelas'
        },
        {
            descripcion: "Agenda escolar mediana A5, semana vista de color negra",
            imagenes: [
                'Agenda_A5_Semana_vista_negra_fondo.png',
                ],
            enStock: 7,
            precio: 75,
            slug: "agenda_A5_semana_vista_negra_fondo",
            tags: ['agenda escolar'],
            titulo: "Agenda A5 Semana vista negra",
            categoria: 'Agenda escolar'
        },
        {
            descripcion: "Agenda escolar pequeña, semana vista de color negra",
            imagenes: [
                'Agenda_Semana_Vista_negra_fondo.png',
                ],
            enStock: 7,
            precio: 75,
            slug: "agenda_semana_vista_negra",
            tags: ['agenda escolar'],
            titulo: "Agenda pequeña Semana Vista negra",
            categoria: 'Agenda escolar'
        },
        {
            descripcion: "Calculadora modelo Casio Fx-82MS ideal para tus hijos",
            imagenes: [
                'Calculadora_Casio_Fx-82MS_fondo.png',
                ],
            enStock: 7,
            precio: 75,
            slug: "calculadora_casio_Fx-82MS",
            tags: ['calculadoras'],
            titulo: "Calculadora  modelo Casio Fx-82MS",
            categoria: 'Calculadoras'
        },
        
    ]
}