import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import "./Sidebar.css";
import { Link, NavLink } from "react-router-dom";
import { BiAddToQueue } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";
import { Button } from "react-bootstrap";
import { useContextTheme } from "../../custom-hooks/useContextTheme";

const Sidebar = () => {
  const { currentTheme, toggleTheme } = useContextTheme();
  return (
    <ul className="list">
      <li className="list-item">
        <NavLink to="/">
          <AiFillHome size={25} className="icon" />
          <div>Dahboard</div>
        </NavLink>
      </li>

      <li className="list-item">
        <NavLink to="/add">
          <BiAddToQueue size={25} className="icon" />
          <div>Add Expense</div>
        </NavLink>
      </li>

      <li className="list-item">
        <NavLink to="/search">
          <FiSearch size={25} className="icon" />
          <div>Serach Expense</div>
        </NavLink>
      </li>
      <li className="list-item">
        <NavLink to="/profile">
          <BsFillPersonFill size={25} className="icon" />
          <div>Profile</div>
        </NavLink>
      </li>
      <li className="list-item">
        <Link to="/">
          <AiOutlineLogout size={25} className="icon" />
          <div>Logout</div>
        </Link>
      </li>
      <li className="list-item">
        <Button variant="info" className="mode-toggle" onClick={toggleTheme}>
          Toggle Light / Dark mode
        </Button>
      </li>
    </ul>
  );
};

export default Sidebar;
