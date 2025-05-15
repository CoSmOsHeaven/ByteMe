import React from 'react';
import { IconButton, InputBase } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar({ toggleSidebar }) {
  return (
    <div className="navbar">
      <IconButton color="inherit" onClick={toggleSidebar}>
        <MenuIcon />
      </IconButton>
      <div className="search-container">
      </div>
    </div>
  );
}

export default Navbar;
