import styled, { css } from "styled-components";

export const flexCenter = css`
  display: flex;
  align-items: center;
`;

export const NavbarContainer = styled.nav`
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

export const TopBanner = styled.div`
  background: #000;
  color: #fff;
  font-size: 14px;
  text-align: center;
  padding: 6px 0;
  height: 4vh;

  p {
    margin: 0;
    letter-spacing: 0.1em;
  }
`;

export const MainNav = styled.div`
  ${flexCenter};
  justify-content: space-between;
  max-width: 90vw;
  height: 13vh;
  margin: 0 auto;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const NavLinks = styled.ul`
  ${flexCenter};
  list-style: none;
  gap: 20px;

  li a {
    ${flexCenter};
    gap: 6px;
    text-decoration: none;
    color: #000;
    font-size: 16px;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Avatar = styled.img`
  width: 28px;
  height: 28px;
  object-fit: cover;
  border-radius: 50%;
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;
