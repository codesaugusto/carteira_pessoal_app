import React from "react";

type HeaderProps = {
  children?: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return <div className="">{children}</div>;
};

export default Header;
