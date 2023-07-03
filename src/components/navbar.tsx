import React from "react";

const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  JOIN_SESSION: (id: string, role?: number) =>
    `/join-session/${id}?role=${role || 0}`,
};

const Navbar = () => {
  return <div>Navbar</div>;
};

export default Navbar;
