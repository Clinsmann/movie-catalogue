import { Link, useLocation } from "react-router-dom";
import "./styles.scss";

interface LinkProp {
  to: string;
  children: React.ReactNode;
  [key: string]: any;
}

export const LinkWithQuery: React.FC<LinkProp> = ({
  children,
  to,
  ...props
}) => {
  const { search } = useLocation();
  return (
    <Link className="link" to={to + search} {...props}>
      {children}
    </Link>
  );
};
