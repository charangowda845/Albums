import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  StyleSheet, 
  SafeAreaView, 
  Dimensions 
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useAlbumData } from '../hooks/useAlbumData';
import AlbumCard from '../components/AlbumCard';
import { IAlbumListItem } from '../models/Album';
import { COLORS } from '../constants/styles'; 

type RootStackParamList = {
  Home: undefined;
  Details: { trackId: any }; 
};

type HomeNavigationProp = NavigationProp<RootStackParamList, 'Home'>;

const screenWidth = Dimensions.get('window').width;
const MIN_COLUMN_WIDTH = 180;
const PADDING = 20;

const HomeScreen: React.FC = () => {
  const { albums, isLoading, error } = useAlbumData();
  const navigation = useNavigation(); 

  const numColumns = Math.floor((screenWidth - PADDING * 2) / MIN_COLUMN_WIDTH);
  const horizontalPadding = PADDING / 2;
  const listPadding = PADDING - horizontalPadding;


  const handleCardPress = (item: any) => {

    navigation.navigate('Details', { trackId: item });
  };

 
  const renderItem = ({ item }: { item: IAlbumListItem }) => (
    <AlbumCard 
      album={item} 
      
      numColumns={numColumns} 
      onPress={handleCardPress} 
    />
  );

  const renderContent = () => {
    if (isLoading && albums.length === 0) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading tracks...</Text>
        </View>
      );
    }

    if (error && albums.length === 0) {
      return (
        <View style={styles.centered}>
          <Text style={styles.errorText}>
            {error}
          </Text>
          <Text style={styles.errorSubText}>
            Please check your network connection.
          </Text>
        </View>
      );
    }
    

    return (
      <FlatList
        data={albums}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        key={numColumns} 
        numColumns={numColumns}
        contentContainerStyle={[styles.list, { paddingHorizontal: listPadding }]}
        ListHeaderComponent={() => (
          <>
            {error && albums.length > 0 && (
              <View style={styles.staleDataWarning}>
                <Text style={styles.warningText}>
                  ⚠️ Network error. Displaying cached tracks.
                </Text>
              </View>
            )}
            
          </>
        )}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

// --- 5. Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingVertical: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.error,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 5,
  },
  errorSubText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  staleDataWarning: {
    backgroundColor: '#FFFBEA',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FEE59F',
  },
  warningText: {
    color: '#D49D00',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '500',
  }
});

export default HomeScreen;