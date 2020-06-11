import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('signout')} >Sign Out</p>
        </nav>
      );
    } else {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('login')} >Login &nbsp;&nbsp;   </p>
          <p onClick={() => onRouteChange('register')} > &nbsp;&nbsp;  Register</p>
        </nav>
      );
    }
}

export default Navigation;