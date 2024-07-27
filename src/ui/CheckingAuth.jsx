import { CircularProgress, Grid, Typography } from '@mui/material'
import Educators from "../../assets/img/educators.svg";

export const CheckingAuth = () => {
  return (
      <Grid
          container
          spacing={0}
          direction='column'
          alignItems='center'
          justifyContent='center'
          sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
          
      >
          
          <Typography
              variant='h3'
        sx={{ color: 'primary.text', mb: 6 }}
        className='animate__animated animate__pulse animate__infinite'
          >
              SANDBOX EDUCATION
          </Typography>
          
          <Grid
            item
            component={"img"}
            src={Educators}
            margin={"0 auto"}
            sx={{
              width: "500px",
            
              mb: 10
            }}
          />
          
          <Grid
            itemsx={{width: {sm: 450}}}
          >
              <CircularProgress sx={{ color: 'primary.text'}} />
          </Grid>

          <Typography
              variant='h4'
              sx={{color: 'primary.text', mt: 5}}
          >
              Iniciando Sesión
          </Typography>
          

      </Grid>
  )
}
