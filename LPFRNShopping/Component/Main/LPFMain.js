/**
 * Created by Roc on 2017/8/23.
 */

import React from 'react';
import {Navigator} from 'react-native-deprecated-custom-components';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform,   // 判断当前运行的系统
} from 'react-native';


/**-----导入外部的组件类------**/
import TabNavigator from 'react-native-tab-navigator';

var Home = require('../Home/LPFHome');
var Shop = require('../Shop/LPFShop');
var Mine = require('../Mine/LPFMine');
var More = require('../More/LPFMore');


class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {selectedTab:'home'};
    }

    render() {
        return (
       <TabNavigator>
        {/*--首页--*/}
                {this.renderTabBarItem('首页', 'icon_tabbar_homepage', 'icon_tabbar_homepage_selected','home', '首页', Home,'10')}
                {/*--商家--*/}
                {this.renderTabBarItem('商家', 'icon_tabbar_merchant_normal', 'icon_tabbar_merchant_selected','shop', '商家', Shop)}
                {/*--我的--*/}
                {this.renderTabBarItem('我的', 'icon_tabbar_mine', 'icon_tabbar_mine_selected','mine', '我的', Mine)}
                {/*--更多--*/}
                {this.renderTabBarItem('更多', 'icon_tabbar_misc', 'icon_tabbar_misc_selected','more', '更多', More,)}
       </TabNavigator>
        );
    }

        // 每一个TabBarItem
    renderTabBarItem(title, iconName, selectedIconName, selectedTab, componentName, component, badgeText){
        return(
            <TabNavigator.Item
                title={title} 
                renderIcon={() => <Image source={{uri: iconName}} style={styles.iconStyle}/>} // 图标
                renderSelectedIcon={() =><Image source={{uri: selectedIconName}} style={styles.iconStyle}/>}   // 选中的图标
                onPress={()=>{this.setState({selectedTab:selectedTab})}}
                selected={this.state.selectedTab === selectedTab}
                selectedTitleStyle={styles.selectedTitleStyle}
                badgeText = {badgeText}
            >
                <Navigator
                    initialRoute={{name:componentName,component:component}}
                    configureScene={()=>{
                             return Navigator.SceneConfigs.PushFromRight;
                        }}
                    renderScene={(route,navigator)=>{
                           let Component = route.component;
                           return <Component {...route.passProps} navigator={navigator}/>;
                        }}
                />
            </TabNavigator.Item>
        )
    }

}

const styles = StyleSheet.create({

     iconStyle:{
        width: Platform.OS === 'ios' ? 28 : 25,
        height:Platform.OS === 'ios' ? 28 : 25
    },

    selectedTitleStyle:{
        color:'orange'
    }
});

// 输出组建类
module.exports = Main;