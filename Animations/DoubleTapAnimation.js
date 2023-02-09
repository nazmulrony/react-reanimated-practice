import {
    Dimensions,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { useRef } from "react";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
} from "react-native-reanimated";

const DoubleTapAnimation = () => {
    const scale = useSharedValue(0);
    const doubleTapRef = useRef();
    const AnimatedImage = Animated.createAnimatedComponent(Image);
    const imageUri =
        "https://images.unsplash.com/photo-1556800467-7b7ba9da0bf8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: Math.max(scale.value, 0) }],
        };
    });

    const handleDoubleTap = () => {
        scale.value = withSpring(1, undefined, (isFinished) => {
            if (isFinished) {
                scale.value = withDelay(500, withSpring(0));
            }
        });
    };
    return (
        <View style={styles.container}>
            <TapGestureHandler
                waitFor={doubleTapRef}
                onActivated={() => console.log("Single tap")}
            >
                <TapGestureHandler
                    maxDelayMs={250}
                    ref={doubleTapRef}
                    numberOfTaps={2}
                    onActivated={handleDoubleTap}
                >
                    <Animated.View>
                        <ImageBackground
                            source={{ uri: imageUri }}
                            style={styles.image}
                        >
                            <AnimatedImage
                                source={require("../assets/heart.png")}
                                style={[
                                    styles.image,
                                    { elevation: 12 },
                                    rStyle,
                                ]}
                                resizeMode="center"
                            />
                        </ImageBackground>
                    </Animated.View>
                </TapGestureHandler>
            </TapGestureHandler>
        </View>
    );
};

export default DoubleTapAnimation;

const { width: SIZE } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: SIZE,
        height: SIZE,
        // flex: 1,
    },
});
