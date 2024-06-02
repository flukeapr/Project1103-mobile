import { View, Text } from 'react-native'
import React from 'react';
import { Icon } from '@rneui/themed';

export default function RenderStar(props) {
    // components รับ props มาเพื่อส่ง icon star กลับไป
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          stars.push(
            
              <Icon
                name={i <= props.Rate ? 'star' : 'star-outline'}
                type='ionicon'
                size={props.Size}
                color={i <= props.Rate ? '#FFC107' : '#000'}
                key={i}
              />
           
          );
        }
        
        return stars;


}