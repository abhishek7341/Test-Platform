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
import cmsService from "../../services/cmsService";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { AppRoutings } from "../../utility/enum/app-routings";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { CmsStatus } from "../../utility/enum/cms-status";
import AlertDialog from "../../components/UI/DeleteModal";
import AdminSearchBar from "../../components/Form/AdminSearchBar";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import CustomButton from "../../components/UI/CustomButton";

interface Column {
  id: "title" | "slug" | "status";
  label: string;
  minWidth?: number;
  align?: "right";
  formatString?: (value: string) => string;
  formatNumber?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: "title",
    label: "Title",
    minWidth: 100,
  },
  {
    id: "slug",
    label: "Slug",
    align: "right",
    minWidth: 120,
  },
  {
    id: "status",
    label: "Status",
    align: "right",
    minWidth: 170,
    formatNumber: (value: number) => {
      switch (value) {
        case CmsStatus.Active:
          return "Active";
        case CmsStatus.Inactive:
          return "Inactive";
        case CmsStatus.Deleted:
          return "Deleted";
        default:
          return "Removed";
      }
    },
  },
];

interface Data {
  id: number;
  title: string;
  status: number;
  slug: string;
}
interface pagination {
  pageNo: number;
  pageSize: number;
  totalRecords: number;
}

const paginationData: pagination = {
  pageNo: 0,
  pageSize: 5,
  totalRecords: 0,
};

const CMSPage: React.FC = () => {
  const [delTrigger, setDelTrigger] = useState(0);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(paginationData.pageSize);
  const [values, setValues] = useState<Data[]>([]);

  const [searchKey, setSearchKey] = useState<string | undefined>();
  const [paginationValue, setPaginationValue] =
    useState<pagination>(paginationData);

  const fetchContent = async () => {
    try {
      const response = await cmsService.getContent(searchKey, paginationValue);
      paginationData.totalRecords = response.data.data.totalRecords;
      setPaginationValue(paginationData);
      setValues(response.data.data.result);
    } catch (error) {}
  };

  useEffect(() => {
    const data = setTimeout(() => {
      fetchContent();
    }, 500);
    return () => clearTimeout(data);
  }, [searchKey, paginationValue.pageNo, paginationValue.pageSize]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    paginationData.pageNo = newPage;
    setPaginationValue(paginationData);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    paginationData.pageSize = +event.target.value;
    paginationData.pageNo = 0;
    setPaginationValue(paginationData);
    setPage(0);
  };

  const handleSearch = (keyword: string) => {
    setSearchKey(keyword);
    paginationData.pageNo = 0;
    setPaginationValue(paginationData);
  };

  const deleteContent = async (id: number) => {
    try {
      await cmsService.deleteRecord(id);
      setDelTrigger(delTrigger + 1);
    } catch (error) {}
  };

  return (
    <>
      <AdminPageHeader>CMS</AdminPageHeader>
      <Typography
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <AdminSearchBar onSearch={handleSearch} />
        <Link to={AppRoutings.CMSAdd} style={{ textDecoration: "none" }}>
          <CustomButton>
            <AddIcon sx={{ height: 20, marginLeft: -1 }} /> Add
          </CustomButton>
        </Link>
      </Typography>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440, marginTop: "16px" }}>
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
              {values.map((row: Record<string, any>) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id !== "status"
                          ? column.formatNumber && typeof value === "number"
                            ? column.formatNumber(value)
                            : column.formatString && typeof value === "string"
                            ? column.formatString(value)
                            : value
                          : (() => {
                              switch (value) {
                                case CmsStatus.Active:
                                  return <div>Active</div>;
                                case CmsStatus.Inactive:
                                  return <div>Inactive</div>;
                                case CmsStatus.Deleted:
                                  return <div>Deleted</div>;
                                default:
                                  return <div>Removed</div>;
                              }
                            })()}
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
                        to={AppRoutings.CMSEdit + row.id}
                        style={{ textDecoration: "none" }}
                      >
                        <BorderColorOutlinedIcon
                          sx={{ color: "#F88634", marginRight: 1 }}
                        />
                      </Link>

                      <AlertDialog contentId={row.id} onDelete={deleteContent}>
                        <DeleteOutlineIcon sx={{ color: "#757575" }} />
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[2, 5, 10, 25, 100]}
          component="div"
          count={paginationValue.totalRecords}
          rowsPerPage={rowsPerPage}
          page={paginationValue.pageNo}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default CMSPage;
