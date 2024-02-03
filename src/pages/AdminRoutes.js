import { Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import CreateEmployee from "./subPages/CreateEmployee";
import EditEmployee from "./subPages/EditEmployee";
import GetEmployeeTimeIns from "./subPages/GetEmployeeTimes";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="create_employee" element={<CreateEmployee />} />
      <Route path="edit_employee" element={<EditEmployee />} />
      <Route path="get_employee_times" element={<GetEmployeeTimeIns />} />
    </Routes>
  );
}
export default AdminRoutes;
