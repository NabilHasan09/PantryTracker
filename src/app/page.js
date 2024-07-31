import { Box, Stack, Typography } from "@mui/material";

const commonStyles = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  m: 1,
  border: 1,
  width: '5rem',
  height: '5rem',
};

const items = ['apple', 'cherry', 'donut', 'orange', 'apple', 'cherry', 'donut', 'orange']

export default function Home() {
  // We'll add our component logic here
  return ( <Box 
    width="100vw" 
    height="100vh"
    display = 'flex'
    justifyContent={'center'}
    alignItems={'center'}
    flexDirection={'column'}>
    <Box border={'2px solid #333'}>  
      <Box 
        width={'800px'}
        height={'100px'}
        bgcolor={'#FFCCCB'}
        display = 'flex'
        justifyContent={'center'}
        alignItems={'center'}

      >
        <Typography
          variant="h2"
          color={'#333'}
          textAlign={'center'}
          
          
        >
          Pantry Items
        </Typography>
      </Box>
      <Stack width={'800px'} height={'400px'} spacing={2} overflow={'scroll'}>
        {items.map((i) => (
          <Box
            key={i}
            width={'100%'}
            height={'100px'}
            display={'flex'}
            justifyContent={'center'}
            padding={'10px'}
            alignItems={'center'}
            bgcolor={'#f0f0f0'}
          >
            <Typography 
              variant="h5"
              color={'#333'}
              textAlign={'center'}
            >
              {
                i.charAt(0).toUpperCase() + i.slice(1)
              }
            </Typography>
          </Box>
        ))} 
      </Stack>
    </Box>
  </Box>
    
  )
}
