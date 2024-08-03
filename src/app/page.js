'use client'
import { Box, Stack, Typography, Button, Modal, TextField} from "@mui/material";
import { firestore } from "./firebase";
import { useEffect, useState } from "react";
import { deleteDoc, query } from "firebase/firestore";
import { collection, getDocs, setDoc, doc, getDoc } from "firebase/firestore";

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
      pantryList.push({name: doc.id, ...doc.data()})
    })
    console.log(pantryList)
    setPantry(pantryList)
  }
  useEffect (() => {
    updatePantry()
  }, [])
  
  
  // add function 

  const addItem = async (item) => {
    const docRef = doc(collection(firestore,'pantry'),item)
    
    const docSnap = await getDoc(docRef)
    // checks if document exists in the database
    if (docSnap.exists()) {
      const {count} = docSnap.data()
    //increments by one if so
      await setDoc(docRef, {count: count +1})
    } else {
      await setDoc(docRef,{count:1})
    }
    await updatePantry()
  }
  
  // Delete function
  const deleteItem = async (item) => {
    const docRef = doc(collection(firestore,'pantry'),item)
    const docSnap = await getDoc(docRef)
  //checks if it exists
    if (docSnap.exists()){
      const {count} = docSnap.data()
      if (count === 1){
        await deleteDoc(docRef)
      } else {
      await setDoc(docRef, {count: count - 1})
      }
    }
    await updatePantry()
  }

  return ( 
  //background
    <Box 
      width="100vw" 
      height="100vh"
      display = 'flex'
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      gap={2}
      sx={{
        background: "linear-gradient(rgba(0,0,0,1) 0%, rgba(21,36,63,1) 100%)"
      }}
    >
      <Box
        //Header
        width="100vw"
        height="60px"
        sx={{
          background: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(21,36,63,1) 100%)"
        }}
        display="flex"
        justifyContent="space-between"
        alignItems="space-between"
        position="fixed"
        top={0}
        left={0}
        zIndex={1000} // Ensure it appears on top
        boxShadow={3} // Add shadow for visual depth
        
      >
        
        <Typography 
          color={'#f0f0f0'} 
          variant="h6" 
          sx={{
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
          // Add text shadow
          padding: 2
          }}
        >
          Pantry Management System
        </Typography>
        
      </Box>

        <Box
          //table header
          width={'85vw'}
          height={'50px'}
          sx={{
            background: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(21,36,63,1) 100%)"
          }}
          display = 'flex'
          justifyContent={'space-between'}
          alignItems={'center'}
          paddingX={5}
          boxShadow={3}

        >
          <Typography
            variant="h5"
            color={'#f0f0f0'}
            textAlign={'center'}
            sx={{ 
              flex: 1, 
              textAlign: 'left' 
            }}
          >
            Pantry Items
          </Typography>
          
        
          <TextField
            //text field to add items 
            id="outlined-basic" 
            label="Add Item"
            size="small"
            variant="outlined"
            value={itemName}
            onChange={(e)=>setItemName(e.target.value)}
            InputLabelProps={{
              style: { color: 'white' }, // Set the label color to blue
            }}
          />
          <Button
            //confirm button to add new item 
            variant="outlined" 
            onClick={() => {
              if (itemName.trim() !== ''){
                addItem(itemName);
              } 
              setItemName('')
              handleClose();
            }}
          >
            Add 
          </Button>
        </Box>
        
        <Stack 
          //pantry item table structure
          width={'85vw'} 
          height={'500px'} 
          spacing={2} 
          overflow={'auto'}
        >
          {pantry.map(({name, count}) => (
            <Box
              //loops through each document/item in the pantry database and styles it
              key={name}
              width={'100%'}
              minHeight={'100px'}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              bgcolor={'#f0f0f0'}
              paddingX={5}
            >
              <Typography
                //keeps the item on leftmost side
                variant="h5"
                color={'#333'}
                textAlign={'center'}
                sx={{ flex: 1, textAlign: 'left' }}
              >
                {
                  name.charAt(0).toUpperCase() + name.slice(1)
                }
              </Typography>
              
              <Button
                // + button to increment item count
                onClick={() => {
                  addItem(name)
                }}
              >
                <Typography variant="h4">
                  +
                </Typography>
              </Button>

              <Typography
                // displays the current qunatity of the item
                variant="h5" 
                sx={{ 
                  textAlign: 'center', 
                  width: '50px' 
                }}
              >
                {count}
              </Typography>
              
              <Button
              // deletes item when clicking the "-" button
                onClick={() => {
                  deleteItem(name)
                }}  
              >
                <Typography variant="h2">
                  -
                </Typography>
              </Button>
            </Box>
          ))} 
        </Stack>
      </Box>
      
  )
}
