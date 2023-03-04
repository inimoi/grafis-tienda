import mongoose, {Schema, model, Model} from 'mongoose';
import { IPedido } from '../interfaces';


const pedidoSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // usuario de tipo id de monggose y hace referencia al otro esquema de User
        pedidoItems: [{
            _id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            titulo: { type: String, required: true },
            cantidad: { type: Number, required: true },
            slug: { type: String, required: true },
            image: { type: String, required: true },
            precio: { type: Number, required: true },

        }],
        shippingAddress: {
            nombre: { type: String, required: true },
            apellido: { type: String, required: true },
            direccion: { type: String, required: true },
            direccion2: { type: String},
            codigoPostal: { type: String, required: true },
            ciudad: { type: String, required: true },
            provincia: { type: String, required: true },
            telefono: { type: String, required: true },
        },

        numberOfItems:  { type: Number, required: true },
        subTotal:  { type: Number, required: true },
        impuesto:  { type: Number, required: true },
        total:  { type: Number, required: true },

        isPaid: {type: Boolean, required: true },
        paidAt: { type: String },

        //campo añadido para tener una realcion con el metodo de pago, paypal o el que sea
        transactionId: { type: String },



    },        
    
    {
        timestamps: true,
    }
    
    )

    const Pedido:Model<IPedido> = mongoose.models.Pedido || model('Pedido', pedidoSchema);

    export default Pedido;