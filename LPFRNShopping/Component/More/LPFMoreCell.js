/**
 * Created by Roc on 2017/8/23.
 */

import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Switch,
    Platform,
    TouchableOpacity
} from 'react-native';

class MoreCell extends React.Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {isOn:false};
      }

    render() {
        return (
            <TouchableOpacity onPress={()=>{alert('点击cell')}}>

            <View style={styles.container}>
                {/*左边*/}
                <Text style={{marginLeft:8}}>{this.props.title}</Text>
                {/*右边*/}
                {this.renderRightView()}

            </View>
            </TouchableOpacity>
        );
    }

    // cell右边显示的内容
    renderRightView(){
        // 判断
        if (this.props.isSwitch){ // true
            return(
                <Switch value={this.state.isOn == true} onValueChange={()=>{this.setState({isOn: !this.state.isOn})}} style={{marginRight:8}} />
            )
        }else{
            return(
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    {this.rightTitle()}
                    <Image source={{uri: 'icon_cell_rightArrow'}} style={{width:8, height:13, marginRight:8}}/>
                </View>
            )
        }
    }

    rightTitle(){
        if(this.props.rightTitle.length > 0){
            return(
                <Text style={{color:'gray', marginRight:3}}>{this.props.rightTitle}</Text>
            )
        }
    }
}

MoreCell.defaultProps = {
    title: '',
    isSwitch: false,
    rightTitle :'',
}

const styles = StyleSheet.create({

    container: {
        flexDirection:'row',
        // 主轴的对齐方式
        justifyContent:'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height:Platform.OS == 'ios' ? 44 : 35,
        borderBottomColor:'#dddddd',
        borderBottomWidth:0.5,
    },

});

// 输出组建类
module.exports = MoreCell;