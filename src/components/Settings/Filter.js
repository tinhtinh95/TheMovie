
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Alert
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Filter extends Component {
    render() {
        return (
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, backgroundColor: 'gray' }}> Fitlter</Text>
                <TouchableOpacity 
                onPress={()=>this.props.navigation.navigate('Popular', {name:'popular'})}
                style={{ paddingTop: 12, paddingBottom: 12, borderBottomWidth: 1 }} >
                    <Text style={{ fontSize: 18 }}>Popular Movies</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>this.props.navigation.navigate('Popular', {name:'top_rated'})}
                style={{ paddingTop: 12, paddingBottom: 12, borderBottomWidth: 1 }} >
                    <Text style={{ fontSize: 18 }}>Top Rated Movies</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>this.props.navigation.navigate('Popular', {name:'upcoming'})}
                style={{ paddingTop: 12, paddingBottom: 12, borderBottomWidth: 1 }} >
                    <Text style={{ fontSize: 18 }}>Upcoming Movies</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>this.props.navigation.navigate('Popular', {name:'now_playing'})}
                style={{ paddingTop: 12, paddingBottom: 12, borderBottomWidth: 1, flexDirection: 'row' }} >
                    <Text style={{ fontSize: 18 }}>NowPlaying Movies</Text>
                    <Image />
                </TouchableOpacity>
                <View style={{ paddingTop: 12, paddingBottom: 12, borderBottomWidth: 1 }} >
                    <View>
                        <Text style={{ fontSize: 18 }}>Movie with rate from: </Text>
                        <Text></Text>
                    </View>
                    <View>

                    </View>
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 18, backgroundColor: 'gray' }}> Sort By</Text>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
    },

});

