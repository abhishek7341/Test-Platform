import AdminPageHeader from "../../components/AdminPageHeader";
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

interface Column {
  id: "missionTitle" | "missionType" | "startDate" | "endDate" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const actionData = (
  <div>
    <span>Add</span>
    <span>Edit</span>
    <span>Del</span>
  </div>
);

const columns: readonly Column[] = [
  { id: "missionTitle", label: "Mission Title", minWidth: 170 },
  { id: "missionType", label: "Mission Type", minWidth: 100 },
  {
    id: "startDate",
    label: "Start Date",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "endDate",
    label: "End Date",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  missionTitle: string;
  missionType: string;
  startDate: number;
  endDate: number;
  action: number;
}

function createData(
  missionTitle: string,
  missionType: string,
  startDate: number,
  endDate: number
): Data {
  const action = startDate / endDate;
  return { missionTitle, missionType, startDate, endDate, action };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
];

const MissionListing = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <AdminPageHeader>Mission</AdminPageHeader>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.missionTitle}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};
export default MissionListing;
