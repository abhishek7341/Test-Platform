import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Button } from "@mui/material";
// import styles from "../../../index.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllUsers } from "../../services/user-service";
import AdminSearchBar from "../../components/Form/AdminSearchBar";
import AdminAddButton from "../../components/Form/AdminAddButton";

const UserListing = () => {
  const [data, setData] = useState<readonly any[]>([] as readonly any[]);
  const [keyword, setKeyword] = useState<string | undefined>();

  const columns: GridColDef[] = [
    { field: "firstName", headerName: "First Name", width: 120 },
    { field: "lastName", headerName: "Last Name", width: 120 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "employeeId", headerName: "Employee Id", width: 150 },
    { field: "department", headerName: "Department", width: 150 },
    { field: "status", headerName: "Status", width: 100, sortable: false },
    {
      field: "actions",
      headerName: "Actions",
      width: 400,
      sortable: false,
      renderCell: (params) => (
        <div className="three_buttons_div">
          <Button
            variant="outlined"
            //   onClick={() => handleViewEdit(params.row.id, "view")}
          >
            <VisibilityIcon />
            View
          </Button>
          <Button
            variant="outlined"
            //   onClick={() => handleViewEdit(params.row.id, "edit")}
          >
            <EditIcon />
            Edit
          </Button>
          <Button
            variant="outlined"
            // onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon /> Delete
          </Button>
        </div>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const rows: any = await getAllUsers(
        "api/volunteer/search-volunteer",
        1,
        50,
        "",
        "",
        ""
      );
      const formatteddata = rows.map((record: any) => ({
        ...record,
      }));
      setData(formatteddata);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ height: 650, width: "100%" }}>
      <p style={{ marginLeft: "30px", fontSize: "30px" }}>User</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
          //   marginTop: "10px",
        }}
      >
        {/* <AdminSearchBar onSearch={(key:string)=> } /> */}
        <AdminAddButton pageName="user" />
      </div>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick={true} // Disable selection functionality
      />
    </div>
  );
};

export default UserListing;
