import { LinkWithQuery } from "../linkWithQuery";
import "./styles.scss";

interface NavBarProps {
  hasBackButton?: boolean;
}
export const PAGE_TITLE = "Movies";
const LEFT_ARROW_ICON =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABmJLR0QA/wD/AP+gvaeTAAAAkUlEQVQokb3SPQ4BARCG4YdOJxuFO6gcxDVUEiISrSso9jCOoeEOeslGYRU7xRabmEW8/TvzzQ9/YIoVir7iAjfUWGelEUo8QzxhnBFnOIdUYY/hO2kQ0aoQL5hnuhURrY6oZURPsQmxxjEr/aQzzcxL3KPIVXLmNu1tP3CQ2Habrjt/9WG7vjLNb28x+UTu5AWVZiTNdknzfgAAAABJRU5ErkJggg==";

export const NavBar: React.FC<NavBarProps> = ({ hasBackButton }) => (
  <div className="nav-bar">
    {hasBackButton ? (
      <LinkWithQuery to="/movies">
        <img className="back-icon" src={LEFT_ARROW_ICON} />
        All movies
      </LinkWithQuery>
    ) : (
      <div>{PAGE_TITLE}</div>
    )}
  </div>
);
