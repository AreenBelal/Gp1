import "../Dash/admindash.css";
import TeachesTable from "./techadmin";
import Sidebar from "../Dash/AdminSidebar";

function TechAdminp() {
  return (
    <div className="Appadmin">
      <div
        className="AppGlassadmin"
        style={{ maxHeight: "100vh", overflowY: "auto" }}
      >
        <Sidebar />
        <TeachesTable />
      </div>
    </div>
  );
}

export default TechAdminp;
