import { Text, View ,StyleSheet} from "react-native";
import { type ImageSource } from 'expo-image';
import {useState, useRef} from 'react'
import ImageViewer from '@/components/ImageViewer';
import EmojiList from '@/components/EmojiList'
import Button from '@/components/Button';
import * as ImagePicker from 'expo-image-picker';
import IconButton from '@/components/IconButton';
import CircleButton from '@/components/CircleButton';
import EmojiPicker from '@/components/ImogiPicker';
import EmojiSticker from '@/components/EmojiSticker';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from "react-native-view-shot";


const PlaceHolder = require("@/assets/images/background-image.png");


export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string|undefined>(undefined);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  
  const imageRef = useRef<View>(null);

  if(status===null){
    requestPermission();
  }

  const imagePicker = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:['images'],
      allowsEditing:false,
      quality:1,
    });

    if(!result.canceled){
      alert('You selected an image')
      setSelectedImage(result.assets[0].uri)
      setShowOptions(true);
    }else{
      alert('You did not selected any image')
      //setSelectedImage('')
    }
  }

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = (isSelected:boolean) => {
    if(!isSelected){
      setSelectedImage(undefined);
    }
    setIsModalVisible(false);
  };

  const onReset = () => {
    setShowOptions(false);
  };

  const onSaveImageAsync = async () => {
    
      try{
        const uri = await captureRef(imageRef,{
          height:40,
          quality:1,
        })

        await MediaLibrary.saveToLibraryAsync(uri);
        if(uri){
          alert('Saved!')
        }
    }catch(e){alert('oops! did not save!')}
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
        <ImageViewer imgSource={PlaceHolder} myImage={selectedImage} />
        {pickedEmoji&&<EmojiSticker imageSize={40} stickerSource={pickedEmoji}/>}
        </View>
      </View>
      {showOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.fonter}>
          <Button theme="primary" label="Choose a photo" onClick={imagePicker} />
          <Button label="Use this photo" onClick={() => setShowOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={(item) =>{setPickedEmoji(item); setSelectedImage(item.uri);}} onCloseModal={onModalClose} />
      </EmojiPicker>

    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  imageContainer:{
    flex:1,
    paddingTop:28,
  },
  image:{
    width:320,
    height:420,
    borderRadius:18,
  },
  text:{
    color: '#fff',
    fontSize: 30,
  },
  button: {
    color: '#fff',
    textDecorationLine: 'underline',
    fontSize : 20,
  },
  container:{
    backgroundColor:"#25292e",
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  fonter:{
    flex:1/3,
    alignItems:'center',

  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});