import { StyleSheet } from "react-native";
import { Image, type ImageSource } from "expo-image";

type Props = {
  imgSource: ImageSource;
  myImage?:string,
};

export default function ImageViewer({ imgSource,myImage}: Props) {
  let source = myImage?myImage:imgSource
  return <Image source={source} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320,
    borderRadius: 18,
  },
});
