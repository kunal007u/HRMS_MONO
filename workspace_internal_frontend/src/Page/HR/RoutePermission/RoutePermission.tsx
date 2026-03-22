import { Box, Button, Checkbox, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Field, FieldArray, Formik } from 'formik';
import React from 'react';
import { Form, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IColumn } from '../../../Models/base-type';
import { IRoleModel, IRolePermissionModel, IRoleRouteModel } from '../../../Models/role';
import { IRoutesModel } from '../../../Models/routes/routesM';
import { Routing } from '../../../Routes/routing';
import roleService from '../../../Services/role-service';
import routeService from '../../../Services/route-service';
import messages from '../../../Shared/constants/messages';
import { Modules } from '../../../Shared/enums/modules';
import FormikCheckBox from '../../../Shared/formik-fields/FormikCheckBox';
import FormikInput from '../../../Shared/formik-fields/FormikInput';
import { getModulePermission } from '../../../utils/commanFunctions';
import "./role.css";

type ParamsType = {
  id?: string;
};

const RoutePermission = () => {
  const navigate = useNavigate();
  const { id }: ParamsType = useParams();

  const columns: Array<IColumn> = React.useMemo(
    () => [
      {
        name: 'Route',
        data: 'routes',
      },
      {
        name: 'Create',
        data: 'canCreate',
        width: 200,
      },
      {
        name: 'Read',
        data: 'canRead',
        width: 200,
      },
      {
        name: 'Update',
        data: 'canUpdate',
        width: 200,
      },
      {
        name: 'Delete',
        data: 'canDelete',
        width: 200,
      },
    ],
    [],
  );

  const [rolePermission, setRolePermission] = React.useState<IRoleModel>({
    id: 0,
    name: '',
    permissions: [],
    isActive: true,
  });

  const { data: permission } = useQuery({
    queryKey: ["modulePermission"],
    queryFn: () => getModulePermission(Modules.RoutePermission),
  });

  // Only called when id is not null
  const { data: getRolePermisions } = useQuery({
    queryKey: ["getRolePermission", id],
    queryFn: async () => {
      const response = await roleService.getRolePermissionsByID(id!);
      setRolePermission(response?.data?.data);
      return response?.data?.data;
    },
    enabled: id ? true : false
  })

  const { data: getRoutes } = useQuery({
    queryKey: ["getRoutePermission"],
    queryFn: async () => {
      const response = await routeService.getAllRoutes();
      return response?.data?.data;
    }
  })

  const getData = () => {
    if (rolePermission?.id) {
      return {
        ...rolePermission,
        permissions: rolePermission?.routes?.map((permission: IRoleRouteModel) => {
          return {
            routeId: permission.id,
            name: permission.name,
            canCreate: permission?.permissions?.canCreate ? permission?.permissions?.canCreate : false,
            canRead: permission?.permissions?.canRead ? permission?.permissions?.canRead : false,
            canUpdate: permission?.permissions?.canUpdate ? permission?.permissions?.canUpdate : false,
            canDelete: permission?.permissions?.canDelete ? permission?.permissions?.canDelete : false,
          };
        }),
      };
    } else {
      return {
        ...rolePermission,
        permissions: getRoutes?.map((permission: IRoutesModel) => {
          return {
            routeId: permission.id,
            name: permission.name,
            canCreate: false,
            canRead: false,
            canUpdate: false,
            canDelete: false,
          } as IRolePermissionModel;
        }),
      };
    }
  };

  const handleSubmit = async (role: IRoleModel) => {
    const newPermissions = role?.permissions?.map((x: IRolePermissionModel) => {
      return {
        routeId: x.routeId,
        canCreate: x?.canCreate ? x?.canCreate : false,
        canRead: x?.canRead ? x?.canRead : false,
        canUpdate: x?.canUpdate ? x?.canUpdate : false,
        canDelete: x?.canDelete ? x?.canDelete : false,
      };
    });
    const newrole = { id: role?.id, name: role?.name, isActive: role?.isActive, permissions: newPermissions };

    if (role?.id) {
      await roleService
        .updateRole(newrole)
        .then((response) => {
          if (response?.data?.status?.code) {
            toast.success(response?.data?.status?.message);
            navigate(Routing.Roles);
          }
        })
        .catch((error: Error) => toast.error(error?.message));
    } else {
      await roleService
        .createRole(role)
        .then((response) => {
          if (response?.data?.status?.code) {
            toast.success(response?.data?.status?.message);
            navigate(Routing.Roles);
          }
        })
        .catch((error: Error) => toast.error(error?.message));
    }
  };

  const checkPermissions = (rolePermissions: IRolePermissionModel[], data: string) => {
    switch (data) {
      case 'canCreate':
        return rolePermissions?.some(
          (rolePermission: IRolePermissionModel) => rolePermission?.canCreate === false,
        );
      case 'canDelete':
        return rolePermissions?.some(
          (rolePermission: IRolePermissionModel) => rolePermission?.canDelete === false,
        );
      case 'canRead':
        return rolePermissions?.some(
          (rolePermission: IRolePermissionModel) => rolePermission?.canRead === false,
        );
      case 'canUpdate':
        return rolePermissions?.some(
          (rolePermission: IRolePermissionModel) => rolePermission?.canUpdate === false,
        );
      default:
        return false;
    }
  };

  const handleSelectAll = (value, data, permissions, setFieldValue) => {
    switch (data) {
      case 'canCreate':
        permissions?.map((permission: IRolePermissionModel, index: number) => {
          setFieldValue(`permissions.${index}.canCreate`, value);
        });
        break;
      case 'canRead':
        permissions?.map((permission: IRolePermissionModel, index: number) => {
          setFieldValue(`permissions.${index}.canRead`, value);
        });
        break;
      case 'canUpdate':
        permissions?.map((permission: IRolePermissionModel, index: number) => {
          setFieldValue(`permissions.${index}.canUpdate`, value);
        });
        break;
      case 'canDelete':
        permissions?.map((permission: IRolePermissionModel, index: number) => {
          setFieldValue(`permissions.${index}.canDelete`, value);
        });
        break;
    }
  };

  return (
    <>
      <section>
        <Formik
          initialValues={getData()}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          validateOnBlur={false}
          validateOnChange={true}
        >
          {(props) => {
            const { handleSubmit, setFieldValue, values } = props;
            return (
              <Form onSubmit={handleSubmit} noValidate>
                <>
                  <div className="page-title-with-action">
                    {permission && permission?.canUpdate && (
                      <Button size="medium" variant="contained" disableElevation type="submit" className='btn'>
                        {id ? 'Update' : 'Save'}
                      </Button>
                    )}
                    <Button
                      size="medium"
                      variant="outlined"
                      className="ml-1 outlinedBtn"
                      disableElevation
                      onClick={() => navigate(-1)}

                    >
                      Back
                    </Button>
                  </div>
                  {/* </div> */}
                  <Box className="white-box-graph">
                    <Grid container spacing={3}>
                      <Grid item sm={6} xs={12}>
                        <Field label="Name" type="text" name="name" component={FormikInput} />
                      </Grid>
                      {values?.id > 0 && (
                        <Grid item sm={6} xs={12}>
                          <Field label="Active" name="isActive" component={FormikCheckBox} />
                        </Grid>
                      )}
                      <Grid item xs={12}>
                        <TableContainer className='white-box'>
                          <Table className='RolePermission-Table'>
                            <TableHead style={{ textAlign: 'left' }}>
                              <TableRow>
                                {columns?.map(
                                  ({ data, name, className, width }:IColumn, index) => {
                                    return (
                                      <TableCell
                                        key={data}
                                        className={className}
                                        width={width}
                                        sx={{ pb: 0 }}
                                      >
                                        {index !== 0 && (
                                          <Checkbox
                                            checked={
                                              !checkPermissions(
                                                values?.permissions ?? [],
                                                data,
                                              )
                                            }
                                            onChange={(e) => {
                                              const value = e?.target?.checked;
                                              handleSelectAll(value, data, values?.permissions, setFieldValue);
                                            }}
                                          />
                                        )}{' '}
                                        {name}
                                      </TableCell>
                                    )
                                  }

                                )}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {values?.permissions ? (
                                <FieldArray name="permissions">
                                  {() => {
                                    return values?.permissions?.map((option: IRolePermissionModel, index) => (
                                      <TableRow key={index}>
                                        <TableCell>{option?.name}</TableCell>
                                        <TableCell sx={{ pl: 2.5 }}>
                                          <Field
                                            name={`permissions.${index}.canCreate`}
                                            checked={values?.permissions![index]?.canCreate}
                                            component={FormikCheckBox}
                                          />
                                        </TableCell>
                                        <TableCell sx={{ pl: 4 }}>
                                          <Field
                                            name={`permissions.${index}.canRead`}
                                            checked={values?.permissions![index]?.canRead}
                                            component={FormikCheckBox}
                                          />
                                        </TableCell>
                                        <TableCell sx={{ pl: 3.5 }}>
                                          <Field
                                            name={`permissions.${index}.canUpdate`}
                                            checked={values?.permissions![index]?.canUpdate}
                                            component={FormikCheckBox}
                                          />
                                        </TableCell>
                                        <TableCell sx={{ pl: 3.5 }}>
                                          <Field
                                            name={`permissions.${index}.canDelete`}
                                            checked={values?.permissions![index]?.canDelete}
                                            component={FormikCheckBox}
                                          />
                                        </TableCell>
                                      </TableRow>
                                    ),
                                    );
                                  }}
                                </FieldArray>
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={8}>
                                    {messages.NoRecordsFound}
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                    </Grid>
                  </Box>{' '}
                </>
              </Form>
            );
          }}
        </Formik>
      </section>
    </>
  )
}

export default RoutePermission