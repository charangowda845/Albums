import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions,TouchableOpacity } from 'react-native';
import { IAlbumListItem } from '../models/Album';

// Get screen width for responsive sizing
const screenWidth = Dimensions.get('window').width;

interface AlbumCardProps {
  album: IAlbumListItem;

}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, }) => {
  return (
   
    <View style={styles.card}>
    
      <Image source={{ uri: album.imageUrl }} style={styles.thumbnail} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {album.title}
        </Text>
        <Text style={styles.artist}>{album.artist}</Text>
        <Text style={styles.details} numberOfLines={1}>
          {album.genre} • {new Date(album.releaseDate).getFullYear()}
        </Text>
      </View>
   
      
    </View>

  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    // Calculate card width for tablets/landscape
    width: screenWidth > 600 ? '50%' : '100%', 
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  artist: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  details: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});

export default AlbumCard;