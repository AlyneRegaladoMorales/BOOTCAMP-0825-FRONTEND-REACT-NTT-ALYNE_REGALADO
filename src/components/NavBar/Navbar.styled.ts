import styled, { css, keyframes } from "styled-components";
import { Theme } from "../../utils/Theme";

const marquee = keyframes`
  0%   { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

export const flexCenter = css`
  display: flex;
  align-items: center;
`;

export const NavbarContainer = styled.nav`
  width: 100%;
  border-bottom: 1px solid ${Theme.gray};
  background-color: ${Theme.white};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

export const TopBanner = styled.div`
  background: ${Theme.black};
  color: ${Theme.white};
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  height: 4vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BannerText = styled.p`
  margin: 0;
  letter-spacing: 0.1em;
  display: inline-block;

  @media (max-width: 768px) {
    padding-left: 100%;
    animation: ${marquee} 15s linear infinite;
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

export const NavLinks = styled.ul<{ $open?: boolean }>`
  ${flexCenter};
  list-style: none;
  gap: 20px;

  li a {
    ${flexCenter};
    gap: 6px;
    text-decoration: none;
    color: ${Theme.black};
    font-size: 16px;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    position: absolute;
    top: 17vh;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    background: ${Theme.white};
    padding: 20px 0;
    border-top: 1px solid ${Theme.gray};
    display: ${({ $open }) => ($open ? "flex" : "none")};
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

export const Burger = styled.div`
  display: none;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;

  span {
    width: 25px;
    height: 3px;
    background: ${Theme.black};
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;
