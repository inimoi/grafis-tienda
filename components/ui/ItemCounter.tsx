import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React, { FC } from 'react'


interface Props{
  currentValue: number;


  //metodo
  updatedQuantity:(newValue: number) => void;
}

export const ItemCounter: FC<Props> = ({ currentValue, updatedQuantity }) => {

  const addOrRemove = (value: number) => {
    if( value === -1) {
      if ( currentValue === 1 ) return;  //par que no pueda pasar de 1

      return updatedQuantity ( currentValue - 1);
    }

    updatedQuantity( currentValue + 1);
  }

  return (
    <Box display='flex' alignItems='center' >
      <IconButton onClick={ () => addOrRemove(-1)}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign:'center'}}> { currentValue } </Typography>
      <IconButton onClick={ () => addOrRemove(+1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  )
}


