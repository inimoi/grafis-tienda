import mongoose, { Schema, model, Model} from 'mongoose';
import { IProduct } from '../interfaces';


const productSchema = new Schema({
    descripcion: {type: String, required: true, default: '' },
    imagenes: [{type: String }],
    enStock: {type: Number, required: true, default: 0},
    precio: {type: Number, required: true, default: 0},
    slug: {type: String, required: true, unique: true },
    tags: [{type: String }],
    titulo: {type: String, required: true, default: ''},
    categoria: {
        type: String,
        enum: {
            values:['Acuarelas','Agenda escolar','Boligrafos','Calculadoras','Carpetas','Ceras','Cinta Dymo','Compases','Correctores','Dossiers','Edding','Estuches','Forro libros','Fundas','Gomas de borrar','Grapadoras','Lapices','Libretas','Marcadores','Minas','Pegamentos','Pendrive','Plastilina','Porta planos','Reglas','Resmilleria','Roller pilot','Rotuladores','Sacapuntas','Talonarios','Tarifarios','Tijeras'],
            message: '{VALUE} no es una categoria válida'
        },
        default: 'Acuarelas'
    }

},{
    timestamps: true  //para que aparezca en nuestra base de datos la fecha de creación y la fecha de actualizacion
});

// TODO crear índice de Mongo
productSchema.index({ titulo: 'text', tags: 'text'});


const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema);


export default Product;