import {View, Text} from 'react-native'
import { GestureDetector,Gesture } from 'react-native-gesture-handler';
import {type ImageSource} from 'expo-image';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';


type Props = {
    imageSize:number;
    stickerSource:ImageSource;
}

export default function EmojiSticker({imageSize, stickerSource}:Props){
    const scaleImage = useSharedValue(imageSize);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const doubleTap = Gesture.Tap()
                            .numberOfTaps(2)
                            .onStart(()=>{
                                if(scaleImage.value !== imageSize*2){
                                    scaleImage.value = imageSize*2;
                                }else{
                                    scaleImage.value = Math.round(scaleImage.value/2);
                                }
                            });

    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value),
        };
    });

    const drag = Gesture.Pan().onChange((event)=>{
        translateX.value += event.changeX;
        if(translateX.value<1)
        {
            translateX.value = 1;
        }
        if(translateX.value>320){
            translateX.value = 320;
        }
        //console.log('x = '+translateX.value);
        //console.log('y = '+translateY.value);
        translateY.value += event.changeY;
        if(translateY.value<30){
            translateY.value = 30;
        }
        if(translateY.value>320){
            translateY.value = 320;
        }
    });

    const viewStyle = useAnimatedStyle(()=>{
        return {
            transform:[
                {translateX:translateX.value},
                {translateY:translateY.value},
            ],
        };
    });
    
    return(
        <GestureDetector gesture={drag}>
            <Animated.View style={[viewStyle,{top:-350}]}>
                <GestureDetector gesture={doubleTap}>
                    <Animated.Image source={stickerSource} resizeMode='contain' style={[imageStyle,{width:imageSize, height:imageSize}]}/>
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    );
}