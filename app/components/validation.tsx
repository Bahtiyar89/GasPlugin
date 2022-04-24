import React from 'react';
import { View, Text } from 'react-native';
import { HelperText } from 'react-native-paper';

interface IProps {
  text: any;
  visible: boolean;
  errText: string;
}
const Validation: React.FC<IProps> = (props: IProps) => {
  const { text, visible, errText } = props;

  return (
    <View style={{ flexDirection: 'row', width: '90%', justifyContent:'space-between', marginTop:10 }}>
      <Text>{text}</Text>
      <HelperText 
        type="error"
        visible={visible}>
        {errText}
      </HelperText>
    </View>
  );
};

export default Validation;
