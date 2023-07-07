import AdminPageHeader from "../../components/UI/AdminPageHeader";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import missionServices from "../../services/mission-services";
import Button from "../../components/UI/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { AppRoutings } from "../../utility/enum/app-routings";
import { format } from "date-fns";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface Column {
  id: "title" | "type" | "theme" | "startDate" | "status" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  formatString?: (value: string) => string;
  formatNumber?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "title", label: "Mission Title", minWidth: 170 },
  {
    id: "type",
    label: "Mission Type",
    minWidth: 100,
    formatNumber: (value: number) => value.toLocaleString("en-US"),
  },
  { id: "theme", label: "Mission Theme", minWidth: 170 },
  {
    id: "startDate",
    label: "Start Date",
    minWidth: 100,
    formatString: (value: string) =>
      format(new Date(value), "dd-MM-yyyy").toString(),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    formatNumber: (value: number) => value.toLocaleString("en-US"),
  },
];

interface Data {
  missionTitle: string;
  missionType: number;
  startDate: string;
}

function createData(
  missionTitle: string,
  missionType: number,
  startDate: string
): Data {
  return { missionTitle, missionType, startDate };
}

const MissionListing: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [values, setValues] = useState<Data[]>([]);
  useEffect(() => {
    const fetchMissionList = async () => {
      try {
        const response = await missionServices.getMissionList();
        setValues(response.data.data.result);
      } catch (error) {}
    };
    fetchMissionList();
  }, []);

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
      <Link to={AppRoutings.MissionAdd} style={{ textDecoration: "none" }}>
        <Button>
          <AddIcon sx={{ height: 20, marginLeft: -1 }} /> Add
        </Button>
      </Link>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                  key="crud"
                  align="right"
                  style={{ minWidth: "170px" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {values
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: Record<string, any>) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id !== "type" ? (
                              column.formatNumber &&
                              typeof value === "number" ? (
                                column.formatNumber(value)
                              ) : column.formatString &&
                                typeof value === "string" ? (
                                column.formatString(value)
                              ) : (
                                value
                              )
                            ) : value === 1 ? (
                              <span>time</span>
                            ) : (
                              <span>goal</span>
                            )}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Link
                            to={AppRoutings.MissionEdit + row.id}
                            style={{ textDecoration: "none" }}
                          >
                            <BorderColorOutlinedIcon
                              sx={{ color: "#F88634", marginRight: 1 }}
                            />
                          </Link>
                          <DeleteOutlineIcon sx={{ color: "#757575" }} />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={values.length}
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
