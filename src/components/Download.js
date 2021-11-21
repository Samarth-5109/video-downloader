import React,{useState, useEffect} from "react";
import axios from "axios"
import { makeStyles } from '@material-ui/core/styles';
import {useLocation} from "react";
//import { Title } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    downloadPage:{
      display:"flex",
      flexDirection:"column",
      width:"80%",
      margin:"0 auto",
    },
    
    
  }));

  function useQuery(){
      return new URLSearchParams(useLocation().search);
  }

export default function Download(){
    const classes = useStyles();
    let query = useQuery();

    //states
    const [title, setTitle] = useState("loading")
    const [url, setUrl] = useState("")

    //effect
    useEffect(()=>{
        setUrl(query.get("url"))
    },[query.get("url")])
    return(
        <div className={classes.downloadPage}>
            <div className={classes.VideoPlayer}>
             {url}   
            </div>
            <h1>{title}</h1>
            <p>Video</p>
            <div className={classes.DownloadSection}></div>
            <p>Audio</p>
            <div className={classes.DownloadSection}></div>
        </div>
    )
}