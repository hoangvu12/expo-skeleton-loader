import { ViewProps, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

export const DEFAULT_BONE_COLOR = "#121212";
export const DEFAULT_HIGHLIGHT_COLOR = "#333333";
export const DEFAULT_DURATION = 500;

export interface LoaderProps {
  children: JSX.Element | JSX.Element[];
  duration?: number;
  boneColor?: string;
  highlightColor?: string;
  style?: ViewStyle;
}

export interface LoaderItemStyle extends ViewStyle {
  width: number;
  height: number;
}

export interface LoaderContainerProps extends ViewProps {
  children: JSX.Element | JSX.Element[];
}

export interface LoaderItemProps extends ViewProps {
  style: LoaderItemStyle;
}

export interface LoaderViewProps {
  progress: Animated.SharedValue<number>;
  style?: ViewStyle;
  boneColor?: string;
  highlightColor?: string;
}
