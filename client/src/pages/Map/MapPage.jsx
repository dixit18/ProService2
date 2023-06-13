import React from 'react'
import { ChakraProvider, theme } from "@chakra-ui/react";
import Map from '../../components/MapComp/Map';

const MapPage = () => {
    
  return (
    <ChakraProvider theme={theme}>
    <Map />
  </ChakraProvider>
  )
}

export default MapPage