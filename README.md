# Expo Skeleton Loader

A simple component to show skeleton loading animation. Works in almost all platforms.

> Currently only supports pulse animation.

## Preview

<p align="center">
  <img src="https://s6.gifyu.com/images/screen-recording.gif" alt="Preview gif"/>
</p>

## Platform Compatibility

| Android Device | Android Emulator | IOS Device | IOS Emulator | Web |
| -------------- | ---------------- | ---------- | ------------ | --- |
| ✔              | ✔                | ✔          | ✔            | ✔   |

## Installation

> This project using `react-native-reanimated`. Please install this package as well.

Using yarn:

```
yarn add expo-skeleton-loader
```

Using npm:

```
npm i expo-skeleton-loader
```

## Usage

### Expo Skeleton Loader takes it's children to figure out layout using `SkeletonLoader.Container` and `SkeletonLoader.Item`

```js
import React from "react";
import { StyleSheet, View, Dimensions, ViewStyle } from "react-native";
import SkeletonLoader from "expo-skeleton-loader";

const { width, height } = Dimensions.get("window");

const AvatarLayout = ({
  size = 100,
  style,
}: {
  size?: number,
  style?: ViewStyle,
}) => (
  <SkeletonLoader>
    <SkeletonLoader.Container
      style={[{ flex: 1, flexDirection: "row" }, style]}
    >
      <SkeletonLoader.Item
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          marginRight: 20,
        }}
      />
      <SkeletonLoader.Container style={{ paddingVertical: 10 }}>
        <SkeletonLoader.Item
          style={{ width: 220, height: 20, marginBottom: 5 }}
        />
        <SkeletonLoader.Item style={{ width: 150, height: 20 }} />
      </SkeletonLoader.Container>
    </SkeletonLoader.Container>
  </SkeletonLoader>
);

const PostLayout = () => (
  <SkeletonLoader style={{ marginVertical: 10 }}>
    <AvatarLayout style={{ marginBottom: 10 }} />

    <SkeletonLoader.Item
      style={{ width, height: height / 3.5, marginVertical: 10 }}
    />
  </SkeletonLoader>
);

const numberOfPosts = new Array(2).fill(null);

export default function App() {
  return (
    <View style={styles.container}>
      {numberOfPosts.map((_, i) => (
        <PostLayout key={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
  },
});
```

## Props

### SkeletonLoader

| Prop           | Description                         | Type      | Default   |
| -------------- | ----------------------------------- | --------- | --------- |
| duration       | Animation speed in milliseconds     | number    | `500`     |
| boneColor      | The background color of placeholder | string    | `#121212` |
| highlightColor | The highlight color of placeholder  | string    | `#333333` |
| style          | The style of component (View Style) | ViewStyle | `null`    |

### SkeletonLoader.Container

> You can use any props of View component.

| Prop  | Description                         | Type      | Default |
| ----- | ----------------------------------- | --------- | ------- |
| style | The style of component (View Style) | ViewStyle | `null`  |

### SkeletonLoader.Item

> ⚠️ Warning: The style must includes height and weight in order to works

> You can use any props of View component.

| Prop  | Description                         | Type      | Default |
| ----- | ----------------------------------- | --------- | ------- |
| style | The style of component (View Style) | ViewStyle | `null`  |


## Todos
1. Support more animation.

## Contributing

You are welcome to contribute!

## License

[MIT](https://choosealicense.com/licenses/mit/)

