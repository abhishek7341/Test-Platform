import {
  Button,
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
import { Box } from "@mui/system";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminSearchBar from "../../components/Form/AdminSearchBar";
import CustomButton from "../../components/UI/CustomButton";
import { AppRoutings } from "../../utility/enum/app-routings";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteBanner, getAllBanners } from "../../services/bannerService";
import { useDebounce } from "../../utility/helper";
import { async } from "q";
import { IGetListPayload } from "../../utility/interfaces/payload";
import { number } from "yup";
import { IBannerData } from "../../utility/interfaces/banner";
import { toast } from "react-toastify";
import DeleteDialog from "../../components/UI/DeleteDialog";
import {
  INITIAL_PAGE_NUMBER,
  INITIAL_ROWSIZE,
  PAGE_OPTIONS,
} from "../../utility/constants";

interface Column {
  id:
    | "bannerText"
    | "id"
    | "bannerImagePath"
    | "status"
    | "sortOrder"
    | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "id", label: "No.", minWidth: 50 },
  { id: "bannerImagePath", label: "Banner", minWidth: 60 },
  {
    id: "bannerText",
    label: "Description",
    minWidth: 170,
  },
  {
    id: "sortOrder",
    label: "Order",
    minWidth: 40,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 80,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 60,
  },
];

const BannerListing = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  // const [,setSortOrder] = useState(true)
  const [page, setPage] = useState(INITIAL_PAGE_NUMBER);
  const totalRecord = useRef<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(INITIAL_ROWSIZE);
  const [data, setData] = useState<IBannerData[]>([]);
  const [keyword, setKeyword] = useState<string>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const deleteId = useRef("");
  const [sortedColumn, setSortedColumn] = useState<string>();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const payload: IGetListPayload = {
        pageNumber: page + 1,
        pageSize: rowsPerPage,
        searchKey: keyword,
        sortBy: sortedColumn,
        sortOrder: sortDirection === "asc" ? "ascending" : "descending",
      };
      const rows = await getAllBanners(payload);
      setData(rows.data.data.result);
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
    setOpenDialog(true);
    deleteId.current = id;
  };

  const deleteConfirm = async () => {
    try {
      const response = await deleteBanner(deleteId.current);
      setIsLoading(true);
      toast.success(response.data.message);
      fetchData();
    } catch (err) {
      console.log(err);
    }
    setOpenDialog(false);
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
          message="Are you sure you want to delete this banner?"
        />
      )}
      <Typography variant="h4">Banner</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2rem",
        }}
      >
        <AdminSearchBar
          onSearch={(key) => (setIsLoading(true), setKeyword(key), setPage(0))}
        />
        <CustomButton onClick={() => navigate(AppRoutings.BannerAdd)}>
          + Add
        </CustomButton>
      </Box>
      {isLoading ? (
        <Box sx={{ textAlign: "center", marginTop: "2rem" }}>
          <CircularProgress sx={{ color: "orange" }} />
        </Box>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map(
                    (column) =>
                      column.id != "id" && (
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
                      )
                  )}
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
                                }}
                              >
                                <Link
                                  to={AppRoutings.BannerEdit + row.id}
                                  style={{ textDecoration: "none" }}
                                >
                                  <IconButton>
                                    <BorderColorOutlinedIcon
                                      sx={{ color: "#F88634" }}
                                    />
                                  </IconButton>
                                </Link>
                                <IconButton
                                  onClick={() => handleDelete(row.id as string)}
                                >
                                  <DeleteOutlineIcon
                                    sx={{ color: "#F88634" }}
                                  />
                                </IconButton>
                              </div>
                            );
                          return (
                            column.id !== "id" && (
                              <TableCell key={column.id} align={column.align}>
                                {column.id === "bannerImagePath" ? (
                                  <img
                                    src={value?.toString()}
                                    width="180px"
                                    alt="image"
                                  />
                                ) : (
                                  value
                                )}
                              </TableCell>
                            )
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              ) : (
                <TableBody>
                  <TableCell sx={{ textAlign: "center" }} colSpan={6}>
                    No record Found
                  </TableCell>
                </TableBody>
              )}
            </Table>
          </TableContainer>
          {totalRecord.current > 0 && (
            <TablePagination
              rowsPerPageOptions={PAGE_OPTIONS}
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
export default BannerListing;
