import React, {useCallback, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import MonthYearPicker from 'react-native-month-year-picker';

export const EXPENSES_ROUTE = 'Expenses';

const Expenses = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showPicker = useCallback(value => setShow(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;

      showPicker(false);
      setDate(selectedDate);
      console.log(new Date(selectedDate).getMonth() + 1);
      console.log(new Date(selectedDate).getFullYear());
    },
    [date, showPicker],
  );

  // const ExpenseDataBasedOnMonthYear = 

  return (
    <ScrollView style={tw`p-3`}>
      <Text style={tw`text-black font-bold text-2xl my-2`}>Expenses</Text>
      <Text style={tw`text-black`}>
        Select month and year to categorize your expenses accros categories like
        Food, Travel, Shopping, etc.
      </Text>
      <TouchableOpacity
        onPress={() => showPicker(true)}
        style={tw`w-1/5 bg-blue-400 self-center rounded py-1 px-2 my-3`}>
        <Text style={tw`text-white text-center`}>Select</Text>
      </TouchableOpacity>
      {show && (
        <MonthYearPicker
          onChange={onValueChange}
          value={date}
          maximumDate={new Date()}
          minimumDate={new Date(2021, 0)}
        />
      )}
    </ScrollView>
  );
};

export default Expenses;
