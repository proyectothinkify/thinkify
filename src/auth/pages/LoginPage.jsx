import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Educators from "../../../assets/img/educators.svg";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { startLogin } from "../../store/auth/thunks";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import Loading from "../components/Loading";
import { Alert, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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

// TODO remove, this demo shouldn't need to reset the theme.

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector((state) => state.auth);

  const isCheckingCredentials = useMemo(() => status === "checking", [status]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const rememberMe = (email) => {
    localStorage.setItem("email", email);
  };

  const onSubmit = handleSubmit(({ email, password }) => {
    rememberMe(email);
    dispatch(startLogin({ email, password }));
  });

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url("")',
          backgroundColor: "primary.main",
          backgroundSize: "cover",
          backgroundPosition: "left",
        }}
      >
        <Grid container className="animate__animated animate__fadeIn animate__faster">
          <Grid
            item
            component={"img"}
            src={Educators}
            margin={"0 auto"}
            sx={{
              width: "600px",
              mt: 10,
            }}
          />
        </Grid>
        <Typography
          variant="h4"
          textAlign={"center"}
          marginTop={10}
          color={"background.default"}
          
        >
          SANDBOX EDUCATION
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5" >
            Inicio de sesión
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }} className="animate__animated animate__fadeIn animate__faster">
            <TextField
              margin="normal"
              required
              fullWidth
              defaultValue={localStorage.getItem("email") ?? ""}
              type="email"
              label="Correo"
              name="email"
              placeholder="Escribe tu correo"
              autoComplete="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "El correo es requerido",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              autoFocus
            />

            <TextField
            
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              placeholder="Escribe tu contraseña"
              id="password"
              error={!!errors.password}
              helperText={errors.password?.message}
              autoComplete="current-password"
              {...register("password", {
                required: {
                  value: true,
                  message: "La contraseña es requerida",
                },
              })}
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

            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  {...register("remember")}
                  defaultChecked={true}
                />
              }
              label="Recuérdame"
            />
            {isCheckingCredentials && (
              <Grid item xs={12}>
                <Loading />
              </Grid>
            )}
            {errorMessage && (
              <Grid item xs={12}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isCheckingCredentials}
            >
              Iniciar sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  component={NavLink}
                  to="/auth/register"
                >
                  {"¿No tienes una cuenta? Crea una nueva"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
