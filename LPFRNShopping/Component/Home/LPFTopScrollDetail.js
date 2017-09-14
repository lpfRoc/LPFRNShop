/**
 * Created by Roc on 2017/8/28.
 */
import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

class TopScrollDetail extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>{this.popToHome()}}>
                <Text style={styles.highScoresTitle}>
                    轮播详情
                </Text>
                </TouchableOpacity>
            </View>
        );
    }

    popToHome(){
        this.props.navigator.pop();
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    highScoresTitle: {
        fontSize: 50,
        textAlign: 'center',
        margin: 10,
    },

});

// 输出组建类
module.exports = TopScrollDetail;