import { View, Text ,Image,TextInput} from 'react-native'
import {useState} from 'react'

export default function Tobtabs({ onSearch }) {
    const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    // ส่งค่าที่ค้นหาไปยัง Homepage
    onSearch(searchText);
  };
  return (
    <View className="flex-3 justify-around items-center  bg-[#CE4257] " style={{flexDirection:'row',height:120,borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
      <Image source={require('../../assets/TopLayout.png')} ></Image>
        <TextInput placeholder="Search" className='bg-white w-72 h-12 px-2 rounded-md' value={searchText} onChangeText={setSearchText} onSubmitEditing={handleSearch}></TextInput>
    </View>
  )
}