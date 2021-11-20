import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { Hospitais } from './Hospitais'
import { Hospitalregistro } from './Hospitalregistro';
import { Profile } from './Profile';

const HospitaisScreen = ({ navigation }) => <Hospitais navigation={navigation} />;

const HospitalregistroScreen = ({ navigation }) => <Hospitalregistro navigation={navigation} />;

const ProfileScreen = ({ navigation, dataUser, hasAdmin }) => <Profile hasAdmin={hasAdmin} dataUser={dataUser} navigation={navigation} />;

const Historico = () => <Text>Albums</Text>;

export const Principal = ({ navigation }) => {
    const [index, setIndex] = React.useState(0);

    const hasAdmin = navigation?.getState()?.routes[0]?.params?.hasAdmin;

    const user = navigation?.getState()?.routes[0]?.params?.user;

    const [routes] = React.useState(hasAdmin ? [
        { key: 'hospitals', title: 'Hospitais', icon: 'hospital-marker' },

        { key: 'registryHospitals', title: 'Registrar Hospital', icon: 'hospital' },
        { key: 'profile', title: 'Perfil', icon: 'face-profile' },
    ] : [{ key: 'hospitals', title: 'Hospitais', icon: 'hospital-marker' },
    { key: 'profile', title: 'Perfil', icon: 'face-profile' },]);

    const renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'hospitals':
                return <HospitaisScreen navigation={navigation} jumpTo={jumpTo} />;
            case 'history':
                return <Historico navigation={navigation} jumpTo={jumpTo} />;
            case 'registryHospitals':
                return <HospitalregistroScreen navigation={navigation} jumpTo={jumpTo} />;
            case 'profile':
                return <ProfileScreen dataUser={user} hasAdmin={hasAdmin} navigation={navigation} jumpTo={jumpTo} />;
        }
    }

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};