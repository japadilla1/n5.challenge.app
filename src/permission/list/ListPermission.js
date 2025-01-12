import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { usePermissionList } from "../../hooks/usePermissionList";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";
import TablePagination from '@mui/material/TablePagination';
import moment from "moment";

export default function ListPermission() {
  const { permissionList } = usePermissionList();
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (data) => {
    navigate("/update", { state: data });
  };

  const handleAdd = () => {
    navigate("/add");
  };

  const rowsToDisplay = permissionList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>
      <div style={{ marginTop: '10px', marginBottom: '10px', padding: '10px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <Typography
          variant="h4"
          color="primary"
          fontWeight="bold"
          gutterBottom
          sx={{
            textAlign: 'center',
            paddingBottom: '5px',
            marginBottom: '5px',
          }}
        >
          Lista de Permisos
        </Typography>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAdd}
        >
          Agregar Permiso
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="Lista de permisos">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Nombres</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Apellidos</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Descripción Permiso</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Fecha Permiso</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsToDisplay.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.employeeName}
                </TableCell>
                <TableCell align="right">{row.employeeSurname}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{moment(row.permissionDate).format('DD/MM/YYYY')}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Editar" arrow>
                    <Button
                      variant="outlined"
                      color="info"
                      onClick={() => handleEdit(row)}
                    >
                      <EditIcon />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={permissionList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
