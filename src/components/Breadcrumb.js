import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./../styles/Breadcrumb.css";

const capitalizeWords = (str) => {
  return str
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const allowedRoutes = ["/cadastro-de-cliente", "/cadastro-de-cliente/pedidos"];

  const isBreadcrumbVisible = allowedRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  if (!isBreadcrumbVisible) return null;

  return (
    <nav>
      <ul className="breadcrumb">
        <li className="breadcrumb-link">
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const name = capitalizeWords(value.replace(/-/g, " "));

          if (to === "/pedidos" && !pathnames.includes("cadastro-de-cliente")) {
            return null;
          }

          return (
            <li key={to} className="breadcrumb-link">
              <Link to={to}>{name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;