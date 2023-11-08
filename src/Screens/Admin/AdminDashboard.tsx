import { Route, Routes, useNavigate } from "react-router";
import SideBar from "../../components/Sidebar";
import { useEffect } from "react";
import { UserRole } from "../../types/UserRole";

const getSideBarItems = (role: string): { title: string; linkTo: string }[] => {
  console.log("getter");
  return [
    ...(role === UserRole.ADMIN
      ? [
          {
            title: "Users",
            linkTo: "users",
          },
        ]
      : []),
    {
      title: "Edit Scores",
      linkTo: "edit_scores",
    },
  ];
};

const AdminDashboard = ({ role = UserRole.SCORE_EDITOR }) => {
  const navigate = useNavigate();
  const SideBarItems = getSideBarItems(role);

  useEffect(() => {
    navigate(SideBarItems[0].linkTo);
  }, [SideBarItems, navigate]);

  return (
    <>
      <SideBar items={SideBarItems} />
      <div className="admin-content">
        <Routes>
          <Route path="users" element={<div>Users</div>} />
          <Route path="edit" element={<div>Users</div>} />
        </Routes>
      </div>
    </>
  );
};

export default AdminDashboard;
