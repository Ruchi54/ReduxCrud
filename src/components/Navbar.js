import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="add_user">
        <Link to="/user/add">
          <button>Add user</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
