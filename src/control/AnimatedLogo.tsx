import React from 'react';
import { Animated, Easing, View, Text } from 'react-native';

const AnimatedLogo = () => {

    let slowSpin = new Animated.Value(0);
    let spin = new Animated.Value(0.5);

    Animated.loop(
        Animated.timing(
            spin,
            {
                toValue: 1.5,
                duration: 10000,
                easing: Easing.linear,
                useNativeDriver: true
            }
        )
    ).start();

    Animated.loop(
        Animated.timing(
            slowSpin,
            {
                toValue: 1,
                duration: 10000,
                easing: Easing.linear,
                useNativeDriver: true
            }
        )
    ).start();

    const fastSpin = spin.interpolate({
        inputRange: [0, 2],
        outputRange: ['0deg', '360deg']
    });

    const oppositeFastSpin = spin.interpolate({
        inputRange: [0, 2],
        outputRange: ['360deg', '0deg']
    });

    const interpolatedSpin = slowSpin.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    const oppositeSpin = slowSpin.interpolate({
        inputRange: [0, 1],
        outputRange: ['360deg', '0deg']
    });

    const width = 100;
    const height = 100;

    return (
        <View style={{
            width,
            height: height,
            marginTop: 50,
            backgroundColor: '#555',
        }}>
            <Animated.Image
                style={
                    {
                        width,
                        height,
                        position: 'absolute',
                        transform: [{ rotate: interpolatedSpin }, { perspective: 1000 }]
                    }
                }
                source={require('../images/bill-me-logo-layer-1.png')}>
            </Animated.Image>
            <Animated.Image
                style={
                    {
                        width,
                        height,
                        position: 'absolute',
                        transform: [{ rotate: fastSpin }, { perspective: 1000 }]
                    }
                }
                source={require('../images/bill-me-logo-layer-1.png')} />
            <Animated.Image
                style={
                    {
                        width,
                        height,
                        position: 'absolute',
                        transform: [{ rotate: oppositeSpin }, { perspective: 1000 }]
                    }
                }
                source={require('../images/bill-me-logo-layer-1.png')} />
            <Animated.Image
                style={
                    {
                        width,
                        height,
                        position: 'absolute',
                        transform: [{ rotate: oppositeFastSpin }, { perspective: 1000 }]
                    }
                }
                source={require('../images/bill-me-logo-layer-1.png')} />
            <View
                style={{
                    position: 'absolute',
                    opacity: 0.9,
                    width,
                    height: height,
                    backgroundColor: '#000',
                }}
            ></View>
            <Text
                style={{
                    marginTop: 2,
                    marginLeft: 3,
                    fontSize: 70,
                    color: "#fff",
                    textAlign: 'center',
                    fontFamily: 'serif',
                }}
            >D</Text>
        </View>
    );
}

export default AnimatedLogo;