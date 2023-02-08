import { View, Text, Dimensions, StyleSheet } from "react-native";
import React from "react";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const SIZE = width * 0.7;

const Page = ({ title, index, translateX }) => {
    const inputRange = [
        (index - 1) * width,
        index * width,
        (index + 1) * width,
    ];
    const reanimatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(translateX.value, inputRange, [0, 1, 0]);
        const borderRadius = interpolate(
            translateX.value,
            inputRange,
            [0, SIZE / 2, 0],
            Extrapolate.CLAMP
        );
        return {
            borderRadius,
            transform: [{ scale }],
        };
    });
    const reanimatedTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(translateX.value, inputRange, [-2, 1, -2]);
        const translateY = interpolate(
            translateX.value,
            inputRange,
            [height / 2, 0, -height / 2],
            Extrapolate.CLAMP
        );
        return {
            opacity,
            transform: [{ translateY }],
        };
    });

    return (
        <View
            style={[
                styles.pageContainer,
                { backgroundColor: `rgba(76, 175, 79, 0.${index + 3})` },
            ]}
        >
            <Animated.View
                style={[styles.square, reanimatedStyle]}
            ></Animated.View>
            <Animated.View
                style={[{ position: "absolute" }, reanimatedTextStyle]}
            >
                <Text style={styles.text}>{title}</Text>
            </Animated.View>
        </View>
    );
};

export default Page;

const styles = StyleSheet.create({
    pageContainer: {
        width,
        height,
        justifyContent: "center",
        alignItems: "center",
    },
    square: {
        height: SIZE,
        width: SIZE,
        backgroundColor: "#4caf4fff",
    },
    text: {
        fontSize: 60,
        color: "white",
        fontWeight: "700",
        textTransform: "uppercase",
    },
});
