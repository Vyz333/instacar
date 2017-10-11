import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, StatusBar, Platform, Dimensions } from 'react-native';
import styles from './Styles/CarSwiperStyle'
import Carousel, { Pagination,CarouselStatic } from 'react-native-snap-carousel';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import _ from 'lodash'

import SliderEntry from './SliderEntry';

import Colors from '../Themes/Colors'
import {ButtonGroup} from 'react-native-elements'

const {width,height } = Dimensions.get('window')
const SLIDER_1_FIRST_ITEM = 0;
const CAR_CAT_FIRST_ITEM = 0;

export default class CarSwiper extends Component {
  constructor (props) {
        super(props);
        this.state = {
            quantity: 1,
        };
    }

    _renderItem ({item, index}) {
        return (
            <SliderEntry
              data={item}
              even={(index + 1) % 2 === 0}
            />
        );
    }

    _renderItemWithParallax ({item, index}, parallaxProps) {
        return (
            <SliderEntry
              data={item}
              even={(index + 1) % 2 === 0}
              parallax={true}
              parallaxProps={parallaxProps}
            />
        );
    }
    /*carousel (cat,idx,onChange) {
        const dataset = cars[cat];
        return (
 
        );
    }*/
    
    render () {
        const { quantity } = this.state;
        const { input: {value,onChange }, cars } = this.props

        if(!cars||Object.keys(cars).length<1)return null;
        const buttons =JSON.parse(JSON.stringify(Object.keys(cars)));
        const entries = Object.entries(Object.keys(cars));
        let pickervals = []
        for(let [i,button] of entries){
            pickervals.push({label: button, value: i})
        }

        const {cat,idx} = value||JSON.parse(JSON.stringify({cat:buttons[0],idx:0}))
        const dataset = cars[cat];
        const car = dataset[idx]
        
        const carousel = 
        <Carousel
            ref={(c) => { this._carousel = c; }}
            data={dataset}
            firstItem={idx}
            renderItem={this._renderItem}
            sliderWidth={width}
            itemWidth={width}
            hasParallaxImages={false}
            inactiveSlideScale={0.94}
            activeSlideAlignment={'center'}
            inactiveSlideOpacity={0.6}
            enableMomentum={false}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContentContainer}
            scrollEndDragDebounceValue={Platform.OS === 'ios' ? 0 : 100}
            onSnapToItem={(index) => onChange({cat:cat,idx:index})}
        />

        return (
            <View style={styles.container}>
            {/* <Text style={styles.subtitle}>Selecciona el carro a rentar</Text> */}
            {carousel}
            <Pagination
            dotsLength={dataset.length}
            activeDotIndex={idx}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.paginationDot}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            onSnapToItem={(index) => onChange(JSON.parse(JSON.stringify({cat:'Carga',idx:0})))}
            />
            {/* <ButtonGroup
            onPress={ this._changeCat}
            selectedIndex={buttons.indexOf(cat)}
            buttons={buttons}
            selectedBackgroundColor={Colors.steel}
            /> */}
            <RadioForm
            radio_props={pickervals}
            initial={buttons.indexOf(cat)}
            formHorizontal={true}
            labelHorizontal={false}
            buttonColor={Colors.primaryDark}
            animation={true}
            onPress={this._changeCat}
            />
            </View>
        );
    }
    _changeCat = (catidx)=> {
        const { input: {value,onChange }, cars } = this.props
        if(!cars)return null;
        let buttons =JSON.parse(JSON.stringify(Object.keys(cars)));

        this._carousel.snapToItem (index=0, animated = false,fireCallback= false)
        onChange({cat:JSON.parse(JSON.stringify(buttons[catidx])),idx:0})
    }
}
