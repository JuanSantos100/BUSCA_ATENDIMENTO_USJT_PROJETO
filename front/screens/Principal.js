import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import {Hospitais} from './Hospitais'

const HospitaisScreen = () => <Hospitais />;

const Historico = () => <Text>Albums</Text>;

export const Principal = () => {
    const [index, setIndex] = React.useState(0);

    const [routes] = React.useState([
        { key: 'hospitals', title: 'Hospitais', icon: 'hospital' },
        { key: 'history', title: 'Histórico', icon: 'history' },
    ]);

    const renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'hospitals':
                return <HospitaisScreen jumpTo={jumpTo} />;
            case 'history':
                return <Historico jumpTo={jumpTo} />;
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