import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import {db} from '../config/firebase'
import {storage} from '../config/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { useLocation, useNavigate } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';

import '../components/AddInstitution.css'
import { addDoc, collection } from 'firebase/firestore';
import logos from '../components/logo192.png'
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding:"3%",
      border:"soild",
      backgroundColor:""
    },
    but:{
         marginTop:10,
         backgroundColor: 'black'
    },
    menuButton: {
      marginRight: theme.spacing(2),
      display: 'hidden'
    },
    title: {
      flexGrow: 1,
      alignItems:'center',
   
    
    },
    appButton:{
      backgroundColor:'black',
       
    }
  }));
 
 
 function ResumeGuidelines(){
    const navigate = useNavigate()

    const [resumeGuidelines, setResumeGuidelines] = useState("")
    const [resumetemplate, setResumetemplate] = useState("")
    const [point2, setPoint2]=useState('')
    const [point21, setPoint21]=useState('')
    const [point22, setPoint22]=useState('')
    const [point23, setPoint23]=useState('')
    const [point3, setPoint3]=useState('')
    const [point4, setPoint4]=useState('')
    const [point41, setPoint41]=useState('')
    const [point42, setPoint42]=useState('')
    const [point43, setPoint43]=useState('')
    const [point5, setPoint5]=useState('')
    const addDetails = (() => {

        const collectionReF = collection(db, "resume");
        const resume = {
         
            ResumeGuidelines:resumeGuidelines,
            point2:point2,
            point21:point21,
            point22:point22,
            point23:point23,
            point3:point3,
            point4:point4,
            point41:point41,
            point42:point42,
            point43:point43,
            point5:point5,
          
            Resumetemplate:resumetemplate,
        };
        addDoc(collectionReF, resume).then(()=>{
            alert("added successfully")
        }).catch((err)=>{
            console.log(err);
        })
        console.log(resumeGuidelines);
       
    })
    const classes = useStyles();

    //for back button
    const back=(()=>{
      navigate("/")
    })


    return(
        <div>
            <AppBar position="static" className={classes.appButton}>
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                          
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                          Add Institution Info
                        </Typography>
                    
                    </Toolbar>
                </AppBar>
                <Button  className={classes.but}  variant="contained" color="primary" onClick={back} startIcon={<KeyboardBackspaceSharpIcon  />}></Button>
                <div>
                <div className='from'>
                <form className={classes.root} noValidate autoComplete="off">

                    < TextField id="outlined-basic" label="point1" variant="standard" fullWidth onChange={(e)=>setResumeGuidelines(e.target.value)} /><br></br>
                    < TextField id="outlined-basic" label="point 2" variant="standard" fullWidth  onChange={(e)=>setPoint2(e.target.value)} /><br></br>
                    < TextField id="outlined-basic" label="point 2.1" variant="standard" fullWidth  onChange={(e)=>setPoint21(e.target.value)} /><br></br>
                    < TextField id="outlined-basic" label="point 2.2" variant="standard" fullWidth  onChange={(e)=>setPoint22(e.target.value)} /><br></br>
                    < TextField id="outlined-basic" label="point 2.3" variant="standard"fullWidth  onChange={(e)=>setPoint23(e.target.value)} /><br></br>
                    < TextField id="outlined-basic" label="point 3" variant="standard"fullWidth  onChange={(e)=>setPoint3(e.target.value)} /><br></br>
                  
                     < TextField id="outlined-basic" label="point 4" variant="standard"fullWidth  onChange={(e)=>setPoint4(e.target.value)} /><br></br>
                    < TextField id="outlined-basic" label="point 4.1" variant="standard"fullWidth  onChange={(e)=>setPoint41(e.target.value)} /><br></br>
                    < TextField id="outlined-basic" label="point 4.2" variant="standard"fullWidth  onChange={(e)=>setPoint42(e.target.value)} /><br></br>
                    < TextField id="outlined-basic" label="point 4.3" variant="standard"fullWidth  onChange={(e)=>setPoint43(e.target.value)} /><br></br>
                    < TextField id="outlined-basic" label="point 5" variant="standard"fullWidth  onChange={(e)=>setPoint5(e.target.value)} /><br></br>
                    <TextField id="outlined-basic" label="link for template" variant="standard" fullWidth onChange={(e)=>setResumetemplate(e.target.value)}  /><br></br>
                    
            
     
              <Button onClick={(e)=>{addDetails()}} className={classes.but}  variant="contained" color="primary">

                    ADD
                </Button>
                
                </form>
                </div>
                </div>
               

        </div>
    )

}
export default ResumeGuidelines;