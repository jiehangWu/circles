import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>
      );
    } else {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('login')} className='f3 link dim black underline pa10 pointer'></p>
          <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'></p>
        </nav>
      );
    }
}

export default Navigation;