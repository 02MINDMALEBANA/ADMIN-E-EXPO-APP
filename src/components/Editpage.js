import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import {db} from '../config/firebase'
import { useLocation, useNavigate } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';

import '../components/AddInstitution.css'
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { async } from '@firebase/util';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding:"3%",
    },
    but:{
         marginTop:10,
         backgroundColor: 'black'
    },
    menuButton: {
      marginRight: theme.spacing(2),
      backgroundColor: 'black'
    },
    title: {
      flexGrow: 1,
      alignItems:'center'
    },
    addButton: {
        backgroundColor:'black'

    },
    appBar:{
        backgroundColor:'black'
    },
  }));

const Editpage = () => {
    const navigate = useNavigate()
       //for back button
       const back=(()=>{
        navigate("/")
      })

    const {id} = useParams()
    console.log(id)

    //fuction to get single doc
    const getDocDetails = async(id)=>{
        const docref = doc(db,'tertiaries',id)
        try{
            const docSnap = await getDoc(docref);
             if(docSnap.exists()){
                console.log('available')
                setDetails(docSnap.data())
             }else{
                console.log('not available available')
             }

        }catch(err){
            console.log(err)
        }
    }

    //updateButton
    const update = async(id,_name)=>{
        const tertiaryDoc = doc(db,'tertiaries',id)

        const tertiary ={
            name: _name,
            link: _link,
            course: _course,
            courseInfo: _courseInfo,
            Faculty: _faculty,
            Address:_address,
            telephone:_telephone,
            prospectus:prospectus,
            
    
        }

        await updateDoc(tertiaryDoc,tertiary).then(()=>{
            alert('updated successfully')
        }).catch(err=>{
            console.log(err)
        })
         
    }

    useEffect(()=>{
        getDocDetails(id)

    },[])

    const [_name, setName] = useState("")
    const [_link, setLink] = useState("")
    const [_faculty, setFaculty] = useState("")
    const [_course, setCourse] = useState("")
    const [_courseInfo, setCourseInfo] = useState("")
    const [_address, setAddress] = useState("")
    const [_telephone, setTelephone] = useState("")
    const [prospectus, setProspectus] = useState("")
    
          const classes = useStyles();
          const [details, setDetails] = useState([])
    return (
        <div>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                          
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                          Edit Institution Info
                        </Typography>
                        <Button className={classes.addButton} variant="contained" color="primary">
                            
                        </Button>
                       
                    </Toolbar>
                </AppBar>
                <Button  className={classes.but}  variant="contained" color="primary" onClick={back} startIcon={<KeyboardBackspaceSharpIcon  />}></Button>

                <div>
                <div className='from'>
                <form className={classes.root} noValidate autoComplete="off">

                    {/* <TextField id="outlined-basic" label={details.name} variant="standard" onChange={(e)=>setName(e.target.value)} /><br></br> */}
                    <TextField id="outlined-basic" Value={details._name} label="name" variant="standard" onChange={(e)=>setName(e.target.value)}  /><br></br>
                    <TextField id="outlined-basic" value={details._link} label="link" variant="standard" onChange={(e)=>setLink(e.target.value)}  /><br></br>
                    <TextField id="outlined-basic" value={details._course} label="course" variant="standard" onChange={(e)=>setCourse(e.target.value)} /><br></br>
                    <TextField id="outlined-basic" value={_courseInfo} label="courseINFO" variant="standard" onChange={(e)=>setCourseInfo(e.target.value)}  /><br></br>
                    <TextField id="outlined-basic" value={details._faculty} label="faculty" variant="standard" onChange={(e)=>setFaculty(e.target.value)} /><br></br>
                    <TextField id="outlined-basic" value={details._telephone} label="telephone" variant="standard" onChange={(e)=>setTelephone(e.target.value)} /><br></br>
                    <TextField id="outlined-basic" value={details._address} label="Address" variant="standard" onChange={(e)=>setAddress(e.target.value)} /><br></br>
                    <TextField id="outlined-basic" value={details.prospectus} label="prospectus" variant="standard" onChange={(e)=>setProspectus(e.target.value)} /><br></br>
                    {/* <TextField id="outlined-basic" value={details._price} label="Amount" variant="standard" onChange={(e)=>{setPrice(details => ({ ...details, _price: e.target.value})  )}}  /><br></br> */}
     
                    <Button onClick={(e)=>{update(id,_name)}}  className={classes.but}  variant="contained" color="primary">
                    UPDATE
                </Button>
                </form>
                </div>
                </div>
        </div>
    );
}

export default Editpage;
