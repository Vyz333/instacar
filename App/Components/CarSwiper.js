import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, StatusBar, Platform, Dimensions } from 'react-native';
import styles from './Styles/CarSwiperStyle'
import Carousel, { Pagination } from 'react-native-snap-carousel';

import SliderEntry from './SliderEntry';
//import styles, { colors } from 'example/src/styles/index.style';
import { SEDANS, SUVS, PASSENGER_CARS } from '../static/entries';
import Colors from '../Themes/Colors'
const {width,height } = Dimensions.get('window')
const SLIDER_1_FIRST_ITEM = 0;
const all_cars = [SEDANS, SUVS, PASSENGER_CARS];
export default class CarSwiper extends Component {
  constructor (props) {
        super(props);
        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
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

    get carousel () {
        const { slider1ActiveSlide } = this.state;
        console.log(this.props)
        const category = this.props.category;
        const dataset = all_cars[category];
        return (
            <View style={styles.contentContainer}>
                <Text style={styles.subtitle}>Selecciona tu vehículo</Text>
                <Carousel
                  data={dataset}
                  renderItem={this._renderItem}
                  sliderWidth={width}
                  itemWidth={width}
                  hasParallaxImages={false}
                  firstItem={SLIDER_1_FIRST_ITEM}
                  inactiveSlideScale={0.94}
                  activeSlideAlignment={'center'}
                  inactiveSlideOpacity={0.6}
                  enableMomentum={false}
                  containerCustomStyle={styles.slider}
                  contentContainerCustomStyle={styles.sliderContentContainer}
                  scrollEndDragDebounceValue={Platform.OS === 'ios' ? 0 : 100}
                  onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                />
                <Pagination
                  dotsLength={dataset.length}
                  activeDotIndex={slider1ActiveSlide}
                  containerStyle={styles.paginationContainer}
                  dotStyle={styles.paginationDot}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                  onSnapToItem={(index) => this.setState({ slider2ActiveSlide: index }) }
                />
            </View>
        );
    }

    render () {
        return (
            <View style={styles.container}>
                <ScrollView
                  style={styles.scrollview}
                  contentContainerStyle={styles.scrollviewContentContainer}
                  indicatorStyle={'white'}
                  scrollEventThrottle={200}
                  directionalLockEnabled={true}
                >
                    { this.carousel }
                </ScrollView>
            </View>
        );
    }
}
