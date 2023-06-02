import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import tw from 'twrnc';

const SingleButton = ({
  option,
  isSelected,
  onSelect,
  isLastButton,
  fitContent,
  height = 40,
}) => {
  return (
    <TouchableHighlight
      underlayColor="white"
      style={[
        tw`mx-1 ${isSelected ? 'bg-blue-300' : 'bg-white'} ${
          fitContent ? 'w-21' : 'w-20'
        } border-black rounded border px-0.5 ${
          isLastButton ? 'border-r' : ''
        } justify-center`,
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
        } p-0.5 text-center ${fitContent ? 'text-xs' : 'text-sm'}`}>
        {option.label}
      </Text>
    </TouchableHighlight>
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
