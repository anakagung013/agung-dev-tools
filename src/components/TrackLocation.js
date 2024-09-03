import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';

function TrackLocation() {
  const [location, setLocation] = useState(null);

  const handleTrackLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Track Location Tool
      </Typography>
      <Button variant="contained" color="primary" onClick={handleTrackLocation}>
        Get My Location
      </Button>
      {location && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Latitude: {location.lat}, Longitude: {location.lng}
        </Typography>
      )}
    </Box>
  );
}

export default TrackLocation;
