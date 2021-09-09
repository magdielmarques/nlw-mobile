import React, {useEffect, useState} from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { View, Image, StyleSheet, TouchableOpacity, Text, ScrollView, SafeAreaView } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import api from '../../services/api';

interface Item {
    id: number;
    title:string;
    image_url: string;
}

const Points = () => {
    const[items, setItems] = useState<Item[]>([]);
    const navigation = useNavigation<any>()

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data)
        })
    },[]);

    function handleNavigateBack() {
        navigation.goBack();
    }
    
    function handleNavigaToDetail() {
        navigation.navigate('Detail');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name="arrow-left" size={20} color="#34cb79"/>
                </TouchableOpacity>

                <Text style={styles.title}>Bem vindo.</Text>
                <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

                <View style={styles.mapContainer}>
                    <MapView style={styles.map}
                        initialRegion={{
                            latitude: -20.4864953,
                            longitude:-54.7521895,
                            latitudeDelta: 0.014,
                            longitudeDelta: 0.014,
                        }}
                    >
                        <Marker
                            style={styles.mapMarker}
                            onPress={handleNavigaToDetail}
                            coordinate={{
                                latitude: -20.4864953,
                                longitude:-54.7521895,
                            }}
                        >
                            <View style={styles.mapMarkerContainer}>
                                <Image style={styles.mapMarkerImage} source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60' }} />
                                <Text style={styles.mapMarkerTitle}> Mercado </Text>
                            </View>
                        </Marker>
                    </MapView>
                </View>
            </View>

            <View style={styles.itemsContainer}>        
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                >
                    {items.map(item => (
                        <TouchableOpacity key={String(item.id)} style={styles.item} onPress={() => {}}>
                            <SvgUri width={42} height={42} uri={item.image_url} />
                            <Text style={styles.itemTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            </SafeAreaView>
    )
};

export default Points;

const styles = StyleSheet.create({
container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20,
},

title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
},

description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
},

mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
},

map: {
    width: '100%',
    height: '100%',
},

mapMarker: {
    width: 90,
    height: 80, 
},

mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
},

mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
},

mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
},

itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
},

item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
},

selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
},

itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
},
});