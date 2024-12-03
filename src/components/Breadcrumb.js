import React from "react";
import { useLocation, Link } from "react-router-dom";
import Breadcrumbs from "./../styles/Breadcrumb.css";

const capitalizeWords = (str) => {
  return str
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const allowedRoutes = ["/cadastro-de-cliente", "/outra-pagina"];
  const isBreadcrumbVisible = allowedRoutes.includes(location.pathname);

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
