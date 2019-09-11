import React, { Component } from "react";
import Menu, { MenuItem } from 'rc-menu';

class Header extends Component {
  render() {
    return(
    <Menu>
      <MenuItem>Clientes</MenuItem>
      <MenuItem>Pets</MenuItem>
    </Menu>
  )}
}

export default Header;
