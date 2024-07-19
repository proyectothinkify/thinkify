
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
  return (
      <Box
          item
          sx={{ display: 'flex', justifyContent: 'center' }} 
          color={"primary.main"}
      
      >
          <CircularProgress
           sx={{alignSelf: 'center', marginInlineStart: 0}}
          />
    </Box>
  );
}