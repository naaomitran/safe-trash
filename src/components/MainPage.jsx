import { Grommet, Box, Image } from 'grommet';
import Camera from './Camera';
import NavBar from './NavBar'
import React, { Component } from 'react';
import logo from '../assets/sglogo.png';
import MeterComp from './Meter';



class MainPage extends Component {
    state = {  }
    render() { 
        return ( 
            <Grommet background='#9FE2BF'>
            <NavBar />
              <Box padding='medium'>
              <Image src={logo} alignSelf='center' margin='small'/>
              <Box align='start' margin='medium' direction='row-responsive'>
              <Camera alignSelf="start" />
              <MeterComp />
              </Box>
              </Box>
        
        
          </Grommet>

         );
    }
}
 
export default MainPage;