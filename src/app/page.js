'use client'
import { Box, Stack, Typography, Button, Modal, TextField} from "@mui/material";
import { firestore } from "./firebase";
import { useEffect, useState } from "react";
import { deleteDoc, query } from "firebase/firestore";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";

const commonStyles = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  m: 1,
  border: 1,
  width: '5rem',
  height: '5rem',
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function Home() {
  // useState hook is used to initialize a state variable called data
  //This variable will store the data retrieved from an API endpoint.
  const [pantry, setPantry ] = useState([])
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [itemName, setItemName] = useState('');
  // The useEffect hook is used to request data from the API endpoint 
  //once the component initially renders

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'))
    // gets documents/pantry items 
    const docs = await getDocs(snapshot)
    //converts to list 
    const pantryList = []
    docs.forEach((doc) => {
      pantryList.push(doc.id)
    })
    setPantry(pantryList)
  }
  useEffect (() => {
    updatePantry()
  }, [])
  // add function 
  const addItem = async (item) => {
    const docRef = doc(collection(firestore,'pantry'),item)
    await setDoc(docRef,{})
    await updatePantry()
  }
  
  // Delete function
  const deleteItem = async (item) => {
    const docRef = doc(collection(firestore,'pantry'),item)
    await deleteDoc(docRef)
    await updatePantry()
  }

  return ( 
    
    <Box 
      width="100vw" 
      height="100vh"
      display = 'flex'
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      gap={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx= {style}>
          <Typography id ="modal-modal-title" variant="h6" component={'h2'}>
            Add Item
          </Typography>
          <Stack width={'100%'}direction = {'row'} spacing ={2}>
            <TextField 
              id="outlined-basic" 
              label="Item" 
              variant="outlined" 
              fullWidth
              value={itemName}
              onChange={(e)=>setItemName(e.target.value)}
            />
            <Button 
              variant="outlined" 
              onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose();
              }}
            >
              Add 
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant = "contained" onClick={handleOpen}>Add Item</Button>

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
        
        <Stack width={'800px'} height={'400px'} spacing={2} overflow={'auto'}>
          {pantry.map((i) => (
            <Box
              key={i}
              width={'100%'}
              height={'100px'}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              bgcolor={'#f0f0f0'}
              paddingX={5}
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
              <Button variant="" onClick={() => {
                deleteItem(i)
                
              }}>
                Delete
              </Button>
            </Box>
          ))} 
        </Stack>
      </Box>
    </Box>    
  )
}
