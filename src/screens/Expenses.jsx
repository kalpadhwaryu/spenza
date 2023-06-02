import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import tw from 'twrnc';
import ButtonGroup from '../components/ButtonGroup';
import MonthlyExpense from '../components/MonthlyExpense';
import YearlyExpense from '../components/YearlyExpense';

export const EXPENSES_ROUTE = 'Expenses';

const Expenses = () => {
  const [expenseType, setExpenseType] = useState('monthly');
  return (
    <ScrollView style={tw`p-3`}>
      <Text style={tw`text-black font-bold text-2xl my-2`}>Expenses</Text>
      <View style={tw`items-center my-2`}>
        <ButtonGroup
          height={35}
          values={[
            {
              label: 'Monthly',
              value: 'monthly',
            },
            {
              label: 'Yearly',
              value: 'yearly',
            },
          ]}
          selectedValue={expenseType}
          onSelect={value => {
            setExpenseType(value);
          }}
        />
      </View>
      {expenseType === 'monthly' ? <MonthlyExpense /> : <YearlyExpense />}
    </ScrollView>
  );
};

export default Expenses;
