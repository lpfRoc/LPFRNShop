/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';


var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');

// 引入计时器类库
var TimerMixin = require('react-timer-mixin');

// 引入json数据
var ImageData = require('./ImageData.json');

//引入外部组件
var TopScrollDetail = require('./LPFTopScrollDetail');


//ES5写法
var Home = React.createClass({
  
    // 注册计时器
    mixins: [TimerMixin],

    // 设置固定值
    getDefaultProps(){
       return{
          // 每隔多少时间
          duration: 1000
       }
    },

    // 设置可变的和初始值
    getInitialState(){
       return{
          // 当前的页码
          currentPage: 0
       }
    },

    render(){
       return(
          <View style={styles.container}>

           {/*首页的导航条*/}
          {this.renderNavBar()}


              <TouchableOpacity onPress={()=>{this.pushToScrollDetail()}}>
             <ScrollView 
                 ref="scrollView"
                 horizontal={true}
                 // 隐藏水平滚动条
                 showsHorizontalScrollIndicator={false}
                 // 自动分页
                 pagingEnabled={true}
                 // 当一帧滚动结束
                 onMomentumScrollEnd={(e)=>this.onAnimationEnd(e)}
                 // 开始拖拽
                 onScrollBeginDrag={this.onScrollBeginDrag}
                 // 停止拖拽
                 onScrollEndDrag={this.onScrollEndDrag}
             >
               {this.renderAllImage()}
             </ScrollView>
              </TouchableOpacity>
            {/*返回指示器*/}
             <View style={styles.pageViewStyle}>
               {/*返回5个圆点*/}
               {this.renderPageCircle()}
             </View>
          </View>
       );
    },

    renderNavBar(){
       return(
            <View style={styles.navBarBgStyle}>
            <View style={styles.statueBarStyle}> 

            </View>
            <View style={styles.navBarStyle}>

             {/*左边*/}
                <TouchableOpacity onPress={()=>{this.pushToScrollDetail()}}>
                <View style={styles.leftNavViewStyle}>
                  <Text style={{color:'white'}}>广州</Text>
                  <Image source={{uri:'icon_arrow'}} style={styles.navLeftImgStyle}/>
                  </View>
                </TouchableOpacity>
                {/*中间*/}
                <TextInput
                  placeholder="输入商家, 品类, 商圈"
                  style={styles.topInputStyle}
                />
                {/*右边*/}
                <View style={styles.rightNavViewStyle}>
                    <TouchableOpacity onPress={()=>{alert('点击了')}}>
                        <Image source={{uri:'icon_homepage_message'}} style={styles.navRightImgStyle}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{alert('点击了')}}>
                        <Image source={{uri:'icon_homepage_scan'}} style={styles.navRightImgStyle} />
                    </TouchableOpacity>

            </View>
               
                </View>
            </View>
        )

    },

    pushToScrollDetail(){
       this.props.navigator.push({
           component : TopScrollDetail,
           title: '轮播详情',
       });
    },

    // 调用开始拖拽
    onScrollBeginDrag(){
       // 停止定时器
       this.clearInterval(this.timer);
    },

    // 调用停止拖拽
   onScrollEndDrag(){
     // 开启定时器
     this.startTimer();
   },

    // 实现一些复杂的操作
    componentDidMount(){
       // 开启定时器
           this.timer = this.setTimeout(
      () => { console.log('把一个定时器的引用挂在this上'); },
      500
    );
       this.startTimer();
    },

      componentWillUnmount() {
    // 请注意Un"m"ount的m是小写

    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && this.clearTimeout(this.timer);
  },

    // 开启定时器
    startTimer(){
         // 1. 拿到scrollView
        var scrollView = this.refs.scrollView;
        var imgCount = ImageData.data.length;

         // 2.添加定时器  this.timer --->可以理解成一个隐式的全局变量
        this.timer = this.setInterval(function () {
            // 2.1 设置圆点
            var activePage = 0;
            // 2.2 判断
            if((this.state.currentPage+1) >= imgCount){ // 越界
               activePage = 0;
            }else{
               activePage = this.state.currentPage+1;
            }

            // 2.3 更新状态机
            this.setState({
              currentPage: activePage
            });

            // 2.4 让scrollView滚动起来
            var offsetX = activePage * width;
            scrollView.scrollResponderScrollTo({x:offsetX, y:0, animated:true});

         }, this.props.duration);

    },


    // 返回所有的图片
    renderAllImage(){
        // 数组
        var allImage = [];
        // 拿到图像数组
        var imgsArr = ImageData.data;
        // 遍历
        for(var i=0; i<imgsArr.length; i++){
            // 取出单独的每一个对象
            var imgItem = imgsArr[i];
            // 创建组件装入数组
            allImage.push(
                <Image key={i} source={{uri: imgItem.img}} style={{width:width, height:150}}/>
            );
        }
        // 返回数组
        return allImage;
    },

   // 返回所有的圆点
   renderPageCircle(){
       // 定义一个数组放置所有的圆点
       var indicatorArr = [];
       var style;
       // 拿到图像数组
       var imgsArr = ImageData.data;
       // 遍历
       for(var i=0; i<imgsArr.length; i++){

          // 判断
          style = (i==this.state.currentPage) ? {color:'orange'} : {color:'#ffffff'};

         // 把圆点装入数组
         indicatorArr.push(
             <Text key={i} style={[{fontSize:25},style]}>&bull;</Text>
         );
       }
       // 返回
       return indicatorArr;
   },

   //  当一帧滚动结束的时候调用
   onAnimationEnd(e){
      // 1.求出水平方向的偏移量
      var offSetX = e.nativeEvent.contentOffset.x;

      // 2.求出当前的页数
      var currentPage = Math.floor(offSetX / width);
      // console.log(currentPage);

      // 3.更新状态机,重新绘制UI
      this.setState({
        // 当前的页码
        currentPage: currentPage
      });
   }

});


