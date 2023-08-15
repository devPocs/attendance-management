import { Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import CreateEmployee from "./subPages/CreateEmployee";
import EditEmployee from "./subPages/EditEmployee";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="create_employee" element={<CreateEmployee />} />
      <Route path="edit_employee" element={<EditEmployee />} />
    </Routes>
  );
}
export default AdminRoutes;
