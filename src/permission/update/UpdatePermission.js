import React from "react";
import FormPermission from "../../shared/FormPermission"
import { Typography } from "@mui/material";
import { permissionApi } from "../../services/PermissionApi";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdatePermission() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const updatePermission = async (data) => {
    data.id = state.id;
    const response = await permissionApi.put("Permission/permission/update", data);
    if (response.status == 200) {
      navigate("/");
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
        Editar Permiso
      </Typography>
      <FormPermission onSubmit={updatePermission} data={state}></FormPermission>
    </div>

  );
}