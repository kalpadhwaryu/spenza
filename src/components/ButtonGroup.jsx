import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';

const SingleButton = ({option, isSelected, onSelect, height = 40}) => {
  return (
    <TouchableOpacity
      underlayColor="white"
      style={[
        tw`mx-1 w-21 justify-center ${
          isSelected ? 'bg-blue-400' : 'bg-white'
        } border-black rounded border px-0.5`,
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
        } p-0.5 text-center text-sm'}`}>
        {option.label}
      </Text>
    </TouchableOpacity>
  );
};

const ButtonGroup = ({values, selectedValue, ...rest}) => {
  return (
    <View style={tw`flex-row ${rest.fitContent ? 'justify-around' : ''}`}>
      {values.map((each, index) => (
        <SingleButton
          {...rest}
          key={each.label}
          option={each}
          isSelected={selectedValue === each.value}
          isLastButton={index === values.length - 1}
        />
      ))}
    </View>
  );
};
export default ButtonGroup;
