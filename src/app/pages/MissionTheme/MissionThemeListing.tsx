import { toast } from "react-toastify";
import { Box } from "@mui/system";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import AdminSearchBar from "../../components/Form/AdminSearchBar";
import CustomButton from "../../components/UI/CustomButton";
import { AppRoutings } from "../../utility/enum/app-routings";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IGetListPayload } from "../../utility/interfaces/payload";
import {
  deleteMissionTheme,
  getAllMissionTheme,
} from "../../services/missionTheme-service";
import { useDebounce } from "../../utility/helper";
import DeleteDialog from "../../components/UI/DeleteDialog";
import { INITIAL_PAGE_NUMBER, INITIAL_ROWSIZE } from "../../utility/constants";
import { type } from "os";
import { Sort } from "../../utility/enum/sort";

interface Column {
  id: "id" | "title" | "status" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "id", label: "No.", minWidth: 50 },
  { id: "title", label: "Theme name", minWidth: 60 },
  {
    id: "status",
    label: "Status",
    minWidth: 80,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 60,
    align: "right",
  },
];

interface Data {
  id: string;
  title: string;
  status: string;
}

type AscDescType = "asc" | "desc";
const MissionThemeListing = () => {
  const [page, setPage] = useState(INITIAL_PAGE_NUMBER);
  const [rowsPerPage, setRowsPerPage] = useState(INITIAL_ROWSIZE);
  const [data, setData] = useState<Data[]>([]);
  const totalRecord = useRef<number>(0);
  const [keyword, setKeyword] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const deleteId = useRef<string>("");
  const [sortedColumn, setSortedColumn] = useState<string>();
  const [sortDirection, setSortDirection] = useState<AscDescType>();

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const payload: IGetListPayload = {
        searchKey: keyword,
        pageNumber: page + 1,
        pageSize: rowsPerPage,
        sortBy: sortedColumn,
        sortOrder: sortDirection === "asc" ? Sort.Desc : Sort.Asc,
      };
      const rows = await getAllMissionTheme(payload);
      const formattedData = rows.data.data.result.map((record: any) => {
        let status;
        switch (record.status) {
          case 0:
            status = "Deleted";
            break;
          case 1:
            status = "Inactive";
            break;
          default:
            status = "Active";
            break;
        }
        return {
          ...record,
          status: status,
        };
      });
      setData(formattedData);
      totalRecord.current = rows.data.data.totalRecords;
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useDebounce(fetchData, [keyword, page, rowsPerPage, sortDirection]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setIsLoading(true);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsLoading(true);
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (id: string) => {
    deleteId.current = id;
    setOpenDialog(true);
  };

  const deleteConfirm = async () => {
    try {
      const response = await deleteMissionTheme(deleteId.current);
      setOpenDialog(false);
      toast.success(response.data.message);
      fetchData();
    } catch (err: any) {
      console.log(err.response.data.Errors);
    }
  };

  const handleSort = (column: string) => {
    setSortedColumn(column);
    setSortDirection(
      column == sortedColumn && sortDirection == "asc" ? "desc" : "asc"
    );
  };

  return (
    <Box>
      {openDialog && (
        <DeleteDialog
          handleDelete={deleteConfirm}
          handleCancel={() => setOpenDialog(false)}
          message="Are you sure you want to delete this theme?"
        />
      )}
      <Typography variant="h4">Mission Theme</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2rem",
        }}
      >
        <AdminSearchBar
          onSearch={(key) => (
            setKeyword(key), setIsLoading(true), setPage(INITIAL_PAGE_NUMBER)
          )}
        />
        <CustomButton onClick={() => navigate(AppRoutings.ThemeAdd)}>
          + Add
        </CustomButton>
      </Box>
      {isLoading ? (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress sx={{ color: "orange" }} />
        </Box>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.id !== "action" ? (
                        <TableSortLabel
                          active={sortedColumn === column.label}
                          direction={sortDirection}
                          onClick={() => handleSort(column.id)}
                        >
                          {column.label}
                        </TableSortLabel>
                      ) : (
                        column.label
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {totalRecord.current > 0 ? (
                <TableBody>
                  {data.map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          const value =
                            column.id !== "action" ? (
                              row[column.id]
                            ) : (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <Link
                                  to={AppRoutings.ThemeEdit + row.id}
                                  style={{ textDecoration: "none" }}
                                >
                                  <BorderColorOutlinedIcon
                                    sx={{ color: "#F88634", marginRight: 1 }}
                                  />
                                </Link>
                                <IconButton
                                  onClick={() => handleDelete(row.id)}
                                >
                                  <DeleteOutlineIcon
                                    sx={{ color: "#F88634" }}
                                  />
                                </IconButton>
                              </div>
                            );
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              ) : (
                <TableBody>
                  <TableCell colSpan={4} sx={{ textAlign: "center" }}>
                    No records found.
                  </TableCell>
                </TableBody>
              )}
            </Table>
          </TableContainer>

          {totalRecord.current > 0 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={totalRecord.current}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      )}
    </Box>
  );
};

export default MissionThemeListing;
