import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
const SIZE = 80;
const CIRCLE_RADIUS = SIZE * 2.2;

const PanGestureHandlerAnimation = () => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const panGestureEvent = useAnimatedGestureHandler(
        {
            onStart: (event, context) => {
                context.translateX = translateX.value;
                context.translateY = translateY.value;
            },
            onActive: (event, context) => {
                translateY.value = event.translationY + context.translateY;
                translateX.value = event.translationX + context.translateX;
            },
            onEnd: (event) => {
                const distance = Math.sqrt(
                    translateX.value ** 2 + translateY.value ** 2
                );
                if (distance < CIRCLE_RADIUS + SIZE / 2) {
                    translateX.value = withSpring(0);
                    translateY.value = withSpring(0);
                }
            },
        },
        []
    );

    const reanimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
            ],
        };
    });

    return (
        <View style={styles.container}>
            <View style={styles.circle}>
                <PanGestureHandler onGestureEvent={panGestureEvent}>
                    <Animated.View
                        style={[styles.square, reanimatedStyle]}
                    ></Animated.View>
                </PanGestureHandler>
            </View>
        </View>
    );
};

export default PanGestureHandlerAnimation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    square: {
        height: SIZE,
        width: SIZE,
        borderRadius: 28,
        backgroundColor: "#4CAF50",
    },
    circle: {
        justifyContent: "center",
        alignItems: "center",
        height: CIRCLE_RADIUS * 2,
        width: CIRCLE_RADIUS * 2,
        borderRadius: CIRCLE_RADIUS,
        borderWidth: 2,
        borderColor: "#4CAF50",
    },
});
