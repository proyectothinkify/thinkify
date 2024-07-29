import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export const CrearCurso = () => {
  const fileInputRef = useRef()
  return (
    <>
      <Grid
        component="main"
        className="animate__animated animate__fadeIn animate__faster"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" sx={{ display: "block", textAlign: "center" }}>
          Detalles del Curso
        </Typography>
        <Grid
          item
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
            m:2
          }}
          noValidate
          autoComplete="off"
        >
          <TextField label="Titulo del curso" variant="filled" />
          <FormControl variant="filled" sx={{  minWidth: 120 }}>
            <InputLabel>Puesto dirigido del curso</InputLabel>
            <Select>
              <MenuItem>Recursos Humanos</MenuItem>
              <MenuItem>Contabilidad</MenuItem>
              <MenuItem>Ventas</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" }, mb: 2
           
          }}
          noValidate
          autoComplete="off"
        >
          <TextField label="Tema Principal" variant="filled" />
          <FormControl variant="filled" sx={{  minWidth: 120 }}>
            <InputLabel>Duración del curso</InputLabel>
            <Select>
              <MenuItem>15 min</MenuItem>
              <MenuItem>30 min</MenuItem>
              <MenuItem>1 h</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item sx={{ width: 470 }}>
          <TextField
            fullWidth
            label="Descripción del curso"
            multiline
            maxRows={8}
            variant="filled"
          />
        </Grid>
        <Grid item sx={{ mt: 3, mb: 4 }}>
          <Typography textAlign="center" sx={{mb: 2}}>Fecha limite del Curso</Typography>
          <Calendar
           
          />

        </Grid>
        <Grid item sx={{display: "flex", flexDirection: "column"}}>
          <Typography textAlign="center" sx={{ mb: 2 }}>Sube la imagen del curso</Typography>
          <Button  onClick={() => fileInputRef.current.click()}>
            <Avatar sx={{ alignSelf: "center", width: 350, height: 350, borderRadius: "5px" }} variant="square" >Imagen del curso</Avatar>
            <input type="file" hidden ref={fileInputRef}/>
          </Button>
          <Button
              type="submit"
              fullWidth
              variant="contained"
            sx={{ mt: 3, mb: 2 }}
            
              
            >
              Comenzar a crear
            </Button>
        </Grid>
        
      </Grid>
    </>
  );
};
