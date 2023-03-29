import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';   //esto es propio de node
import { v2 as cloudinary } from 'cloudinary';

//configuración de la variable de entorno de cloudinary
cloudinary.config(process.env.CLOUDINARY_URL || '' );


type Data = {
    message: string
}

//le decimos a next que los archivos no se tienen que serailizar
export const config = {
    api: {
        bodyParser: false,
    }
}


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    
    switch ( req.method) {
        case 'POST':
            
            return uploadFile( req, res );
    
        default:
            res.status(400).json({ message: 'Bad request'});
    }
}

//funcion para ver donde guardamos los archivos, los sube de uno en uno
const saveFile = async ( file: formidable.File ):Promise<string> => {

    /* //primera opcion, guardar en nuestro file system

    //los archivos una vez seleccionados se guardan en una carpeta temporal cn el filepath accdemos al path de dicho archivo
    const data = fs.readFileSync( file.filepath );  

    //ahora realizamos la lectura en movimiento dee se archivo a una carpeta física
    fs.writeFileSync(`./public/${ file.originalFilename }`, data )

    //borra los archivos temporales
    fs.unlinkSync( file.filepath );

    return; */


    //segunda opcion, subir archivos a cloudinary

    const { secure_url } = await cloudinary.uploader.upload( file.filepath );
    
    return secure_url;


}



//para parsear los archivos
const parseFiles = async (req: NextApiRequest ): Promise<string>=> {
    
    //utilizacion el formidable para parsear los archivos
    return new Promise( ( resolve, reject) => {
        //se prepara el objeto que estoy mandando
        const form = new formidable.IncomingForm();

        //los parseamos, la req son los archivos y nos tre el erro los files
        form.parse( req, async( err, fields, files ) => {  
           

            //si hay un error en el proceso
            if ( err ) {
            return reject( err);
            }

            //si va todo bien creamos otar funcion para guardar los archivos donde queramos
            const filePath = await saveFile( files.file as formidable.File );

            resolve( filePath) ;
        })

        
    })
}


const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const imageUrl = await parseFiles( req )
;

    return res.status(200).json({ message: imageUrl });
}

