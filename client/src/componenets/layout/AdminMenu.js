import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group dashboard-menu">
          <h4>Admin Panel</h4>

          <NavLink
            to="/dashboard/author/create-story"
            className="list-group-item list-group-item-action"
          >
            Create Story
          </NavLink>
          <NavLink
            to="/dashboard/author/story"
            className="list-group-item list-group-item-action"
          >
            Products
          </NavLink>

          {/* <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink> */}
        </div>
      </div>
    </>
  );
};

export default AdminMenu;