/**
 * Created by Roc on 2017/8/23.
 */

import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

class Mine extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.highScoresTitle}>
                    我的
                </Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
        highScoresTitle: {
        fontSize: 50,
        textAlign: 'center',
        margin: 10,
    },

});

// 输出组建类
module.exports = Mine;