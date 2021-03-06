import React, { Component } from 'react'
import { Grommet, Header, Button, Nav, Menu, Box, Anchor } from 'grommet'

import { TreeOption } from 'grommet-icons';


class NavBar extends Component {
    state = {  }
    render() { 
      return (
          
            <Grommet>
            <Header background="#CFF4D2" pad="small" border={{color: '#205072', side: 'bottom', size: "medium"}}>

              <Anchor href='/'>
              <Button icon={<TreeOption />} size='xlarge' align='center'/>
              <Anchor label="Safe Garbage" href="/" color='#205072'/>
              </Anchor>
              <Nav direction="row" margin='medium' >
                <Anchor label="About Us" href="/about" color='#205072'/>
                <Anchor label="Your Impact" href="/project" color='#205072'/>
                <Anchor label="Contact" href="/contact" color='#205072'/>
              </Nav>

            </Header>
          </Grommet>

         );
    }
}
 
export default NavBar;