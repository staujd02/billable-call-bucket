import React from 'react';
import { Animated, Easing } from 'react-native';

const LoadingIcon = () => {

    let spinValue = new Animated.Value(0);

    Animated.loop(
        Animated.timing(
            spinValue,
            {
                toValue: 2,
                duration: 2000,
                easing: Easing.sin,
                useNativeDriver: true
            }
        )
    ).start();

    const spin = spinValue.interpolate({
        inputRange: [0, 2],
        outputRange: ['0deg', '360deg']
    });
    
    const oppositeSpin = spinValue.interpolate({
        inputRange: [0, 2],
        outputRange: ['360deg', '0deg']
    });

    return <>
        <Animated.Image
            style={
                {
                    width: 500,
                    height: 500,
                    position: 'absolute',
                    transform: [{ rotate: oppositeSpin }, { perspective: 1000 }]
                }
            }
            source={require('../images/bill-me-splash-layer-1.png')}>
        </Animated.Image>
        <Animated.Image
            style={
                {
                    width: 500,
                    height: 500,
                    position: 'absolute',
                    transform: [{ rotate: spin }, { perspective: 1000 }]
                }
            }
            source={require('../images/bill-me-splash-layer-2.png')} />
        <Animated.Image
            style={
                {
                    width: 500,
                    height: 500,
                    position: 'absolute',
                }
            }
            source={require('../images/bill-me-splash-layer-3.png')} />
    </>
}

export default LoadingIcon;