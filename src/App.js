import { makeStyles } from '@material-ui/core/styles';
import {
  useNavigate,
  Route,
  Link,Routes
}from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { useState } from 'react';
import Download from "./components/Download"

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  app:{
    display:"flex",
    flexDirection:"column",
    width:"80%",
    margin:"0 auto",
  },
  title:{
    color:"red",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center"
  },

  form:{
    display:"flex",
    flexDirection:"column",
  },
  Button:{
    marginTop:"8px",
  }
  
}));
function App() {
  const classes = useStyles();
  let history = useNavigate();
  //states
  const [url, setUrl] = useState("");
  //function
  const handleSubmit = () =>{
    if(url ===""){
      alert("please enter a url")
    }else{
      history(`/download?url=${url}`)
      console.log("form Submit")
    }
    
  }
  const handleUrlChange = (e)=>{
    setUrl(e.target.value)
  }
  return (
    <div className={classes.app}>
      <div className={classes.title}>
        <YouTubeIcon style={{fontSize:"120px"}}/>
      <h1 style={{marginTop:"0"}}>YouTube Video Downloader</h1>
      </div>
     
     <form className={classes.form} noValidate autoComplete="off">
       <TextField id="outlined-basic"  variant="outlined" label="enter url" required onChange={handleUrlChange} value={url}/>
        <Button onClick={handleSubmit} variant="contained" color="secondary" className={classes.Button}>Download</Button> 
     </form>
     <Routes> <Route path="/download" element={<Download/>} /> </Routes>
    </div>
  );
}

export default App;
