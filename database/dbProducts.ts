import { db } from "."
import { IProduct } from "../interfaces";
import { Product } from "../models"


export const getProductBySlug = async (slug: string): Promise<IProduct | null> => {

    await db.connect()

    const product = await Product.findOne({ slug }).lean();
    
    await db.disconnect()

    if (!product) {
        return null
    }


    //un processamiento delas imagenes cuando las subamos al server
    product.imagenes = product.imagenes.map( image => {
        return image
    })
    

    return JSON.parse(JSON.stringify( product ))
}

interface ProductSlug {
    slug: string
}

export const getAllProductBySlug = async (): Promise<ProductSlug[]> => {
    await db.connect();

    const slugs = await Product.find().select( 'slug -_id' ).lean();

    await db.disconnect();


    return slugs
}

export const getProductByTerm = async ( term: string): Promise<IProduct[]> => {

    term = term.toString().toLowerCase();

    await db.connect();

    const products = await Product.find({
        $text: { $search: term }
    })
    .select('titulo imagenes precio enStock slug -_id')
    .lean();

    await db.disconnect();

    //un processamiento delas imagenes cuando las subamos al server
    const updatedProducts = products.map( product => {
        product.imagenes = product.imagenes.map( image => {
            return image
        })
        
        return product;
    })


    return updatedProducts;
}


export const getAllProducts = async ():Promise<IProduct[]> => {
    await db.connect();

    const products = await Product.find().lean();

    await db.disconnect();

    //un processamiento delas imagenes cuando las subamos al server
    const updatedProducts = products.map( product => {
        product.imagenes = product.imagenes.map( image => {
            return image
        })
        
        return product;
    })

    return JSON.parse(JSON.stringify( updatedProducts ))

}