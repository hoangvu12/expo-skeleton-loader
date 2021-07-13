import * as React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import {
  DEFAULT_BONE_COLOR,
  DEFAULT_DURATION,
  DEFAULT_HIGHLIGHT_COLOR,
  LoaderContainerProps,
  LoaderItemProps,
  LoaderProps,
  LoaderViewProps,
} from "./Constants";

export default function SkeletonLoader(props: LoaderProps) {
  const {
    children,
    duration = DEFAULT_DURATION,
    boneColor = DEFAULT_BONE_COLOR,
    highlightColor = DEFAULT_HIGHLIGHT_COLOR,
    style,
  } = props;

  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration }), -1, true);
  }, []);

  const getChildren = React.useCallback(
    (element: JSX.Element | JSX.Element[]) => {
      return React.Children.map(
        element,
        (child: JSX.Element, index: number) => {
          if (
            child.type.displayName !== "SkeletonItem" &&
            child.type.displayName !== "SkeletonContainer"
          ) {
            return child;
          }

          if (child.props.children) {
            return (
              <View key={index} style={child.props.style}>
                {getChildren(child.props.children)}
              </View>
            );
          }

          const style = {
            backgroundColor: highlightColor,
            ...child.props.style,
          };

          return (
            <PulseView
              progress={progress}
              style={style}
              boneColor={boneColor}
              highlightColor={highlightColor}
            />
          );
        }
      );
    },
    []
  );

  return <View style={[styles.container, style]}>{getChildren(children)}</View>;
}

SkeletonLoader.Item = ({ style, ...props }: LoaderItemProps) => (
  <View style={style} {...props} />
);

SkeletonLoader.Container = ({
  children,
  style,
  ...props
}: LoaderContainerProps) => (
  <View style={style} {...props}>
    {children}
  </View>
);

//@ts-ignore
SkeletonLoader.Item.displayName = "SkeletonItem";
//@ts-ignore
SkeletonLoader.Container.displayName = "SkeletonContainer";

const PulseView = (props: LoaderViewProps) => {
  const progress = useDerivedValue(() => props.progress.value);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [props.boneColor!, props.highlightColor!]
      ),
    };
  }, []);

  return (
    <Animated.View style={[styles.skeleton, props.style, animatedStyle]} />
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  skeleton: {
    height: "100%",
    width: "100%",
  },
});
