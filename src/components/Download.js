// import React,{useState, useEffect} from "react";
// import axios from "axios"
// import { makeStyles } from '@material-ui/core/styles';
// import {useLocation} from "react-router-dom";
// import Chip from "@material-ui/core/Chip";
// //import { Title } from "@material-ui/icons";

// const useStyles = makeStyles((theme) => ({
//     root: {
//       '& > *': {
//         margin: theme.spacing(1),
//         width: '25ch',
//       },
//     },
//     downloadPage:{
//       display:"flex",
//       flexDirection:"column",
//       width:"100%",
//       margin:"0 auto",
//     },
    
    
//   }));

//   function useQuery(){
//       return new URLSearchParams(useLocation().search);
//   }

// export default function Download({loading,setLoading}){
//     const classes = useStyles();
//     let query = useQuery();

//     //states
//     const [title, setTitle] = useState("Loading")
//     const [url, setUrl] = useState("")
//     const [thumbnail, setThumbnail] = useState("")
//     const [formats, setFormats] = useState()
//     const [audioFormats, setAudioFormats] = useState()

//     //effect
//     useEffect(()=>{
//         setUrl(query.get("url"))
//         axios.get(`http://localhost:4000/video?videoId=${query.get("url")}`)
//         .then(res=>{
            
//             setTitle(res.data.videoDetails.title)
//             setThumbnail(res.data.videothumbnail[0].url)
//             setFormats(res.data.formats)


//         })
//         axios.get(`http://localhost:4000/audio?audioId=${query.get("url")}`)
//         .then(res=>{
           
//             setAudioFormats(res.data)

//         })

//     },[query.get("url")])

//     //functions
//     const downloadFile=(itag, type) =>{
//         console.log(itag,type)
//         window.open(`https://localhost:4000/download=${title}&videoId=${url}&type=${type ? "mp4" : "mp3"}&itag=${itag}`); 
//     }
//     return(
//         <div className={classes.downloadPage}>
//             <div className={classes.VideoPlayer}>
//               <img src={thumbnail} style={{width:"100%"}}/> 
//             </div>
//             <h1>{title}</h1>
//             <p>Video</p>
//             <div className={classes.DownloadSection}>
//                 {formats && formats.map((format,index)=>(
//                   format.qualityLabel === null ? "" :  <Chip label={format.qualityLabel} onClick={()=>{downloadFile(format.itag,format.hasVideo)}} key={index}color="primary" style={{margin: "0px 7px 7px 0px", cursor:"pointer"}} />
//                 ))}
//             </div>
//             <p>Audio</p>
//             <div className={classes.DownloadSection}></div>
//             {audioFormats && audioFormats.map((format,index)=>(
//                     <Chip label={"Audio/mp3"} onClick={()=>{downloadFile(format.itag,format.hasVideo)}} key={index}color="secondary" style={{margin: "0px 7px 7px 0px", cursor:"pointer"}} />
//                 ))}
//         </div>
//     )
// }

import React,{useState,useEffect} from "react";
import {useLocation} from "react-router-dom"
import axios from "axios"
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import loadingSvg from "../loading.svg"
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
    width:"100%",
    margin:"0 auto",
  },
  loading:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    width:"100%"
  }
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Download({loading,setLoading}){
    const classes = useStyles();
    let query = useQuery();

    // states
    const [title,setTitle] = useState("Loading")
    const [url,setUrl] = useState("")
    const [thumbnail,setThumbnail] = useState("")
    const [formats,setFormats] = useState()
    const [audioFormats,setAudioFormats] = useState();
    let rl = "Rick Astley - Never Gonna Give You Up (Official Music Video)"
    const parsedUrl = new URL(window.location);
    // effect
    useEffect(()=>{
          
          if (parsedUrl.searchParams.get("text") != null) {
            setUrl(parsedUrl.searchParams.get("text"))
          }else{
            setUrl(query.get("url"))
          }

        // axios.get(`http://localhost:4000/video?videoId=${parsedUrl.searchParams.get("text") !== null ? parsedUrl.searchParams.get("text") : query.get("url")}`)
        axios.get(`https://powerful-forest-52012.herokuapp.com/video?videoId=${parsedUrl.searchParams.get("text") !== null ? parsedUrl.searchParams.get("text") : query.get("url")}`)
        .then(res=>{
            setTitle(res.data.videoDetails.title)
            setThumbnail(res.data.videoDetails.thumbnails[res.data.videoDetails.thumbnails.length-1].url)
            // console.log(res.data.formats)
            setFormats(res.data.formats)
            // console.log(res.data.videoDetails.thumbnails[res.data.videoDetails.thumbnails.length-1])
            setLoading(false)
        })
        // axios.get(`http://localhost:4000/audio?videoId=${query.get("url")}`)
        axios.get(`https://powerful-forest-52012.herokuapp.com/audio?videoId=${query.get("url")}`)
        .then(res=>{
         
            setAudioFormats(res.data)
            
        })


    },[query.get("url")])

  // functions
  const downloadFile = (itag,type) =>{
    console.log(itag,type)
    window.open(`https://powerful-forest-52012.herokuapp.com/download?title=${title}&videoId=${url}&type=${type ? "mp4":"mp3"}&itag=${itag}`);
  }
    return(
      <>
        {!loading?
        <div className={classes.downloadPage}>
            <div className={classes.VideoPlayer}>
            <img src={thumbnail} style={{width:"100%",marginTop:"7px"}}/>
            </div>
            <h1>{title === rl ? `You got Rick Rolled... Please Enter a valid url`:title}</h1> 
             <p>Video</p>     
            <div className={classes.DownloadSection}>
              {formats && formats.map((format,index)=>(
                 format.qualityLabel === null ? "" : format.hasAudio === true ? <Chip label={format.qualityLabel} onClick={()=>{downloadFile(format.itag,format.hasVideo)}} key={index} color="primary" style={{margin:"0px 7px 7px 0px",cursor:"pointer"}} /> : ""
              ))}
            </div>
            <p>Audio</p>
            <div className={classes.DownloadSection}>
                {audioFormats && audioFormats.map((format,index)=>(
        
                 <Chip label={format.mimeType.split(";")[0] === "audio/mp4" ? "audio/mp3" : format.mimeType.split(";")[0]} onClick={()=>{downloadFile(format.itag,format.hasVideo)}} key={index} style={{margin:"0px 7px 7px 0px",cursor:"pointer",backgroundColor:"red",color:"#fff"}} />
              ))}
            </div>
        </div> :
          <div className={classes.loading}>
            <img src={loadingSvg} />
            <p>Loading...</p>
          </div> }
          </>
      
    )


    

}