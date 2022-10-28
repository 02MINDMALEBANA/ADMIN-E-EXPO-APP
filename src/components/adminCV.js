import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import "../CSS/Admin.css"
import { yellow } from '@material-ui/core/colors';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import {db} from '../config/firebase'
// import * as React from 'react';
// import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import AddIcon from '@mui/icons-material/Add';
// import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { fontSize, height, margin } from '@mui/system';
import { Margin } from '@mui/icons-material';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';






const useStyles = makeStyles((theme) => ({
    root: {
      marginTop:'10px',
    },
    menuButton: {
      marginRight: theme.spacing(2),
      
    },
    title: {
      flexGrow: 1,
      fontWeight: 'bold',
      fontSize: 'xxx-larger'
    },
    edit:{
       
        ckgroundColor:'orange'
    },
    addButton:{
        backgroundColor:'white',
        color:'red'
    },
    table: {
      minWidth: 650,
    },
    displayCard:{
      marginTop:100,
      marginLeft: 0,
      position: 'relative',
      borderRadius: 16,
      padding: 12,
      backgroundColor: 'black',
      minWidth: 100,
      maxWidth: 700,
      color: 'primary'
    },
    editButton:{
      background:"white",
      // backgroundColor:'black',
      textDecorationColor:'white'
    },
    appButton:{
      backgroundColor:'black',
       
    },
    deleteButton:{
      background:'white'
    },
    addCircle:{
      marginLeft: '50%',
      marginTop: '10%',
      color: 'inherit'


    }
  }));

 

//function starts here
const AdminCV = () => {
  const [guidelines, setGuidelines] = useState([])
    const classes = useStyles();

    const collectionRef = collection(db, 'resume')

    const getGuidelines = async () =>{
          const data =  await getDocs(collectionRef)
         
         
          console.log( data.docs.map((results)=>(results.data())))
          setGuidelines( data.docs.map((results)=>({...results.data(), id:results.id})))
    }

    useEffect(()=>{
      

      getGuidelines()
           
    },[])
     
     //delete fuction
     function deleteInst(id){
          alert('delete clicked ',{id})

          const getDoc = doc(db,'resume',id)
          deleteDoc(getDoc).then(()=>{
            alert('deledted successfully')
          }).catch(err=>{
            console.log(err)
          })
          
     }

     //
     
     const [progress, setProgress] = React.useState(10);
     const [buffer, setbuffer] = React.useState(10);
     const [isLoading, setIsLoading]=useState(false);



    return (
        <div>
           
           <AppBar position="static" className={classes.appButton}>
         
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                          
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                          Admin-RESUME GUIDELINES
                        </Typography>
                        <Button className={classes.addButton} variant="contained" color="primary" startIcon={<AddIcon />}>
                            <Link className='naming' to='/'>BACK TO ADMIN</Link>
                        </Button>
                        <Button className={classes.addButton} variant="contained" color="primary" startIcon={<AddIcon />}>
                            <Link className='naming' to='/resume'>ADD ResumeGuidelines</Link>
                        </Button>
                    </Toolbar>
                </AppBar>



           <div>
           <div className='tasks'>
            <div><h2 style={{textAlign:"center", marginLeft:'-1%'}}>GUIDELINES</h2></div>
            <div className='line'></div>
             

             {
              guidelines.length ==0 ? (

                
                <Box sx={{ display: 'flex' }}>
                <CircularProgress className={classes.addCircle} color='inherit' value={progress} />
                <h2 style={{textAlign:'center', color:'red'}}>PLEASE WAIT!</h2>
              
           
                
              </Box>
        
              

                    //  <h2 style={{textAlign:'center', color:'red'}}>NO HOTELS ADDED YET!</h2>
              ):(
           
                
                guidelines.map((res)=>(
                
                  
                  <>
                  {/* <h1>{  if (hotels == ''){} } no hotels</h1> */}
                   <Card className={classes.displayCard}>
            <div><h3 style={{color:'white'}}> {res. ResumeGuidelines}</h3></div>
            <div><h3 style={{color:'white'}}> {res.point2}</h3></div>
            <div><h3 style={{color:'white'}}> {res.point21}</h3></div>
            <div><h3 style={{color:'white'}}>{res.point22}</h3></div>
            <div><h3 style={{color:'white'}}>{res.point23}</h3></div>
            <div><h3 style={{color:'white'}}>{res.point3}</h3></div>
            <div><h3 style={{color:'white'}}>{res.point3}</h3></div>
            <div><h3 style={{color:'white'}}>{res.point4}</h3></div>
            <div><h3 style={{color:'white'}}>{res.point41}</h3></div>
            <div><h3 style={{color:'white'}}>{res.point42}</h3></div>
            <div><h3 style={{color:'white'}}>{res.point43}</h3></div>
            <div><h3 style={{color:'white'}}>{res.point5}</h3></div>
          
          
            <div className='buttons' >
              <div>    <Button onClick={(e)=>{deleteInst(res.id)}} variant="outlined" color="primary" startIcon={<DeleteIcon />} className={classes.deleteButton}>
                DELETE
              </Button></div>
                       


              <div>
                {/* <Link to={`/editguide/${res.id}`}>
                <Button  variant="outlined" color="primary" className={classes.editButton} startIcon={<UpdateIcon />}>
                UPDATE
              </Button>
                </Link> */}
                 
              </div>

            </div>
          </Card>
        
                  </>
                ))
              )
                 
             }
           


  
           </div>
                
           </div>
        </div>
    );
}

export default AdminCV;
