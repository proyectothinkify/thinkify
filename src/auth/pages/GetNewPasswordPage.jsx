import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Alert,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUser, startSendingPasswordForEmail } from "../../store/auth/thunks";
import { useMemo, useState } from "react";
import Loading from "../components/Loading";
import { IconButton, InputAdornment } from "@mui/material";
import { KeyRounded, PasswordOutlined, PasswordRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";

const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

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

export function GetNewPasswordPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(({email} ) => {
    // Aquí puedes añadir la lógica para procesar el formulario, como la llamada a un thunk de Redux
    dispatch(startSendingPasswordForEmail( email ));
    if(errorMessage) return
    Swal.fire('Correo de Verficación enviado', `Por favor revisar su bandeja de entrada de su correo: ${email}`, 'success').then((result) => {
      console.log(errorMessage)
      if (result.isConfirmed) navigate(-1) 
    })
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
        <KeyRounded
          sx={{
            fontSize: 50,
            mb: 3
          }}
        />
        <Typography component="h1" variant="h5">
          Recuperar Contraseña
        </Typography>
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Enviar correo de verificación
              </Button>
            </Grid>
            {/* {errorMessage && (
              <Grid item xs={12}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            )} */}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  component={NavLink}
                  to="/auth/login"
                >
                  ¿Quieres regresar? Inicia sesión
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
