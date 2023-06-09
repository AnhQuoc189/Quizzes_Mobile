import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import styles from './durationtabs.style';

const TabButton = ({ name, activeTab, onHandleSearchType }) => (
    <TouchableOpacity
        onPress={onHandleSearchType}
        style={styles.btn(name, activeTab)}
    >
        <Text style={styles.btnText(name, activeTab)} numberOfLines={1}>
            {name}
        </Text>
    </TouchableOpacity>
);

const DurationTabs = ({ durationTabs, activeTab, setActiveTab }) => {
    return (
        <View style={styles.container}>
            {durationTabs.map((item) => (
                <TabButton
                    name={item}
                    activeTab={activeTab}
                    onHandleSearchType={() => setActiveTab(item)}
                    key={item}
                />
            ))}
        </View>
    );
};

export default DurationTabs;
