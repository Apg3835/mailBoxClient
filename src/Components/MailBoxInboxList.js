import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteInboxEmail,
  getEmailDataAction,
  mailReadStausAction,
} from "../reducer/asyncMailBoxReducer";
import { mailBoxDataActions } from "../reducer/mailBoxSlice";
import Badge from "@mui/material/Badge";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: " Sender Email",
  },

  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "Subject",
  },

  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "DELETE",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,

  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function EnhancedTableToolbar(props) {
  return (
    <Toolbar>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Client Inbox
      </Typography>
    </Toolbar>
  );
}

export default function MailBoxInboxList() {
  const dispatch = useDispatch();
  const inboxData = useSelector((state) => state.mailBoxClient.inboxArr);
  const userData = useSelector((state) => state.auth.userProfileData);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");

  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const listedEmailOpenHandler = (row) => {
    dispatch(mailReadStausAction({ key: row.key, email: userData.email }));
    dispatch(mailBoxDataActions.listedEmailFormOpen(row));
    // setTimeout(() => {
    //   dispatch(getEmailDataAction(userData.email));
    // }, 1000);
  };
  const deleteButtonHandler = (key) => {
    dispatch(deleteInboxEmail({ key: key, email: userData.email }));
    // setTimeout(() => {
    //   dispatch(getEmailDataAction(userData.email));
    // }, 1000);
  };

  

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - inboxData.length) : 0;

  return (
    <Box>
      <Paper>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={inboxData.length}
            />
            <TableBody>
              {stableSort(inboxData, getComparator(order, orderBy))
                .slice(page * rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.key}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox"></TableCell>

                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.senderEmail}&nbsp;&nbsp;&nbsp;
                        {row.mailReadStatus === false && (
                          <Badge
                            sx={{ mt: 2 }}
                            color="success"
                            variant="dot"
                          ></Badge>
                        )}
                      </TableCell>
                      <TableCell
                        align="right"
                        onClick={() => listedEmailOpenHandler(row)}
                      >
                        {row.subject}{" "}
                      </TableCell>

                      <TableCell align="right">
                        <DeleteIcon
                          onClick={() => deleteButtonHandler(row.key)}
                          sx={{ color: "#7a6d6d" }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={inboxData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
