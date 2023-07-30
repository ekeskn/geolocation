import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const Location = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get the current location when the component mounts
    getCurrentLocation();

    // Clear the location watch when the component unmounts
    return () => Geolocation.clearWatch(watchId);
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        setError(null);
      },
      (error) => setError(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    // Watch for changes in location (optional)
    const watchId = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        setError(null);
      },
      (error) => setError(error.message),
      { enableHighAccuracy: true, distanceFilter: 50 }
    );
  };

  return (
    <View style={styles.container}>
      {latitude && longitude ? (
        <View>
          <Text style={styles.text}>Latitude: {latitude}</Text>
          <Text style={styles.text}>Longitude: {longitude}</Text>
        </View>
      ) : (
        <Text style={styles.errorText}>{error || 'Fetching location...'}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default Location;