const styles = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor: '#e8e8e8'
  },

  navBarBgStyle:{
      height:Platform.OS == 'ios' ? 64 : 44,
      // 设置侧轴的对齐方式
      backgroundColor:'rgba(255,96,0,1.0)',
  },

    statueBarStyle:{ // 导航条样式
        height: Platform.OS == 'ios' ? 20 : 10,
        backgroundColor:'rgba(255,96,0,1.0)',

    },


    navBarStyle:{ // 导航条样式
        height: Platform.OS == 'ios' ? 44 : 34,
        backgroundColor:'rgba(255,96,0,1.0)',

        // 设置主轴的方向
        flexDirection:'row',
        // 垂直居中 ---> 设置侧轴的对齐方式
        alignItems:'center',

        // 设置主轴的对齐方式
        justifyContent:'space-around'
    },

   leftNavViewStyle:{

     flexDirection:'row',
      // 设置侧轴的对齐方式
     alignItems:'center',

    },
    rightNavViewStyle:{
      flexDirection:'row',
      // 设置侧轴的对齐方式
      alignItems:'center',
    },

    topInputStyle:{ // 设置输入框
        width:width * 0.71,
        height:Platform.OS == 'ios' ? 30 : 28,
        backgroundColor:'white',

        // 设置圆角
        borderRadius:17,

        // 内左边距
        paddingLeft:10
    },

    navRightImgStyle:{ // 设置图片的大小
        width:Platform.OS == 'ios' ? 26: 24,
        height:Platform.OS == 'ios' ? 26: 24
    },
    navLeftImgStyle:{ // 设置图片的大小
        width:Platform.OS == 'ios' ? 15: 12,
        height:Platform.OS == 'ios' ? 15: 12,
    },

  pageViewStyle:{
      width:width,
      height:25,
      backgroundColor:'rgba(0,0,0,0.4)',

      // 定位
      position:'absolute',
      top:194,

      // 设置主轴的方向
      flexDirection:'row',
      // 设置侧轴方向的对齐方式
      alignItems:'center'
  }
});

// 输出组建类
module.exports = Home;
