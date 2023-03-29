import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FilledInput, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Input, ListItem, Paper, Radio, RadioGroup, TextField } from '@mui/material';
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';

import { AdminLayout } from '../../../components/layouts'
import { IProduct } from '../../../interfaces';
import { dbProducts } from '../../../database';
import { grafisApi } from '../../../apiConfig';
import { Product } from '../../../models';




const ValidCategorias = ['Acuarelas','Agenda escolar','Boligrafos','Calculadoras'];


interface FormData {
    _id?: string;           //sino creamos un nuevo producto no lo tendremos
    descripcion: string;
    imagenes: string[];
    enStock: number;
    precio: number;
    slug: string;
    tags: string[];
    titulo: string;
    categoria: string;
    cantidad: number;
}


interface Props {
    product: IProduct;
}

const ProductAdminPage:FC<Props> = ({ product }) => {

    //useRef para la referencia del input normal al boton de cargar imagen
    const fileInputRef = useRef<HTMLInputElement>(null);

    //creacion del useRouter para navegar a la pagina el nuevo producto
    const router = useRouter();

    //nuevo estado para las etiquetas
    const [ newTagValue, setNewTagValue ] = useState('');

    //nuevo estado para evitar el doble posteo en el onSubmit
    const [ isSaving, setIsSaving ] = useState(false);



    //para la gestion del useForm
    const { register, handleSubmit, formState:{ errors }, getValues, setValue, watch } = useForm<FormData>({
        defaultValues: product
    });

    //useeefct para el cambio del titulo y creacion automatica del slug
    
    useEffect(() => {

        const subscription = watch(( value, {  name, type })=> {

            if ( name === 'titulo') {
                const newSlug = value.titulo?.trim()
                    .replaceAll(' ', '_')
                    .replaceAll("'", '')
                    .toLocaleLowerCase()  || '';
                
                setValue('slug', newSlug );
            }
        })

        //para destruir el watch
        return () =>{
            subscription.unsubscribe();
        }
    }, [ watch, setValue ])   //aunque no cambien son dependencias que el useeffct pide que se pongan
    
  
    //cuando le dan a la tecla space
    const onNewTag = () => {
        const newTag = newTagValue.trim().toLocaleLowerCase();
        setNewTagValue('');
        const currentTags = getValues('tags');

        //si la etiqueta que ponemos ya está en el arreglo de etiquetas, no hacemos nada
        if ( currentTags.includes( newTag )) {
            return;
        }

        //si no la tenemos añadimos la etiqueta en el arreglo de etiquetas
        currentTags.push( newTag );
    }
    
    //la funcion que se llama cuando se le da a borrar el tag
    const onDeleteTag = ( tag: string ) => {
        const updatedTags = getValues('tags').filter( t => t !== tag );
        setValue('tags', updatedTags, { shouldValidate: true });
    }


    //funcion para la carga de las imaegens
    const onFilesSelected = async ( { target }: ChangeEvent<HTMLInputElement>) => {
        if ( !target.files || target.files.length === 0 ) {
            return;
        }

        
        try {
            
            for( const file of target.files ) {
                const formData = new FormData();  //este FormData ya viene en el navegador no hay que importarlo
                formData.append('file', file);  //añadimos nuestro fichero al formData
                const { data } = await grafisApi.post<{ message: string}>('/admin/upload', formData );
                
                //del api de retorno nos viene el message con la imageURL de cloudinary
                //lo guardamos en el setValue
                setValue('imagenes', [...getValues('imagenes'), data.message ],{ shouldValidate: true });
            }
            
        } catch (error) {
            
        }

    }

    //funcion para borrar las fotos desde nuestro admin
    const onDeleteImage = ( image:string) => {
        setValue(
            'imagenes',
            getValues('imagenes').filter( img => img !== image ),
            { shouldValidate: true }
        )
    }




    const onSubmitForm = async ( formData: FormData) => {
        
        //validacion para que haya x imagenes
        if ( formData.imagenes.length < 1 ) return alert('Mínimo una imagen');

        //validaciones para evitar el doble posteo
        setIsSaving(true);


        try {
            
            const { data } = await grafisApi({
                url: '/admin/products',
                method: formData._id ? 'PUT': 'POST',  // si tenemos id es actualizar sino crear
                data: formData
            });

            
            if ( !formData._id ) {
                
                router.replace(`/admin/products/${ formData.slug }`)

            } else {
                setIsSaving(false)
            }

        } catch (error) {
            console.log(error);
            setIsSaving(false);
        }


    }

    return (
        <AdminLayout 
            title={'Producto'} 
            subTitle={`Editando: ${ product.titulo }`}
            icon={ <DriveFileRenameOutline /> }
        >
            <form onSubmit={ handleSubmit( onSubmitForm )}>
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button 
                        color="secondary"
                        startIcon={ <SaveOutlined /> }
                        sx={{ width: '150px' }}
                        type="submit"
                        disabled={ isSaving }
                        >
                        Guardar
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={ 6 }>

                        <TextField
                            label="Título"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('titulo', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={ !!errors.titulo }
                            helperText={ errors.titulo?.message }
                        />

                        <TextField
                            label="Descripción"
                            variant="filled"
                            fullWidth 
                            multiline
                            sx={{ mb: 1 }}
                            { ...register('descripcion', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={ !!errors.descripcion }
                            helperText={ errors.descripcion?.message }
                        />

                        <TextField
                            label="Inventario"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('enStock', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Mínimo de valor cero' }
                            })}
                            error={ !!errors.enStock }
                            helperText={ errors.enStock?.message }
                        />
                        
                        <TextField
                            label="Precio"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('precio', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Mínimo de valor cero' }
                            })}
                            error={ !!errors.precio }
                            helperText={ errors.precio?.message }
                        />

                        <Divider sx={{ my: 1 }} />

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Categoría</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues( 'categoria')}
                                onChange={ ({ target } ) => setValue('categoria', target.value, { shouldValidate: true } ) }
                            >
                                {
                                    ValidCategorias.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                       

                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={ 6 }>
                        <TextField
                            label="Slug - URL"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            { ...register('slug', {
                                required: 'Este campo es requerido',
                                validate: ( val ) => val.trim().includes(' ') ? 'No puede tener espacios en blanco': undefined
                            })}
                            error={ !!errors.slug }
                            helperText={ errors.slug?.message }
                        />

                        <TextField
                            label="Etiquetas"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            helperText="Presiona [spacebar] para agregar"
                            value={ newTagValue }
                            onChange={ ({ target }) => setNewTagValue( target.value ) }
                            onKeyDown={ ({ code }) => code === 'Space' ? onNewTag(): undefined }
                        />
                        
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                        }}
                        component="ul">
                            {
                                getValues('tags').map((tag) => {

                                return (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onDelete={ () => onDeleteTag(tag)}
                                        color="primary"
                                        size='small'
                                        sx={{ ml: 1, mt: 1}}
                                    />
                                );
                            })}
                        </Box>

                        <Divider sx={{ my: 2  }}/>
                        
                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb:1}}>Imágenes</FormLabel>
                            <Button
                                color="secondary"
                                fullWidth
                                startIcon={ <UploadOutlined /> }
                                sx={{ mb: 3 }}
                                onClick={ () => fileInputRef.current?.click() }   
                            >
                                Cargar imagen
                            </Button>
                            <input 
                                ref= { fileInputRef }
                                type='file'
                                multiple
                                accept='image/png, image/gif, image/jpg, image/jpeg'
                                style={{ display: 'none'}}
                                onChange={ onFilesSelected }
                            />
                            <Chip 
                                label="Es necesario al menos una imagen"
                                color='error'
                                variant='outlined'
                                sx={{ display: getValues('imagenes').length < 1 ? 'flex': 'none'}}
                            />

                            <Grid container spacing={2}>
                                {
                                    getValues('imagenes').map( img => (
                                        <Grid item xs={4} sm={3} key={img}>
                                            <Card>
                                                <CardMedia 
                                                    component='img'
                                                    className='fadeIn'
                                                    image={ img } //solo coge el path total por lo tanto vemos las fotos cloudinary
                                                    alt={ img }
                                                />
                                                <CardActions>
                                                    <Button 
                                                        fullWidth color="error"
                                                        onClick={ () => onDeleteImage(img) }
                                                        >
                                                        Borrar
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
            </form>
        </AdminLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    
    const { slug = ''} = query;

    //este let es para que admita la pagina de new para crear producto
    let product: IProduct | null

    //ahora miramos si en las query viene la palabra new qie indicaría producto nuevo
    if ( slug === 'new') {
        //crear un producto
        const tempProduct = JSON.parse( JSON.stringify( new Product()))   //Product de los modelos para que coja todos los campos
        delete tempProduct._id;                                         // nos asignan una id por defecto, la borramos
        tempProduct.imagenes = [ 'img1.jpg', 'img2.jpg' ]               //para que no choque con la validacion de tener fotos
        product = tempProduct;
        
    } else {

        product = await dbProducts.getProductBySlug(slug.toString());

    }
    
    
    if ( !product ) {
        return {
            redirect: {
                destination: '/admin/products',
                permanent: false,
            }
        }
    }
    

    return {
        props: {
            product
        }
    }
}


export default ProductAdminPage