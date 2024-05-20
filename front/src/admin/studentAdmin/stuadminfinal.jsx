import "../Dash/admindash.css";
import StudentsTable from "./StuAdmin";
import Sidebar from "../Dash/AdminSidebar";

function StuAdminp() {
  return (
    <div className="Appadmin">
      <div
        className="AppGlassadmin"
        style={{ maxHeight: "100vh", overflowY: "auto" }}
      >
        <Sidebar />
        <StudentsTable />
      </div>
    </div>
  );
}

export default StuAdminp;
