import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';

const SingleButton = ({option, isSelected, onSelect, height = 40}) => {
  return (
    <TouchableOpacity
      style={[
        tw`mx-1 w-21 justify-center border-black rounded border px-0.5 ${
          isSelected ? 'bg-blue-400' : 'bg-white'
        }`,
        {
          height,
        },
      ]}
      onPress={() => {
        onSelect(option.value);
      }}>
      <Text
        style={tw`${
          isSelected ? 'text-white' : 'text-black'
        } p-0.5 text-center text-sm`}>
        {option.label}
      </Text>
    </TouchableOpacity>
  );
};

const ButtonGroup = ({values, selectedValue, ...rest}) => {
  return (
    <View style={tw`flex-row justify-around`}>
      {values.map(each => (
        <SingleButton
          {...rest}
          key={each.label}
          option={each}
          isSelected={selectedValue === each.value}
        />
      ))}
    </View>
  );
};
export default ButtonGroup;
