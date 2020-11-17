import React from 'react';
import Container from '@material-ui/core/Container';

class Footer extends React.Component {

    render() {
        return (
            <div className="footer">
            <Container fixed className="footer-content" >
            <p>Handwai</p>
            </Container> 
          </div>
          
        );
    }
}
export default Footer;