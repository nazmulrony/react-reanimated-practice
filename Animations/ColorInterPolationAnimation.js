import { Dimensions, StyleSheet, Switch, Text, View } from "react-native";
import React, { useState } from "react";
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

const colors = {
    dark: {
        background: "#1E1E1E",
        circle: "#252525",
        text: "#F8F8F8",
    },
    light: {
        background: "#F8F8F8",
        circle: "#FFF",
        text: "#1E1E1E",
    },
};

const SWITCH_TRACK_COLOR = {
    true: "rgba(256,0,256,0.2)",
    false: "rgba(0,0,0,0, 0.1)",
};

const ColorInterPolationAnimation = () => {
    const [theme, setTheme] = useState("light");
    const progress = useDerivedValue(() => {
        return theme === "dark"
            ? withTiming(1, { duration: 500 })
            : withTiming(0, { duration: 500 });
    }, [theme]);

    const rStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            [colors.light.background, colors.dark.background]
        );
        return {
            backgroundColor,
        };
    });
    const rCircleStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            [colors.light.circle, colors.dark.circle]
        );
        return {
            backgroundColor,
        };
    });
    const rTextStyle = useAnimatedStyle(() => {
        const color = interpolateColor(
            progress.value,
            [0, 1],
            [colors.light.text, colors.dark.text]
        );
        return {
            color,
        };
    });

    return (
        <Animated.View style={[styles.container, rStyle]}>
            <Animated.Text style={[styles.text, rTextStyle]}>
                Theme
            </Animated.Text>
            <Animated.View style={[styles.circle, rCircleStyle]}>
                <Switch
                    value={theme === "dark"}
                    onValueChange={(toggled) =>
                        setTheme(toggled ? "dark" : "light")
                    }
                    trackColor={SWITCH_TRACK_COLOR}
                    thumbColor={"violet"}
                />
            </Animated.View>
        </Animated.View>
    );
};

export default ColorInterPolationAnimation;

const SIZE = Dimensions.get("window").width * 0.7;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    circle: {
        height: SIZE,
        width: SIZE,
        borderRadius: SIZE / 2,
        // backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        elevation: 8,
    },
    text: {
        fontSize: 70,
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: 14,
        marginBottom: 36,
    },
});
