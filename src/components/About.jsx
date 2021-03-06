import { Grommet, Image, Box, Anchor, Button, Heading, grommet, Paragraph } from 'grommet';
import React, { Component } from 'react';
import { TreeOption } from 'grommet-icons';
import Nav from './NavBar';
import tree from '../assets/tree.png';



class About extends Component {
    state = {  }
    render() { 
        
        return (
            <Grommet theme={grommet} background="#9FE2BF">
            <Nav />
            <Box align="left" pad="large">
            <Heading color='#275F25 '> Welcome to Safe Garbage, your go-to dump for all-things disposal related. </Heading>
            <Box direction="row-responsive" justify='start'> 
            <Anchor href='https://recyclebc.ca/recycle-bc-2019-greenhouse-gas-emission-results/'>
            <Image src={tree} fit='contain' margin='medium' alignSelf='start'/>
            </Anchor>
            <Box>
                <Heading color='#205072' size='medium'>
                Our Goal: to help the planet & your wallet.
                </Heading>
            
            <Paragraph size='medium' textAlign='start' direction='row-responsive'>
            We help you determine which bin your item goes into: 
            </Paragraph>
            <Box direction='row-responsive'>
            <Paragraph margin='small' color='#205072'>Recyclables</Paragraph> 
            <Paragraph margin='small' color='#275F25 '>Compost</Paragraph> 
            <Paragraph margin='small' color='#000000'>Garbage</Paragraph> 
            </Box>

            <Paragraph size='medium' textAlign='start'>
            Improper waste disposal is harmful to the environemnt, but also your wallet! It can lead to bylaw tickets 
            ranging from $100-$500, and even lead up to $10,000. 
            </Paragraph>

            <Paragraph size='medium'>
            With Safe Garbage, you don't need to worry about accidentally recycling garbage!
            </Paragraph>

            <Box>
            <Button label="what can you recycle" pad = "left"color='#205072' href='https://recyclebc.ca/?gclid=Cj0KCQiA7YyCBhD_ARIsALkj54quQRh5NBxu-CglxxpNruRm3mgLZfGQ-PmuDyajyIHy0SREUpZmjlcaAm5oEALw_wcB' 
            margin='small' alignSelf='start'/>
            </Box>


            
            </Box>

                
            </Box> 
            
            </Box>
          </Grommet>
          );
    }
}
 
export default About;