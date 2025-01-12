import React, { useState } from "react";
import FormPermission from "../../shared/FormPermission";
import { Typography } from "@mui/material";
import { permissionApi } from "../../services/PermissionApi";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import { Fade } from '@mui/material';

export default function AddPermission() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addPermission = async (data) => {
    setLoading(true);
    try {
      console.log(data);
      const response = await permissionApi.post("Permission/permission/add", data);
      console.log(response.data);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error al agregar permiso:", error);
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '10px', marginBottom: '10px', padding: '10px', borderRadius: '8px', boxShadow: '4px 4px 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <Typography
        variant="h4"
        color="primary"
        fontWeight="bold"
        gutterBottom
        sx={{
          textAlign: 'left',
          paddingBottom: '5px',
          marginBottom: '5px',
        }}
      >
        Agregar Permiso
      </Typography>

      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: loading ? 'flex' : 'none',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        open={loading}
      >
        <Fade in={loading} timeout={500}>
          <Box
            sx={{
              textAlign: 'center',
              padding: 3,
              backgroundColor: 'rgba(25, 118, 210, 0.7)',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress size={80} thickness={5} color="inherit" />
            <Typography variant="h6" sx={{ marginTop: 2, color: '#fff' }}>
              Cargando... Por favor espera
            </Typography>
          </Box>
        </Fade>
      </Backdrop>
      {!loading && <FormPermission onSubmit={addPermission} />}
    </div>
  );
}
