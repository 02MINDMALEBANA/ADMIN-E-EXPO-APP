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
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';
import pdf from './Cocktail.pdf'


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

//function
const AddInstitution = () => {
  const navigate = useNavigate()
  const [_name, setName] = useState("")
  const [_link, setLink] = useState("")
  const [_faculty, setFaculty] = useState("")
  const [_course, setCourse] = useState("")
  const [_courseInfo, setCourseInfo] = useState("")
  const [_address, setAddress] = useState("")
  const [_telephone, setTelephone] = useState("")
  const [prospectus, setProspectus] = useState("")
  const [_picture, setPicture] = useState("")
  const [percent, setPercent] = useState(0);


    //picture function
    // Handles input change event and updates state
    function handleChange(event) {
      setPicture(event.target.files[0]);
      // setProspectus(event.target.files[0]);
     
  }    
  function handleDOC(event){
    setProspectus(event.target.files[0]);
  }


//function to add institutions
const addInst = () =>{
 
  /////
    //adding picture to firebase
    if (!_picture) {
      alert("Please upload an image first!");
  }

  const storageRef = ref(storage, `/files/${_picture.name}`);
  // const storageRefs = ref(storage, `/files/${prospectus.name}`);
         // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, _picture,prospectus);
        // const uploadTask = uploadBytesResumable(storageRefs,prospectus);
 
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                    // update progress
                    setPercent(percent);
                  },
                  (err) => console.log(err),
                  () => {
                      // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              console.log(url);
            
              const addTertiaryRef = collection(db, 'tertiaries')
              const tertiary = {
                name: _name,
                link: _link,
                course: _course,
                courseInfo: _courseInfo,
                Faculty: _faculty,
                Address:_address,
                telephone:_telephone,
                prospectus:url,
                picture: url
              };
              addDoc(addTertiaryRef, tertiary).then(() => {
                console.log('added')
                alert('added successfully')
                navigate("/")
              }).catch((errr) => {
                console.log(errr)
              


            });
                      });
  }
              );
}
  
   ///////

  
    const classes = useStyles();

    //for back button
    const back=(()=>{
      navigate("/")
    })



    return (
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

                    < TextField id="outlined-basic" label="Name of institution" variant="standard" onChange={(e)=>setName(e.target.value)} /><br></br>
                    <TextField id="outlined-basic" label="Link" variant="standard" onChange={(e)=>setLink(e.target.value)}  /><br></br>
                    <TextField id="outlined-basic" label="Course Name" variant="standard" onChange={(e)=>setCourse(e.target.value)} /><br></br>
                    <TextField id="outlined-basic" label="Course Info" variant="standard" onChange={(e)=>setCourseInfo(e.target.value)}  /><br></br>
                    <TextField id="outlined-basic" label="Address" variant="standard" onChange={(e)=>setAddress(e.target.value)}/><br></br>
                    <TextField id="outlined-basic" label="Telephone" variant="standard" onChange={(e)=>setTelephone(e.target.value)}/><br></br>
                    <TextField id="outlined-basic" label="prospectus" variant="standard" onChange={(e)=>setProspectus(e.target.value)}/><br></br>
                    <TextField id="outlined-basic" label="Faculty" variant="standard" onChange={(e)=>setFaculty(e.target.value)}/><br></br>
                    
              <input type="file" accept="image/*" onChange={handleChange}/><br></br>
              <p>{percent} "% done"</p><br></br>
     
              <Button onClick={(e)=>{addInst()}} className={classes.but}  variant="contained" color="primary">

                    ADD
                </Button>
                {/* <div className = "App">
          <a href = {pdf} target = "_blank">Download Pdf</a>
          <input type="file" accept="document/*" onChange={handleChange}/><br></br>
        </div> */}
                </form>
                </div>
                </div>
               
        </div>
        
    );
}

export default AddInstitution;
