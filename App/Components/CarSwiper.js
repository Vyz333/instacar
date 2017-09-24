import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, StatusBar, Platform, Dimensions } from 'react-native';
import styles from './Styles/CarSwiperStyle'
import Carousel, { Pagination,CarouselStatic } from 'react-native-snap-carousel';


import SliderEntry from './SliderEntry';
//import styles, { colors } from 'example/src/styles/index.style';
import { SEDANS, SUVS, PASSENGER_CARS } from '../static/entries';
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
        this._changeCat = this._changeCat.bind(this)
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
        const buttons = ['Sedan', 'SUV', 'Pasajeros']
        const { quantity } = this.state;
        const { input: {value,onChange }, cars } = this.props
        const {cat,idx} = value||{cat:0,idx:0};
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
                <ScrollView
                  style={styles.scrollview}
                  contentContainerStyle={styles.scrollviewContentContainer}
                  indicatorStyle={'white'}
                  scrollEventThrottle={200}
                  directionalLockEnabled={true}
                >
                <View style={styles.contentContainer}>
                <Text style={styles.subtitle}>Selecciona tu vehículo</Text>
                {carousel}
                <Pagination
                  dotsLength={dataset.length}
                  activeDotIndex={idx}
                  containerStyle={styles.paginationContainer}
                  dotStyle={styles.paginationDot}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                  onSnapToItem={(index) => onChange({cat:cat,idx:index})}
                />
            </View>
            <ButtonGroup
            onPress={ this._changeCat}
            selectedIndex={cat}
            buttons={buttons}
            selectedBackgroundColor={Colors.steel}
            />
                <Text style={{margin:8,textAlign:'center', color:'green'}}>${car&&car.rate}/hr.</Text>

            </ScrollView>

            </View>
        );
    }
    _changeCat(catidx){
        const { input: {value,onChange } } = this.props
        const {cat,idx} = value||{cat:0,idx:0};
        this._carousel.snapToItem (index=0, animated = false,fireCallback= false)
        onChange({cat:catidx,idx:0})
    }
}
