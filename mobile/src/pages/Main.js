import React , {useEffect, useState}from 'react'
import {StyleSheet , Image, View, Text} from 'react-native'
import MapView , { Marker, Callout}from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location'

function Main() {

    const [currentRegion, setCurrentRegion] = useState(null)


    useEffect (()=>{
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync()

            if (granted) {
                const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy:true
                })
                const {latitude, longitude} = coords  
            
            setCurrentRegion({
                latitude,
                longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04
            })
            }
            
        }

        loadInitialPosition()
    },[])

    if (!currentRegion) {
        return null
    }

    return (
    <MapView initialRegion={currentRegion} style={styles.map}>
        <Marker coordinate={{
            latitude:52.6058684,
            longitude:13.4782204,
        }}>
            <Image style={styles.avatar} source={{uri: "https://avatars2.githubusercontent.com/u/38855507?s=460&v=4"}}/>
            <Callout>
            <View style={styles.callout}>

            </View>
            </Callout>
        </Marker>
    </MapView>)

}

const styles =  StyleSheet.create({
    map:{
        flex: 1
    },
    avatar:{
        width: 54,
        height: 54,
        borderColor: "#fff",
        borderRadius: 4,
        borderColor: 4
    },
    callout:{
        flex: 1
    },

})

export default Main