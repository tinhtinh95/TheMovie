import { AsyncStorage } from 'react-native';

const saveInfo = async (obj) => {
    try {
        await AsyncStorage.setItem('@MyProfile', JSON.stringify(obj));
        console.log('sau');
    } catch (error) {
    }
}
export default saveInfo;