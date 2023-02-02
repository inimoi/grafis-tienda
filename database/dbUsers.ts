import { db } from './';
import { User } from '../models';
import bcrypt from 'bcryptjs';


export const checkUserEmailPassword = async ( email: string, password: string) => {

    await db.connect();
        const user = await User.findOne({ email })

    await db.disconnect();

    if ( !user) {
        return null;
    }

    if ( !bcrypt.compareSync( password, user.password! )) {
        return null;
    }

    const { role, name, _id} = user;

    return {
        _id,
        email: email.toLocaleLowerCase(),
        role,
        name,
    }

}

//esta funcion crea o verifica el usuario de Oauth. esto es lo que viene de la red social, el email y el nombre

export const oAuthToDbUser =async ( oAuthEmail: string, oAuthName: string ) => {
    
    await db.connect();

    // el User de nuestros modelos o sea de nuestra BBDD miramos si hay algun email igual al de oAuthEmail que es el email que vendrá de redes sociales
    const user = await User.findOne( { email: oAuthEmail})

    //si esxite el usuario
    if ( user ) {
        await db.disconnect();
        const { _id, name, email, role} = user;

        //esto es lo que necesitaremos para la session
        return { _id, name, email, role};
    }

    //si no exiiste el usuario lo creamos
    const newUser = new User ({ email: oAuthEmail, name: oAuthName, password: '@', role:'cliente'});
    await newUser.save();
    await db.disconnect();

    const { _id, name, email, role} = newUser;
    return { _id, name, email, role};



}