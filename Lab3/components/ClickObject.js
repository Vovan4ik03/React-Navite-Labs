import React, { useContext } from "react";
import { Text } from "react-native";
import {
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  FlingGestureHandler,
  PinchGestureHandler,
  Directions,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { GameContext } from "../context/GameContext";

export default function ClickObject({ styles }) {
  const { addPoints } = useContext(GameContext);

  const scale = useSharedValue(1);
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { scale: scale.value },
    ],
  }));

  return (
    <PanGestureHandler
      onGestureEvent={(e) => {
        x.value = e.nativeEvent.translationX;
        y.value = e.nativeEvent.translationY;
        addPoints(2);
      }}
    >
      <Animated.View style={animatedStyle}>
        <PinchGestureHandler
          onGestureEvent={(e) => {
            scale.value = e.nativeEvent.scale;
            addPoints(5);
          }}
        >
          <Animated.View>
            <FlingGestureHandler
              direction={Directions.RIGHT}
              onActivated={() => addPoints(Math.floor(Math.random() * 50))}
            >
              <FlingGestureHandler
                direction={Directions.LEFT}
                onActivated={() => addPoints(Math.floor(Math.random() * 50))}
              >
                <LongPressGestureHandler
                  onActivated={() => addPoints(20)}
                >
                  <TapGestureHandler
                    numberOfTaps={2}
                    onActivated={() => addPoints(10)}
                  >
                    <TapGestureHandler
                      onActivated={() => addPoints(1)}
                    >
                      <Animated.View style={[styles.button]}>
                        <Text style={styles.buttonText}>
                          Клікати 👆🏼
                        </Text>
                      </Animated.View>
                    </TapGestureHandler>
                  </TapGestureHandler>
                </LongPressGestureHandler>
              </FlingGestureHandler>
            </FlingGestureHandler>
          </Animated.View>
        </PinchGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
}