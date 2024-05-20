import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { mockDataContacts } from "../../data/mockData";

const Contacts = () => {
  const theme = useTheme();

  // تعيين ألوان الخلفية والنص
  const backgroundColor = theme.palette.background.paper;
  const textColor = theme.palette.text.primary;

  // تعريف الأعمدة
  const columns = [
    { field: "id", headerName: "الرقم التسلسلي", flex: 0.5 },
    { field: "registrarId", headerName: "رقم السجل" },
    { field: "name", headerName: "الاسم", flex: 0.5 },
    { field: "age", headerName: "العمر", type: "number" },
    { field: "phone", headerName: "رقم الهاتف" },
    { field: "email", headerName: "البريد الإلكتروني" },
    { field: "address", headerName: "العنوان" },
    { field: "city", headerName: "المدينة" },
    { field: "zipCode", headerName: "الرمز البريدي" },
  ];

  return (
    <Box m="20px" textAlign="right"> {/* تحديد اتجاه النص إلى اليمين */}
      <Typography variant="h5" gutterBottom>
        الجهات الاتصال
      </Typography>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": { 
            textAlign: "right", // تحديد اتجاه النص إلى اليمين
            color: textColor, // تعيين لون النص
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: backgroundColor, // تعيين لون خلفية رأس العمود
          },
          "& .MuiDataGrid-row": {
            backgroundColor: "transparent", // إزالة خلفية الصفوف لتبديل الألوان
          },
        }}
      >
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          style={{ direction: 'rtl' }}
          pageSize={5} // عدد الصفوف في كل صفحة
          rowsPerPageOptions={[5, 10, 20]} // خيارات عدد الصفوف في كل صفحة
          pagination
        />
      </Box>
    </Box>
  );
};

export default Contacts;
