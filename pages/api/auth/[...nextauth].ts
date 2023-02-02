import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { dbUsers } from "../../../database";




export default NextAuth( {  
    // Configure one or more authentication providers  
    providers: [  

        Credentials({
            name: 'Custom Login',
            credentials: {
                email: { label: 'Correo:', type: 'email', placeholder: 'correo@google.com'},
                password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña'},
            },
            async authorize( credentials):Promise<any> {
                console.log({ credentials});
                return await dbUsers.checkUserEmailPassword( credentials!.email, credentials!.password )
                
            }
        }),

        GithubProvider ({      
            clientId: process.env.GITHUB_ID as string,      
            clientSecret: process.env.GITHUB_SECRET as string ,   
        }),   
        
        // ...add more providers here  


    ],

    //custom Pages
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/registro'
    },


    //callbacks

    jwt: {
        //aqui antes se ponía el enn.secret pero esto ya es obsoleto, ahora lo hace de manera automatica
    },

    session: {
        maxAge: 2592000, // son 30 dias
        strategy: 'jwt',
        updateAge: 86400, //cada día
    },

    callbacks: {

        async jwt( { token, account, user}) {

            if ( account ) {
                token.accessToken = account.accessToken as any;

                switch ( account.type ) {

                    case 'oauth':
                        token.user = await dbUsers.oAuthToDbUser( user?.email || '', user?.name || '');
                        break;

                    case 'credentials':
                        token.user = user as any;
                    break;

                    default:
                        break;
                }


            }

            return token
        },

        async session ( { session, token, user } ) {

            session.accessToken = token.accessToken as any;
            session.user = token.user as any;

            return session;
        }

    }

}) ; 
