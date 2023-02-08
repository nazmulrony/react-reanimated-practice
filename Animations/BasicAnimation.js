import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSpring,
    withTiming,
} from "react-native-reanimated";

const SIZE = 100;

//worklet helps to run a javascript function in the ui thread....
const handleRotation = (progress) => {
    "worklet";
    return `${progress.value * 2 * Math.PI}rad`;
};

const BasicAnimation = () => {
    const progress = useSharedValue(1);
    const scale = useSharedValue(2);
    const color = useSharedValue("blue");
    const reanimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: progress.value,
            borderRadius: (progress.value * SIZE) / 2,
            transform: [
                { scale: scale.value },
                { rotate: handleRotation(progress) },
            ],
            backgroundColor: color.value,
        };
    }, []);

    useEffect(() => {
        progress.value = withRepeat(withSpring(0.5), -1, true);
        scale.value = withRepeat(withSpring(1), -1, true);
        color.value = withRepeat(
            withTiming("green", { duration: 4000 }),
            -1,
            true
        );
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    { height: SIZE, width: SIZE, backgroundColor: "blue" },
                    reanimatedStyle,
                ]}
            ></Animated.View>
        </View>
    );
};

export default BasicAnimation;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
