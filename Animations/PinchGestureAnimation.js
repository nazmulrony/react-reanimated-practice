import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { PinchGestureHandler } from "react-native-gesture-handler";
import Animated, {
    interpolate,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("window");

const PinchGestureAnimation = () => {
    const scale = useSharedValue(1);
    const focalX = useSharedValue(0);
    const focalY = useSharedValue(0);

    const AnimatedImage = Animated.createAnimatedComponent(Image);

    const imageUri =
        "https://images.unsplash.com/photo-1674924428961-f106fb5d91c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
    const pinchGestureHandler = useAnimatedGestureHandler({
        onStart: (event, ctx) => {
            ctx.scale = event.scale;
            ctx.focalX = event.focalX;
            ctx.focalY = event.focalY;
        },
        onActive: (event, ctx) => {
            // scale.value = event.scale + ctx.scale;
            // focalX.value = event.focalX + ctx.focalX;
            // focalY.value = event.focalY + ctx.focalY;
            scale.value = event.scale;
            focalX.value = event.focalX;
            focalY.value = event.focalY;
        },
        onEnd: (event, ctx) => {
            // scale.value = event.scale + ctx.scale;
            scale.value = withTiming(1);
        },
    });
    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: focalX.value },
                { translateY: focalY.value },
                { translateX: -width / 2 },
                { translateY: -height / 2 },
                { scale: scale.value },
                { translateX: -focalX.value },
                { translateY: -focalY.value },
                { translateX: width / 2 },
                { translateY: height / 2 },
            ],
        };
    });
    const rFocalPointStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: focalX.value },
                { translateY: focalY.value },
            ],
        };
    });
    return (
        <View style={styles.container}>
            <PinchGestureHandler onGestureEvent={pinchGestureHandler}>
                <Animated.View style={{ flex: 1 }}>
                    <AnimatedImage
                        source={{ uri: imageUri }}
                        style={[{ flex: 1 }, rStyle]}
                    />
                    <Animated.View
                        style={[styles.focalPoint, rFocalPointStyle]}
                    />
                </Animated.View>
            </PinchGestureHandler>
        </View>
    );
};

export default PinchGestureAnimation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    focalPoint: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: "blue",
        ...StyleSheet.absoluteFillObject,
    },
});
