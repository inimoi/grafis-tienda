import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';

import { db } from '../../../database';
import { User } from '../../../models';
import { jwt, validations } from '../../../utils';


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
        case 'POST':            
            return registerUser(req, res );
    

        default:
            res.status(400).json({
                message: 'Bad request'
            });
    }
}


const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   
    const { email = '', password = '', name= ''} = req.body as { email: string, password: string, name: string};

    //validar password
    if (password.length < 6 ) {
        return res.status(400).json({
            message: 'la contraseña debe ser de más de 6 caracteres'
        });
    }

    //validar nombre
    if (name.length < 2) {
        return res.status(400).json({
            message: 'El nombre debe ser de más de 2 caracteres'
        });
    }

    // validar email desde utils/validations
    if ( !validations.isValidEmail( email )) {
        return res.status(400).json({
            message: 'El correo no tiene formato de correo'
        });
    }



    await db.connect();

    const user = await User.findOne( { email });

    if ( user ) {
        
        await db.disconnect();

        return res.status(400).json({ message: 'Ese correo ya está registrado'})
    }

    //una vez todo validado creamos un usuario nuevo
    const newUser = new User({
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync( password ),
        role: 'cliente',
        name
    })

    //guardamos el nuevo usuario en la BBDD
    try {
        await newUser.save({ validateBeforeSave: true })

    //error 500 si hay algun problema a la hora de guardar dicho nuevo usuario    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Revisar logs del servidor'
        })
    }
       
    //sacamos el nuevo usuario el _Id para crear el JWT y el email que ya lo teníamos. El role para la respuesta
    const { _id, role} = newUser;

    //creacion del token
    const token = jwt.signToken( _id, email);

    await db.disconnect();

    return res.status(200).json({
        token,  //jwt
        user:{
            email, role, name
        }
    })

    
}

