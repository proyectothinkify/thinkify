import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink } from "react-router-dom";
import {
  Alert,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { startCreatingUser } from "../../store/auth/thunks";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import Loading from "../components/Loading";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
const regexp_password =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © SandBox Todos los derechos reservados "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const registerCodes = {
  empleado: "EMPSANDBOX24",
  instructor: "INSSANDBOX24",
};

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );

  const onSubmit = handleSubmit(({ email, lastNames, names, password }) => {
    const displayName = [names, lastNames].join(" ");
    dispatch(startCreatingUser({ email, password, displayName }));
    console.log(errorMessage);
  });

  return (
    <Container component="main" maxWidth="xs" className="animate__animated animate__fadeIn animate__faster">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Crear Cuenta
        </Typography>
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }} className="animate__animated animate__fadeIn animate__faster">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                error={!!errors.names}
                helperText={errors.names?.message}
                fullWidth
                label="Nombres"
                autoFocus
                {...register("names", {
                  required: {
                    value: true,
                    message: "El nombre es requerido",
                  },
                  minLength: {
                    value: 6,
                    message: "El nombre debe tener al menos 6 caracteres",
                  },
                })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!!errors.lastNames}
                helperText={errors.lastNames?.message}
                fullWidth
                label="Apellidos"
                autoComplete="family-name"
                {...register("lastNames", {
                  required: {
                    value: true,
                    message: "Los apellidos son requeridos",
                  },
                  minLength: {
                    value: 4,
                    message: "El apellido debe tener al menos 4 caracteres",
                  },
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
                label="Correo"
                name="email"
                placeholder="Escribe tu correo"
                autoComplete="email"
                {...register("email", {
                  required: {
                    message: "El correo es requerido",
                    value: true,
                  },
                  pattern: {
                    value: validEmail,
                    message: "Formato de correo no válido",
                  },
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es requerida",
                  },
                  pattern: {
                    value: regexp_password,
                    message: `
                      Minimo 8 caracteres,          
                      Máximo 15,
                      Al menos una letra mayúscula,
                      Al menos una letra minúscula,
                      Al menos un dígito,
                      No espacios en blanco,
                      Al menos 1 caracter especial (#@$%),
                    `,
                  },
                })}
                placeholder="Escribe tu contraseña"
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                fullWidth
                label="Cofirmar contraseña"
                type={showPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Confirmar la contraseña es requerido",
                  },
                  validate: (value) => {
                    if (value === watch("password")) {
                      return true;
                    } else {
                      return `La contraseña no coincide`;
                    }
                  },
                })}
                placeholder="Confirma tu contraseña"
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="codigo"
                label="Código de empresa"
                type="text"
                error={!!errors.code}
                helperText={errors.code?.message}
                {...register("code", {
                  required: {
                    value: true,
                    message: "El código es requerido",
                  },
                  minLength: {
                    value: 12,
                    message: "El código tiene que ser de 12 dígitos",
                  },
                  maxLength: {
                    value: 12,
                    message: "El código tiene que ser de 12 dígitos",
                  },
                  validate: (value) => {
                    if (
                      (value === registerCodes.empleado &&
                        watch("userType") === "empleado") ||
                      (value === registerCodes.instructor &&
                        watch("userType") === "instructor")
                    )
                      return true;
                    else {
                      return `El código no es válido`;
                    }
                  },
                })}
                placeholder="Código proporcionado de 12 dígitos"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ minWidth: 120 }} fullWidth>
                <InputLabel error={!!errors.userType}>
                  Tipo de usuario
                </InputLabel>
                <Select
                  defaultValue={""}
                  label="Tipo de usuario"
                  error={!!errors.userType}
                  {...register("userType", {
                    required: {
                      value: true,
                      message: "Elegir el tipo de usuario es obligatorio",
                    },
                  })}
                >
                  <MenuItem value={"empleado"}>Empleado</MenuItem>
                  <MenuItem value={"instructor"}>Instructor</MenuItem>
                </Select>
                <FormHelperText error={!!errors.userType}>
                  {errors.userType
                    ? errors.userType?.message
                    : "Elige el tipo de usuario para la cuenta"}
                </FormHelperText>
              </FormControl>
            </Grid>

            {isCheckingAuthentication && (
              <Grid item xs={12} marginTop={2}>
                <Loading />
              </Grid>
            )}
            {errorMessage && (
              <Grid item xs={12}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isCheckingAuthentication}
            sx={{ mt: 3, mb: 2 }}
          >
            Registrase
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                href="#"
                variant="body2"
                component={NavLink}
                to="/auth/login"
              >
                ¿Ya tienes una cuenta? Inicia sesión
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
