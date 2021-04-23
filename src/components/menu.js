import { useState } from "react";
import "../common/burger.css";
import burger_icon from "../assets/burger.svg";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { slide as Menu } from "react-burger-menu";
import { signoutUser } from "../util/api";

const StyledLink = styled.div`
  color: var(--primary);
  font-family: "Quicksand", sans-serif;
  font-weight: 500;
  font-size: 20px;
  padding: 5px 0px 5px 20px;
  transition: background-color 0.3s;

  &:hover {
    color: var(--primary);
    text-decoration: none;
    background-color: rgb(75, 75, 75);
    cursor: pointer;
  }

  &:active,
  &:focus {
    outline: none;
    border: none;
  }
`;

const NavMenu = () => {
  const [open, setOpen] = useState(false);

  const handleStateChange = (state) => {
    setOpen(state.isOpen);
  };

  return (
    <Menu
      disableAutoFocus
      itemListElement="div"
      customBurgerIcon={<img src={burger_icon} />}
      isOpen={open}
      onStateChange={handleStateChange}
    >
      <NavLink to="/" style={{ textDecoration: "none" }}>
        <StyledLink
          onClick={() => {
            setOpen(false);
          }}
        >
          Dashboard
        </StyledLink>
      </NavLink>
      <StyledLink
        onClick={async () => {
          await signoutUser();
          window.location.reload();
        }}
        to="/"
      >
        Sign Out
      </StyledLink>
    </Menu>
  );
};

export default NavMenu;
