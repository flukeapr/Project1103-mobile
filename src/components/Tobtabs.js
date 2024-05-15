import { View ,Image,TextInput,StatusBar} from 'react-native'
import {useState} from 'react';
import { Icon } from '@rneui/base';

export default function Tobtabs({ onSearch,toggleOverlay }) {
    const [searchText, setSearchText] = useState('');
    // ส่งค่าที่ค้นหาไปยัง Homepage
    const handleSearch = (text) => {
      setSearchText(text);
        onSearch(text);
    }

    
  


 

  return (
    <View className="flex-3 justify-around items-center  bg-[#CE4257] " style={{flexDirection:'row',height:120,paddingTop:StatusBar.currentHeight}}>
      <Image source={require('../../assets/TopLayout.png')} ></Image>
        <TextInput placeholder="Search" className='bg-white w-72 h-12 px-2 rounded-md' value={searchText} onChangeText={handleSearch} ></TextInput>
        <Icon name="mic" color="white" onPress={toggleOverlay}/>
      <Image />
    </View>
  )
}
