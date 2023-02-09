import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Page from "../components/ScrollView/Page";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
    useAnimatedGestureHandler,
    useSharedValue,
    withDecay,
} from "react-native-reanimated";

const titles = ["What's", "up", "mobile", "devs"];

const ScrollView = () => {
    const translateX = useSharedValue(0);
    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.x = translateX.value;
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.x;
        },
        onEnd: (event) => {
            translateX.value = withDecay({ velocity: event.velocityX });
        },
    });
    return (
        <View style={styles.container}>
            <PanGestureHandler onGestureEvent={panGestureEvent}>
                <Animated.View style={{ flex: 1, flexDirection: "row" }}>
                    {titles.map((title, index) => (
                        <Page
                            key={index}
                            title={title}
                            index={index}
                            translateX={translateX}
                        />
                    ))}
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
};

export default ScrollView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
