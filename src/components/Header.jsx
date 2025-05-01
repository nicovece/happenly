import React from 'react';
import './Header.scss';

const asciiArt = `
 ,                                  _        
/|   |                             | |       
 |___|  __,    _    _   _   _  _   | |       
 |   |\\/  |  |/ \\_|/ \\_|/  / |/ |  |/  |   | 
 |   |/\\_/|_/|__/ |__/ |__/  |  |_/|__/ \\_/|/
            /|   /|                       /| 
            \\|   \\|                       \\| 
`;

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="visually-hidden">Happenly</h1>
        <pre style={{ whiteSpace: 'pre', fontFamily: 'monospace' }}>
          {asciiArt}
        </pre>
        {/* <nav className="nav-menu">
          <ul>
            <li>Discover what's happening!</li>
          </ul>
        </nav> */}
      </div>
    </header>
  );
};

export default Header;
