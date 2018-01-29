
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
                <View style={{ paddingTop: 12, paddingBottom: 12, borderBottomWidth: 1 }} >
                    <Text style={{ fontSize: 18 }}>Popular Movies</Text>
                </View>
                <View style={{ paddingTop: 12, paddingBottom: 12, borderBottomWidth: 1 }} >
                    <Text style={{ fontSize: 18 }}>Top Rated Movies</Text>
                </View>
                <View style={{ paddingTop: 12, paddingBottom: 12, borderBottomWidth: 1 }} >
                    <Text style={{ fontSize: 18 }}>Upcoming Movies</Text>
                </View>
                <View style={{ paddingTop: 12, paddingBottom: 12, borderBottomWidth: 1, flexDirection:'row' }} >
                    <Text style={{ fontSize: 18 }}>NowPlaying Movies</Text>
                    <Image/>
                </View>
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

