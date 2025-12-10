import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView,Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useAlbumData } from '../hooks/useAlbumData'; 

type DetailsRouteParams = {
  trackId: number;
};

const TrackDetailsScreen = () => {

  const route = useRoute();
  const { trackId } = route.params;

  const { albums } = useAlbumData(); 

  const track = albums.find(item => item.title === trackId.title);
//console.log("track",trackId)

  if (!track) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Track not found or data is missing.</Text>
      </View>
    );
  }
  
  
  const formattedDate = new Date(track.releaseDate).toLocaleDateString();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={{ uri: track.imageUrl }}
          style={styles.artwork}
    
        />
        
        <View style={styles.infoBox}>
          <Text style={styles.title}>{track.title}</Text>
          <Text style={styles.artist}>{track.artist}</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.label}>Genre:</Text>
            <Text style={styles.value}>{track.genre}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.label}>Released:</Text>
            <Text style={styles.value}>{formattedDate}</Text>
          </View>
          
        

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  artwork: {
    width: 300,
    height: 300,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
  },
  infoBox: {
    width: '100%',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 5,
  },
  artist: {
    fontSize: 20,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  value: {
    fontSize: 16,
    color: '#666666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#FF3B30',
  },
});

export default TrackDetailsScreen;