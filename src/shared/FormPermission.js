import React from "react";
import PropTypes from "prop-types";
import { Field, Form, Formik } from 'formik';
import {
    Button,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import moment from "moment";
import * as Yup from 'yup';
import { usePermissionTypeList } from "../hooks/usePermissionTypeList";

const formValidation = Yup.object({
    employeeName: Yup.string().required('Campo requerido'),
    employeeSurname: Yup.string().required('Campo requerido'),
    permissionTypeId: Yup.string().required('Campo requerido'),
});

const FormPermission = ({ data, onSubmit }) => {
    const inputStyle = {
        marginTop: '16px',
        marginBottom: '16px',
    };

    const { permissionTypeList } = usePermissionTypeList();

    return (
        <Formik
            initialValues={{
                employeeName: data?.employeeName ?? '',
                employeeSurname: data?.employeeSurname ?? '',
                permissionTypeId: data?.permissionTypeId ?? '',
                permissionDate: moment(data?.permissionDate).format("YYYY-MM-DD") ?? '',
            }}
            validationSchema={formValidation}
            onSubmit={onSubmit}
        >
            {({
                values,
                touched,
                errors,
                handleSubmit,
                setFieldValue,
            }) => (
                <Form onSubmit={handleSubmit} data-testid="permissionForm">
                    <Field
                        required
                        fullWidth
                        htmlFor="employeeName"
                        id="employeeName"
                        name="employeeName"
                        label="Nombre Empleado"
                        variant="outlined"
                        as={TextField}
                        data-testid="employeeName"
                    />
                    <Field
                        required
                        fullWidth
                        htmlFor="employeeSurname"
                        id="employeeSurname"
                        name="employeeSurname"
                        label="Apellido Empleado"
                        variant="outlined"
                        as={TextField}
                        style={inputStyle}
                        error={touched.employeeSurname && Boolean(errors.employeeSurname)}
                        helperText={touched.employeeSurname && errors.employeeSurname}
                        data-testid="employeeSurname"
                    />
                    <InputLabel id="permissionType-label">Tipo de Permiso</InputLabel>
                    <Field name="permissionTypeId">
                        {({ field }) => (
                            <Select
                                {...field}
                                labelId="permissionType-label"
                                label="Tipo de Permiso"
                                error={touched.permissionTypeId && Boolean(errors.permissionTypeId)}
                                value={values.permissionTypeId || ''}

                                onChange={(e) => setFieldValue('permissionTypeId', e.target.value)}
                                fullWidth
                            >
                                <MenuItem value="">
                                    <em>Selecciona un tipo de permiso</em>
                                </MenuItem>
                                {permissionTypeList.length > 0 ? (
                                    permissionTypeList.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.description}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem value="">
                                        <em>Cargando...</em>
                                    </MenuItem>
                                )}
                            </Select>
                        )}
                    </Field>

                    <Field
                        required
                        fullWidth
                        htmlFor="permissionDate"
                        id="permissionDate"
                        name="permissionDate"
                        as={TextField}
                        label="Fecha Permiso"
                        variant="outlined"
                        type="date"
                        style={inputStyle}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        data-testid="permissionDate"
                    />
                    <Button type="submit" variant="contained" color="primary" style={inputStyle}>
                        Guardar
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

FormPermission.propTypes = {
    data: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
};

export default FormPermission;
