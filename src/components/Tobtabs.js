import { View ,Image,TextInput,StatusBar} from 'react-native'
import {useState} from 'react';
import { Icon } from '@rneui/base';
import { useAccelerometer } from '../context/UseAccelerometerContext';

export default function Tobtabs({ onSearch }) {
    const [searchText, setSearchText] = useState('');
    // ส่งค่าที่ค้นหาไปยัง Homepage
    const handleSearch = (text) => {
      setSearchText(text);
        onSearch(text);
    }
const {isPortrait} = useAccelerometer();
    
  


 

  return (
    <>
    {isPortrait ? (
       <View className="flex-3 justify-around items-center  bg-[#CE4257] " style={{flexDirection:'row',height:120,paddingTop:StatusBar.currentHeight}}>
       <Image source={require('../../assets/TopLayout.png')} ></Image>
         <TextInput placeholder="Search" className='bg-white w-72 h-12 px-2 rounded-md' value={searchText} onChangeText={handleSearch} ></TextInput>
         <Icon name="mic" color="white" />
      
     </View>


    ):(
      <View className="flex-3  items-center  bg-[#CE4257] " style={{flexDirection:'row',height:120,paddingTop:StatusBar.currentHeight}}>
        <View style={{flexDirection:'row', alignItems:'center',margin:5}}>
      <Image source={require('../../assets/TopLayout.png')} style={{marginLeft:5}}></Image>
        <TextInput style={{width:700}} placeholder="Search" className='bg-white h-12 px-2 rounded-md ml-4' value={searchText} onChangeText={handleSearch} ></TextInput>

        </View>
       
     
    </View>
    )}
    </>
   
  )
}
