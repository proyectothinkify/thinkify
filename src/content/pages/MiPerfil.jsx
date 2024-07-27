import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";


import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import {
  Alert,
  Avatar,
 
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  
  startEditingDisplayName,
  startEditingEmail,
  startEditingPhotoURL,
} from "../../store/auth/thunks";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import Loading from "../../auth/components/Loading";
import { IconButton,  } from "@mui/material";

import { getDisplayName } from "../../helpers/getDisplayName";
import { getSeparateName } from "../../helpers/getSeparateNames";


import { pushNotificationThunk } from "../../store/userContent/thunks";

import { SaveOutlined,  UploadOutlined } from "@mui/icons-material";
import { FirebaseAuth } from "../../firebase/config";
import { editPhoto, savedPhoto } from "../../store/auth/authSlice";
import Swal from "sweetalert2";

const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

export const MiPerfil = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { notifications: { notification, counter } } = useSelector(state => state.teacherContent)
  const fileInputRef = useRef()
  const [savedPhoto, setSavedPhoto] = useState(null)
  const [savedPhotoToShow, setSavedPhotoToShow] = useState(null)
  const [isSavedPhoto, setIsSavedPhoto] = useState(false)
  const memoNotification= useMemo(()=> notification ? notification : [{message: null, id: null}],[notification])
  const memoCounter= useMemo(()=> counter ? counter : 0,[counter])

  
  const { firstChart } = getDisplayName();
  
  const dispatch = useDispatch();
  const { errorMessage, displayName, email, photoURL } = useSelector(
    (state) => state.auth
  );
  const initialNames = displayName ? getSeparateName(displayName).names : "";
  const initialLastNames = displayName
  ? getSeparateName(displayName).lastNames
  : "";
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      names: initialNames,
      lastNames: initialLastNames,
      position: "Desarrollador",
      email: email,
      tel: "8121124128",
    },
  });

  const onFileInputChange = ({target}) => {
    if (target.files === 0) return
    const file = URL.createObjectURL(target.files[0])
    console.log(target.files[0])
    setSavedPhotoToShow(file)
    setSavedPhoto(target.files[0])
    setIsSavedPhoto(true)
    
 
  }
  
  const onSave = () => {
    
   
    dispatch(startEditingPhotoURL(savedPhoto))
    Swal.fire('Foto de perfil actualizada', 'Se ha actualizado correctamente la información', 'success')
    setIsSavedPhoto(false)
    
  }


  
  
  
  
  const onSubmit = handleSubmit( async(data) => {
    
    if(!isEditing) setIsEditing(true);
    if (isEditing) {
      const displayNameData = [data.names, data.lastNames].join(" ");
      if (displayNameData !== displayName) {
        setIsUpdating(true);
        const notifications = {
          notification: [...memoNotification, { message: `Perfil actualizado, se ha editado tu nombre a ${displayNameData}`, id: Date.now() }],
          counter: memoCounter + 1
        }
      dispatch(pushNotificationThunk({notifications} ));
      dispatch(startEditingDisplayName(displayNameData));
        setIsUpdating(false);
        Swal.fire('Nombre del perfil actualizado', 'Se ha actualizado correctamente la información', 'success')
    }
    if (data.email !== email) {
      setIsUpdating(true);
      // dispatch(notificationPush(NotificationsPush("Perfil actualizado, se ha editado tu correo", notifications)))
       dispatch(startEditingEmail(data.email));
      
      console.log("Correo actualizado!");
      setIsUpdating(false);
    }
     if(isEditing) setIsEditing(false)
    }
  });

  return (
    <Container
      component="main"
      maxWidth="xs"
      className="animate__animated animate__fadeIn animate__faster"
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{display: 'flex', justifyContent: 'space-between', position: 'relative', left: 90, top: 120}}>
         
          <IconButton
            color="primary"
            onClick={() => fileInputRef.current.click()}
           
            
            // disabled={isSaving}
          >
            <UploadOutlined
              sx={{fontSize: 32}}
            />
            </IconButton>
            <IconButton
            color="primary"
            onClick={onSave}
            
            >
              <SaveOutlined
                sx={{fontSize: 30}}
              />
            </IconButton>

        
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={onFileInputChange}
            ref={fileInputRef}
          />
       </Box>

        <Avatar src={isSavedPhoto ? savedPhotoToShow : photoURL} sx={{ width: 120, height: 120, mb: 3, zIndex: -1 }}>
          <Typography sx={{ fontSize: 40 }}>{firstChart}</Typography>
        </Avatar>

        <Typography component="h1" variant="h5">
          Mi Perfil
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={onSubmit}
          sx={{ mt: 3 }}
          className="animate__animated animate__fadeIn animate__faster"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                error={!!errors.names}
                helperText={errors.names?.message}
                fullWidth
                disabled={!isEditing}
                label="Nombres"
                autoFocus
                {...register("names", {
                  required: {
                    value: isEditing === false ? false : true,
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
                disabled={!isEditing}
                label="Apellidos"
                autoComplete="family-name"
                {...register("lastNames", {
                  required: {
                    value: isEditing === false ? false : true,
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
                disabled={!isEditing}
                placeholder="Escribe tu correo"
                autoComplete="email"
                {...register("email", {
                  required: {
                    message: "El correo es requerido",
                    value: isEditing === false ? false : true,
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
                error={!!errors.position}
                helperText={errors.position?.message}
                fullWidth
                name="position"
                label="Posición"
                defaultValue={"Desarrollador"}
                disabled
                placeholder="Escribe tu posición"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.tel}
                helperText={errors.tel?.message}
                disabled={!isEditing}
                fullWidth
                label="Teléfono"
                type="tel"
                {...register("tel", {
                  required: {
                    value: false,
                    message: "El teléfono es requerido",
                  },
                })}
                placeholder="Escribe tu teléfono"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth type="text" disabled value={"Instructor"} />
            </Grid>

            {isUpdating && (
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
            
            sx={{ mt: 3, mb: 2 }}
          >
            {isEditing ? "Guardar" : "Editar"}
          </Button>
          <Grid container justifyContent="flex-end"></Grid>
        </Box>
      </Box>
    </Container>
  );
};
