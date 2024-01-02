import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import SimpleBudgetLogo from "../assets/logos/sb-logos-black.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar expand>
      {/* <NavbarBrand> */}
      <Link to="/" className="navbar-brand">
        <img
          alt="Simple Budget logo"
          src={SimpleBudgetLogo}
          style={{
            height: 160,
          }}
          className="float-start"
        />
      </Link>
      {/* </NavbarBrand> */}
      {/* <NavbarToggler onClick={toggle} /> */}
      {/* <Collapse isOpen={isOpen} navbar> */}
      <Nav className="me-auto" navbar>
        <NavItem>
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/bills" className="nav-link">
            Bills
          </NavLink>
        </NavItem>
      </Nav>
      {/* </Collapse> */}
    </Navbar>
  );
};
export default Header;
