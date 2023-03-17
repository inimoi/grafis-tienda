import type { NextApiRequest, NextApiResponse } from 'next';

import { isValidObjectId } from 'mongoose';
import { db } from '../../../database';
import { IUser } from '../../../interfaces';
import { User } from '../../../models';

type Data = 
| { message: string }
| IUser[]



export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch ( req.method) {
        case 'GET':
            
            return getUsers( req, res );

        case 'PUT':
            
            return updateUser( req, res );

        default:
            
             return res.status(400).json({ message: 'Bad request' });
    }
           
}



const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    await db.connect();

    const users = await User.find().select('-password').lean();

    await db.disconnect();

    return res.status(200).json( users );

}



const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { userId = '', role = '' } = req.body;
    
    //validacion ¡de si userId es un id de mongo
    if ( !isValidObjectId( userId )) {
        return res.status(400).json({ message: 'No existe usuario con esa id'})
    }

    const validRoles = ['admin', 'cliente'];
    //validacion por roles
    if ( !validRoles.includes( role )) {
        return res.status(400).json({ message: 'Rol no permitido'})
    }


    //si esta todo bien
    await db.connect();

    const user = await User.findById( userId );

    if( !user ) {
        await db.disconnect();
        return res.status(404).json({ message: 'usuario no encontrado'})
    }

    user.role = role;
    await user.save();
    
    await db.disconnect();

    return res.status(200).json({ message: 'Usuario actualizado'});
    
}
