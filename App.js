import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BasicAnimation from "./Animations/BasicAnimation";
import ColorInterPolationAnimation from "./Animations/ColorInterPolationAnimation";
import DoubleTapAnimation from "./Animations/DoubleTapAnimation";
import InterpolateAnimation from "./Animations/InterpolateAnimation";
import PanGestureHandlerAnimation from "./Animations/PanGestureHandler";
import PinchGestureAnimation from "./Animations/PinchGestureAnimation";
export default function App() {
    return (
        <GestureHandlerRootView style={styles.container}>
            <StatusBar style="auto" />
            {/* <BasicAnimation /> */}
            {/* <PanGestureHandlerAnimation /> */}
            {/* <InterpolateAnimation /> */}
            {/* <ColorInterPolationAnimation /> */}
            {/* <PinchGestureAnimation /> */}
            <DoubleTapAnimation />
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
