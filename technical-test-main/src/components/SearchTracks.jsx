import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useState , useEffect, useRef } from 'react';
import axios from 'axios';

export default function SearchTracks() {
    const [tracks, setTracks] = useState([]);
    const [trackName, setTrackName] = useState([]);
    //const trackName = useRef();

    function SearchHandler()
    {
        axios.get(`https://api.spotify.com/v1/search?q=${trackName}&type=track`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }).then(res => {
            setTracks(res.data.tracks.items);
            console.log(res.data.tracks.items)
          }).catch(err=>
            {
            
            console.log(err)
            });

    }
   /* useEffect(() =>{

        
    })*/
    function HandleTrackNameChange(event) {
        setTrackName(event.target.value);
     };

    return (
        <Grid container mt={0} mb={4} flexDirection="column">
            <Grid item container mb={2} mt={2}>
                <TextField /*ref={trackName}*/ onChange={HandleTrackNameChange} value={trackName} mt={2}/>
                <Button onClick={() => SearchHandler(trackName)}  variant="contained" sx={{marginLeft: 2}}>Search</Button>
            </Grid>
            <Grid item container spacing={4}>
                {tracks.map((track) => (
                    <Grid item key={track.id}>
                        <Card sx={{height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                sx={{
                                    height: 200,
                                    width: 200
                                }}
                                image={track.album.images[0].url}
                                alt={track.album.name}>
                                
                            </CardMedia>
                            
                            <h3>Album Name: {track.album.name}</h3>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
}
