// import { makeStyles } from '@material-ui/core/styles';
// import {
//   useNavigate,
//   Route,
//   Link,Routes
// }from "react-router-dom";
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import YouTubeIcon from '@material-ui/icons/YouTube';
// import { useState } from 'react';
// import Download from "./components/Download"

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//   },
//   app:{
//     display:"flex",
//     flexDirection:"column",
//     width:"80%",
//     margin:"0 auto",
//   },
//   title:{
//     color:"red",
//     display:"flex",
//     flexDirection:"column",
//     justifyContent:"center",
//     alignItems:"center"
//   },

//   form:{
//     display:"flex",
//     flexDirection:"column",
//   },
//   Button:{
//     marginTop:"8px",
//   }
  
// }));
// function App() {
//   const classes = useStyles();
//   let history = useNavigate();
//   //states
//   const [url, setUrl] = useState("");
//   //function
//   const handleSubmit = () =>{
//     if(url ===""){
//       alert("please enter a url")
//     }else{
//       history(`/download?url=${url}`)
//       console.log("form Submit")
//     }
    
//   }
//   const handleUrlChange = (e)=>{
//     setUrl(e.target.value)
//   }
//   return (
//     <div className={classes.app}>
//       <div className={classes.title}>
//         <YouTubeIcon style={{fontSize:"120px"}}/>
//       <h1 style={{marginTop:"0"}}>YouTube Video Downloader</h1>
//       </div>
     
//      <form className={classes.form} noValidate autoComplete="off">
//        <TextField id="outlined-basic"  variant="outlined" label="enter url" required onChange={handleUrlChange} value={url}/>
//         <Button onClick={handleSubmit} variant="contained" color="secondary" className={classes.Button}>Download</Button> 
//      </form>
//      <Routes> <Route path="/download" element={<Download/>} /> </Routes>
//     </div>
//   );
// }

// export default App;

import {useState,useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import {
  useNavigate,
  useLocation,
  Route,
  Link,Routes
} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Download from "./components/Download"
import Seo from "./components/Seo"


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
    alignItems:"center",
    cursor:"pointer",
  },
  form:{
    display:"flex",
    flexDirection:"column",
  },
  Button:{
      marginTop:"8px",backgroundColor:"red",color:"#fff",
     '&:hover': {
      backgroundColor: 'transparent',
      color: 'red',
  },
 
  },
   affliate:{
    cursor:"pointer",
    padding:"7px",
    color:"blue",
    marginTop:"14px",
    border:"1px solid #eee",
    textDecoration:"none",
  }
}));
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function App() {
  const classes = useStyles();
  let history = useNavigate();
  const parsedUrl = new URL(window.location);
   let query = useQuery();
  // states
  const [url,setUrl] = useState("")
    const [loading,setLoading] = useState(true);
   // effect
    useEffect(()=>{
      if (parsedUrl.searchParams.get("text") != null) {
        setUrl(parsedUrl.searchParams.get("text"))
      }
      if(window.location.pathname === "/"){
          setUrl("")
      }else{

        setUrl(query.get("url"))
        if (parsedUrl.searchParams.get("text") != null) {
          setUrl(parsedUrl.searchParams.get("text"))
        }
      }

    },[window.location.pathname])
  // function
    const handleSubmit = () => {
      if(url === "" || !url.includes("https") || !url.includes("yout")){
        alert("Please enter a Youtube URL...")
      }else{
        if(url.includes("www")){
          history.push(`/download?url=${url.replace("www.","")}`)
        }else{
          history.push(`/download?url=${url}`)
        }
        setLoading(true)
      }
    }

    const handleUrlChange = (e) => {
      setUrl(e.target.value)
    } 
    

  return (
    
    <div className={classes.app} noValidate>
      <div className={classes.title} onClick={()=>history.push("/")}>
      <YouTubeIcon style={{fontSize:"128px"}} />
      <h1 style={{marginTop:"0px"}} >Youtube Video Downloader</h1>
      </div>
      <form className={classes.form}   >
      <TextField  id="outlined-basic" variant="outlined" label="Enter YouTube URL..." type="url" required onChange={handleUrlChange} value={url} />
      <Button onClick={handleSubmit} variant="contained"  className={classes.Button}>
        Download
      </Button>
    </form>
    <Routes> <Route path="/download" element={<Download/>} /> </Routes>
  <a className={classes.affliate} target="_blank" href={"https://publishers.adsterra.com/referral/YZThaqfRBZ"}>
    💰 Earn money from your website without approval.
  </a>
  <a className={classes.affliate} style={{marginTop:"7px"}} target="_blank" href={"https://www.fiverr.com/share/A0rxe5"}>
    🌐 I can make yt downloader for you.
  </a>
  <div id="container-262d89e83f48f4f114bffdc40c7395b4"></div>
      <Seo />
    </div>
  );
}

export default App;

