import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import React from "react";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import IPropsToGlobalTable from "../types/IPropsToGlobalTable";



export default function GlobalTable(props: IPropsToGlobalTable) {
    const rows = props.rows;
  
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  
    const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
    ) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    return (
      <TableContainer component={Paper}>
        <div>
          <Table sx={{ minWidth: 100 }} aria-label="custom pagination table">
            <TableHead style={{ height: '10px', fontStyle: "inherit" }}>
              <TableRow>
                {props.head.map((e: string) => <TableCell>{e}</TableCell>)}
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((row: any) => (
  
                <TableRow key={row.id} style={{ height: "20px" }} >
                  {Object.keys(row).map((key) => (
                    key!=="id"?
                     <TableCell key={key} component="th" scope="row">
                        {row[key]}
                     </TableCell>:""
                  ))}
                  <TableCell ><IconButton aria-label="add an alarm">
                    <EditIcon />
                  </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow >
                  <TableCell colSpan={6} />
                </TableRow>
  
  
              )}
            </TableBody>
            <TableFooter>
              <TableRow><TableCell><IconButton aria-label="add an alarm">
  
                <AddIcon />
              </IconButton>
                {`add ${props.whatToAdd}`} 
              </TableCell>
                <TablePagination
                  rowsPerPageOptions={[3, 5, 10, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
  
          </Table>
        </div>
  
      </TableContainer>
    );
  }