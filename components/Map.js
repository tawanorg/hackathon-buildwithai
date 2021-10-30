import React, { Component } from 'react';
import { Flex, Text, Box } from '@chakra-ui/react'
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => (
    <Box style={{
        color: 'white', 
        background: 'green',
        width: '20px',
        height: '20px',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        display: 'flex',
        justifyItems: 'center',
        justifyContent: 'center'
    }} />
  );
  
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      <Box>
          <Flex justifyContent={"center"} p={4}>
            <Text>Nearest location is in 15 Southbank, VIC</Text>
          </Flex>
          <Box style={{ height: '200px', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyD33pssunz_P8z-LOTHeiYw1fPMuXXnszo' }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
            >
            <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text="15 Southbank, VIC"
            />
            </GoogleMapReact>
        </Box>
      </Box>
    );
  }
}

export default SimpleMap;
