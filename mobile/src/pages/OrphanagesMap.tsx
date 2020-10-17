import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from './../services/api';

import mapMarker from './../images/map-marker.png';
import { RectButton } from 'react-native-gesture-handler';

interface Orphanage {
  id: number,
  name: string,
  latitude: number,
  longitude: number
}

export default function OrphanagesMap() {

  const navigation = useNavigation();

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  const [fontsFloaded] = useFonts({
    nunito600: Nunito_600SemiBold, 
    nunito700: Nunito_700Bold, 
    nunito800: Nunito_800ExtraBold
  });

  useFocusEffect(() => {
    api.get('/orphanages').then(response => {
      setOrphanages(response.data);
    });
  });

  if(!fontsFloaded) {
    return null;
  }

  function handleNavigateToDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id });
  }

  function handleSelectMapPosition() {
    navigation.navigate('SelectMapPosition');
  }

  return (
    <View style={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -8.473006,
          longitude: -35.543416,
          latitudeDelta: 0.000,
          longitudeDelta: 0.000
        }}
      >
        {orphanages.map(orphanage => {
          return (
            <Marker
            key={orphanage.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2.8,
                y: 0.8
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude
              }}
            >
            <Callout tooltip={true} onPress={() => handleNavigateToDetails(orphanage.id)}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
              </View>
            </Callout>
          </Marker>
          );
        })}
      </MapView>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {orphanages.length} Orfanato(s) encontrados
            </Text>

            <RectButton style={styles.createOrphanage} onPress={handleSelectMapPosition}>
              <Feather name="plus" size={20} color="#FFF" />
            </RectButton>
          </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center'
  },

  calloutText: {
    color: '#0089A5'
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 46,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
    elevation: 3
  },

  footerText: {
    fontFamily: 'nunito700',
    color: '#8FA7B3'
  },

  createOrphanage: {
    width: 56,
    height: 56,
    backgroundColor: '#15C3D6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 3
  }
});
