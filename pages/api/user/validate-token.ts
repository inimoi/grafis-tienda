import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';

import { db } from '../../../database';
import { User } from '../../../models';
import { jwt } from '../../../utils';


type Data = 
| { message: string }
| {
    token: string;
    user: {
        email: string;
        name: string;
        role: string;
    }
}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
   
    switch (req.method) {
        case 'GET':            
            return checkJWT(req, res );
    

        default:
            res.status(400).json({
                message: 'Bad request'
            });
    }
}


const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   
    const { token = ''} = req.cookies;

   

    //ahora hay que ver si es permitido el token
    let userId= '';

    try {
        userId = await jwt.isValidToken( token );                  // es el jwt de utils no del paquete jsonwebtoken

    } catch (error) {
        return res.status(401).json({
            message: 'Token de autorización no válido'
        })
    }

    await db.connect();

    const user = await User.findById( userId ).lean();


    await db.disconnect();

    if ( !user ) {
        return res.status(400).json({ message: 'No existe usuario con ese Id'})
    }

    const { role, name, _id, email} = user;
 

    return res.status(200).json({
        token: jwt.signToken( _id, email),      //renovacion del jwt
        user:{
            email, 
            role, 
            name
        }
    })
}

 