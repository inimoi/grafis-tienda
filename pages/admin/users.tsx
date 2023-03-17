import React, { useEffect, useState } from 'react'
import { NextPage } from 'next';
import useSWR from 'swr';

import { PeopleOutline } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Grid, MenuItem, Select } from '@mui/material';

import { AdminLayout } from '../../components/layouts';
import { IUser } from '../../interfaces';
import { grafisApi } from '../../apiConfig';





const UsersPage: NextPage = () => {
  
    //utilizacion del SWR para los endpoints de la api admin users
    const { data, error } = useSWR<IUser[]>('/api/admin/users')

    //creamos un nuevo estado y un useeffect para poder actualizar al momento el cambio en el select.
    const [ users, setUsers] = useState<IUser[]>([]);

    useEffect(() =>{

        if( data ) {
            setUsers( data );
        }

    }, [ data ])

    //cuando se carga por primera vez la página no hay data ni error
    if ( !data && !error) {
        return (
            <>
            </>
        )
    }

    //funcion de la actualiacion del role
    const onRoleUpdated = async ( userId: string, newRole: string) => {

        //por si hay un error a la hora del cambio de role
        const previosUsers = users.map( user => ({ ...user }));

        //cambio en elfrontend
        const updatedUsers = users.map( user => ({
            ...user,
            role: userId === user._id ? newRole : user.role 

        }));

        setUsers( updatedUsers );

        try {
            
            await grafisApi.put('/admin/users', { userId, role: newRole });

        } catch (error) {

            setUsers( previosUsers );
            alert('No se pudo actualizar el role delusuario');
        }
    }




    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Correo', width: 250},
        { field: 'name', headerName: 'Nombre completo', width: 300},
        { 
            field: 'role', 
            headerName: 'Rol', 
            width: 300,
            renderCell: ({row}:GridRenderCellParams) => {

                return (
                    <Select
                        value={ row.role}
                        label="Rol"
                        onChange= { ({ target  }) => onRoleUpdated( row.id, target.value ) }
                        sx= {{ width: '300px' }}
                    >
                        <MenuItem value='cliente'> Cliente </MenuItem>
                        <MenuItem value='admin'> Admin </MenuItem>
                        

                    </Select>
                )
            }
        },
    ]  

    //en los rows ponemos lo que viene de la data del endpoint
    const rows = users.map( user => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
    }))

  
    return (
    <AdminLayout 
        title={'Usuarios'} 
        subTitle={'Mantenimiento de usuarios'}
        icon={ <PeopleOutline />}         
    >

        <Grid container className= 'fadeIn'>
            <Grid item xs={12} sx={{ height:650, width:'100%'}}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    pageSize={ 10 }
                    rowsPerPageOptions={ [10]}                
                />
            </Grid>
        </Grid>
      
    </AdminLayout>
  )
}

export default UsersPage
