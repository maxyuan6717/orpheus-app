import { useState } from "react";
import "../common/burger.css";
import burger_icon from "../assets/burger.svg";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { stack as Menu } from "react-burger-menu";
import { signoutUser } from "../util/api";

const StyledLink = styled.div`
  color: var(--primary);
  font-family: "Quicksand", sans-serif;
  font-weight: 600;
  font-size: 24px;
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

const NavMenu = ({ authed }) => {
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
      <StyledLink
        onClick={() => {
          window.location.href = `https://orpheuspledge.org/`;
        }}
        to="/"
      >
        Home
      </StyledLink>
      <NavLink to="/" style={{ textDecoration: "none" }}>
        <StyledLink
          onClick={() => {
            setOpen(false);
          }}
        >
          My Dashboard
        </StyledLink>
      </NavLink>
      {authed === 1 && (
        <StyledLink
          onClick={async () => {
            await signoutUser();
            window.location.reload();
          }}
          to="/"
        >
          Sign Out
        </StyledLink>
      )}
    </Menu>
  );
};

export default NavMenu;
