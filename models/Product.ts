import mongoose, { Schema, model, Model} from 'mongoose';
import { IProduct } from '../interfaces';


const productSchema = new Schema({
    descripcion: {type: String, required: true},
    imagenes: [{type: String }],
    enStock: {type: Number, required: true, default: 0},
    precio: {type: Number, required: true, default: 0},
    slug: {type: String, required: true, unique: true},
    tags: [{type: String }],
    titulo: {type: String, required: true},
    categoria: {
        type: String,
        enum: {
            values:['Acuarelas','Agenda escolar','Boligrafos','Calculadoras'],
            message: '{VALUE} no es una categoria válida'
        }
    }

},{
    timestamps: true  //para que aparezca en nuestra base de datos la fecha de creación y la fecha de actualizacion
});

// TODO crear índice de Mongo
productSchema.index({ titulo: 'text', tags: 'text'});


const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema);


export default Product;