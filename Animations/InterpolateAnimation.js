import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
} from "react-native-reanimated";
import Page from "../components/InterpolateAnimation/Page";

const WORDS = ["What's", "up", "mobile", "devs"];

const InterpolateAnimation = () => {
    const translateX = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        translateX.value = event.contentOffset.x;
    });
    return (
        <Animated.ScrollView
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            horizontal
            pagingEnabled
        >
            {WORDS.map((title, index) => {
                return (
                    <Page
                        key={index}
                        title={title}
                        index={index}
                        translateX={translateX}
                    />
                );
            })}
        </Animated.ScrollView>
    );
};

export default InterpolateAnimation;

const styles = StyleSheet.create({});
