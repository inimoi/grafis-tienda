import type { NextApiRequest, NextApiResponse } from 'next';

import { isValidObjectId } from 'mongoose';
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';
import { v2 as cloudinary } from 'cloudinary';




type Data = 
| { message: string }
| IProduct[]
| IProduct



export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch ( req.method) {

        case 'GET':
            return getProducts( req, res);
            
        case 'PUT':

            return updateProduct( req, res );

        case 'POST':

            return createProduct( req, res );
    
        default:
            res.status(400).json({ message: 'Bad Request' })
            
    }
         
    
}



const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    await db.connect();

    const products = await Product.find()
        .sort({ title: 'asc'})
        .lean();

    await db.disconnect();


   //un processamiento delas imagenes cuando las subamos al server
   const updatedProducts = products.map( product => {
    product.imagenes = product.imagenes.map( image => {
        return image
    })
    
    return product;
})


    res.status(200).json( updatedProducts );

}


//actualizacion de producto
const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    //validaciones 
    const { _id= '', imagenes = [] } = req.body as IProduct;

    if ( !isValidObjectId( _id ) ) {
        return res.status(400).json({ message:'El id del produto no es válido'})
    }

    if ( imagenes.length < 1) {
        return res.status(400).json({ message: 'Es necesario al menos una imagen'})
    }

    //TODO: posiblemente tendremos un localhost:3000/asss.jpg


    try {
        await db.connect();

        const product = await Product.findById(_id);

        if( !product ) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe un producto con esa ID'})
        }

        //eliminar foto en cloudinary
        product.imagenes.forEach( async( image ) => {
            //si la imagen que viene no está incluida en el array de imagenes, es que la hemos borrado y por lo tanto también lo podemos hacer de cloudinary
            if ( !imagenes.includes( image )) {
                //el substring lo hac empezando desde el final hast el primer / y luego losubdivide lo uqe este separado por el titulo. Dos partes. feleId y la extension
                const [ fileId, extension ] = image.substring( image.lastIndexOf('/')+ 1).split('.');  
                //para borrar en cloudinary hay que indicarle el fileId
                await cloudinary.uploader.destroy( fileId );
            }
        })

        
        
        await product.update( req.body );

        await db.disconnect();

        return res.status(200).json( product);


    } catch (error) {
        

        await db.disconnect();

        return res.status(400).json({ message: 'Revisar la consola del servidor'});
    }
}

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { imagenes = []} = req.body as IProduct;
    
    if ( imagenes.length < 1 ){
        return res.status(400).json({ message: 'El producto necesita al menos un producto'});
    }

     //TODO: posiblemente tendremos un localhost:3000/asss.jpg

     try {
        await db.connect();

        //vali¡dacion paar que el slug sea unico
        const productInDB = await Product.findOne({ slug: req.body.slug });
        if ( productInDB ) {
            await db.disconnect();
            return res.status(400).json({ message: 'Ya existe un producto con ese slug' });
        }

        //creamos el nuevo producto
        const product = new Product( req.body );

        //guardamos el nuevo producto en la BD
        await product.save();

        await db.disconnect();
        
        return res.status(201).json( product );

     } catch (error) {
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor'});
     }

}

