import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
const { width: PAGE_WIDTH } = Dimensions.get("screen");
export default function Page({ title, index, translateX }) {
    const pageOffset = index * PAGE_WIDTH;
    const rStyle = useAnimatedStyle(() => {
        return { transform: [{ translateX: translateX.value + pageOffset }] };
    });

    return (
        <Animated.View
            style={[
                {
                    ...StyleSheet.absoluteFillObject,
                    flex: 1,
                    backgroundColor: `rgba(0, 0 ,256, 0.${index + 2})`,
                },
                rStyle,
            ]}
        >
            <Text>Page</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({});
