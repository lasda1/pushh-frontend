import React from 'react';
import './App.scss';
import Container from '@material-ui/core/Container';
import {BrowserRouter ,Switch,Route} from "react-router-dom";
import Support from './support/Support'
import Axios from 'axios';
import NotFound from './not-found-component/not-found';

class App extends React.Component{

  componentDidMount() {
    Axios.interceptors.response.use(response => {
      return response;
   }, error => {
     if (error.response.status === 401) {
      this.props.history.push('/login')
     }
     return error;
   });
  }
  render(){
    return ( 
      <div className = "App" >
        <div className="navbar">
          <Container fixed >
          < img className = "img-fluid"
          alt = "logo brand nobo noir"
          src = "https://www.handwai.com/wp-content/uploads/2020/02/Logo_cw.png" /> 
          </Container> 
        </div> 
        <Container fixed className="content">
        <BrowserRouter>
          <Switch>
                <Route exact path='/support/:id?' component={Support} />
                <Route path='*' exact={true} component={NotFound} />
          </Switch>
        </BrowserRouter>
        </Container>
      </div>
    );
  }

}

export default App;