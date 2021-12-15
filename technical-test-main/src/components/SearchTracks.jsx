import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useState, useRef } from 'react';


export default function SearchTracks() {
    const [tracks, setTracks] = useState([]);
    const trackName=useRef();
    const API = 'https://api.spotify.com/v1/search?type=track';
   
    function searchTrack (trackName) {
        const authToken =localStorage.getItem('token');
        return(
        fetch(`https://api.spotify.com/v1/search?q=${trackName}&type=track`,{ headers : { 'Authorization': `Bearer ${authToken}`}} )
        
        .then(response => response.json()) 
        )
    };
   /* function searchTrack (trachName){
        const authToken =localStorage.getItem('token');
        
        .get(`https://api.spotify.com/v1/search?q=${trackName}&type=track`) 
        .set({'Authorization': 'Bearer' + authToken})
        
    }*/
    




    function handleChange(trackName){
        console.log(searchTrack(trackName))
        if (trackName!=''){
            tracks= JSON.parse(searchTrack(trackName));

        }
    }




    return (
        <Grid container mt={0} mb={4} flexDirection="column">
            <Grid item container mb={2} mt={2}>
                <TextField ref={trackName} mt={2} name="title"  onChange={handleChange} />
                <Button variant="contained" sx={{marginLeft: 2}}>Search</Button>
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
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
}
