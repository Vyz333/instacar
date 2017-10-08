import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from './Styles/SliderEntryStyle';

export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image () {
        const { data: { illustration,rate }, parallax, parallaxProps, even } = this.props;

        return parallax ? (
            <ParallaxImage
              source={{ uri: illustration }}
              
              style={[styles.image, { position: 'relative' }]}
              parallaxFactor={0.35}
              showSpinner={true}
              spinnerColor={'rgba(255, 255, 255, 0.3)'}
              {...parallaxProps}
            />
        ) : (
            <Image
              source={{ uri: illustration }}
              style={styles.image}
            />
        );
    }

    render () {
        const { data: { title, subtitle,rate }, even } = this.props;

        const uppercaseTitle = title ? (
            <Text
              style={[styles.title]}
              numberOfLines={2}
            >
                { title.toUpperCase() }
            </Text>
        ) : false;
        console.log(title,subtitle,rate)
        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={() => { console.log(`You've clicked '${title}'`); }}
              >
                <View style={[styles.imageContainer]}>
                    { this.image }
                    <View style={[styles.radiusMask]} />
                </View>
                <View style={[styles.textContainer]}>
                    
                        { uppercaseTitle }
                        <View style={[styles.textSubContainerH]}>
                            <Text
                            style={[styles.subtitle]}
                            numberOfLines={2}
                            >
                                { subtitle }
                            </Text>
                            <Text 
                            style={{
                            textAlign:'right', 
                            color:'green',
                            marginTop: 2,
                            fontSize: 12,
                            fontStyle: 'italic'
                            }}
                            numberOfLines={1}
                            >
                            ${rate}/hr.
                            </Text>
                        </View>
                    
                </View>
            </TouchableOpacity>
        );
    }
}
