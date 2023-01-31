import { useContext, useState } from "react"
import { useRouter } from "next/router"

import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"

import { AuthContext, UiContext } from "../../context"



export const SideMenu = () => {

    const router = useRouter();
    const { isMenuOpen, toggleSideMenu} = useContext(UiContext);

    //acceso al autcontext para saber que tipo de role es el usuario
    const { user, isLoggedIn, logout} = useContext( AuthContext);

    const [ searchTerm, setSearchTerm ] = useState('')

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return;          
        
        navigateTo(`/search/${ searchTerm }`);
    }

    const navigateTo = ( url: string ) => {
        toggleSideMenu();
        router.push(url);
    }

    //funcion para ellogout
    const onLogout = () => {
        logout();
    }    


  return (
    <Drawer
        open={ isMenuOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        onClose={ toggleSideMenu }
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

                <ListItem>
                    <Input
                        autoFocus
                        value={ searchTerm }
                        onChange={ (e) => setSearchTerm( e.target.value )}
                        onKeyPress={ (e) =>e.key === 'Enter' ? onSearchTerm() : null}
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={ onSearchTerm }
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>

                {
                    isLoggedIn && (
                        <>
                            <ListItem button>
                                <ListItemIcon>
                                    <AccountCircleOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Perfil'} />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Mis Ordenes'} />
                            </ListItem>
                        </>
                    )
                }

                


                <ListItem 
                    button 
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={ ()=> navigateTo('/')}
                    >
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Inicio'} />
                </ListItem>

                <ListItem 
                    button 
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={ ()=> navigateTo('/papeleria')}
                    >
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Tienda papelería'} />
                </ListItem>

                <ListItem 
                    button 
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={ ()=> navigateTo('/copisteria')}
                    >
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Copistería'} />
                </ListItem>

                <ListItem 
                    button 
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={ ()=> navigateTo('contacto')}
                    >
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Contacto'} />
                </ListItem>

                <ListItem 
                    button 
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={ ()=> navigateTo('servicios')}
                    >
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Servicios'} />
                </ListItem>

                {
                    isLoggedIn
                    ? (
                        <ListItemButton  onClick={ onLogout }>
                            <ListItemIcon>
                                <LoginOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Salir'} />
                        </ListItemButton>
                    )
                    : (
                        <ListItemButton onClick={ () => navigateTo(`/auth/login?p=${ router.asPath }`)}>
                            <ListItemIcon>
                                <VpnKeyOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Ingresar'} />
                        </ListItemButton>    
                    )
                }                            

                {/* Admin */}
                {
                    user?.role === 'admin' && (
                        <>
                            <Divider />
                            <ListSubheader>Admin Panel</ListSubheader>

                            <ListItem button>
                                <ListItemIcon>
                                    <CategoryOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Productos'} />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Ordenes'} />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <AdminPanelSettings/>
                                </ListItemIcon>
                                <ListItemText primary={'Usuarios'} />
                            </ListItem>
                        </>
                    )
                }
            </List>
        </Box>
    </Drawer>
  )
}
