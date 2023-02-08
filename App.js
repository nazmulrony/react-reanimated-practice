import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BasicAnimation from "./Animations/BasicAnimation";
import InterpolateAnimation from "./Animations/InterpolateAnimation";
import PanGestureHandlerAnimation from "./Animations/PanGestureHandler";

export default function App() {
    return (
        <GestureHandlerRootView style={styles.container}>
            <StatusBar style="auto" />
            {/* <BasicAnimation /> */}
            {/* <PanGestureHandlerAnimation /> */}
            <InterpolateAnimation />
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
