import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, ScrollView} from 'react-native';
import {useExpensesStore} from '../screens/Home';
import {PieChart} from 'react-native-chart-kit';
import tw from 'twrnc';
import Card from './Card';
import {Dropdown} from 'react-native-element-dropdown';
import {generateDataForChart} from './MonthlyExpenses';

const data = [
  {label: '2023', value: '2023'},
  {label: '2022', value: '2022'},
  {label: '2021', value: '2021'},
];

const YearlyExpenses = () => {
  const [selectedMonthYearData, setSelectedMonthYearData] = useState([]);
  const [showExpenseHeading, setExpenseHeading] = useState(false);
  const {receivedSMS} = useExpensesStore();
  const [travel, setTravel] = useState(0);
  const [food, setFood] = useState(0);
  const [shopping, setShopping] = useState(0);
  const [rs, setRs] = useState(0);
  const [banking, setBanking] = useState(0);
  const [dataToBePassed, setDataToBePassed] = useState([]);
  const [showPieChart, setShowPieChart] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    setTravel(
      selectedMonthYearData
        .filter(each => each.category === 'Travel')
        .reduce((acc, curr) => {
          return acc + curr.amount;
        }, 0),
    );
    setFood(
      selectedMonthYearData
        .filter(each => each.category === 'Food')
        .reduce((acc, curr) => {
          return acc + curr.amount;
        }, 0),
    );
    setShopping(
      selectedMonthYearData
        .filter(each => each.category === 'Shopping')
        .reduce((acc, curr) => {
          return acc + curr.amount;
        }, 0),
    );
    setBanking(
      selectedMonthYearData
        .filter(each => each.category === 'Banking')
        .reduce((acc, curr) => {
          return acc + curr.amount;
        }, 0),
    );
    setRs(
      selectedMonthYearData
        .filter(each => each.category === 'Recharges & Subscriptions')
        .reduce((acc, curr) => {
          return acc + curr.amount;
        }, 0),
    );
    if (
      travel === 0 &&
      food === 0 &&
      shopping === 0 &&
      banking === 0 &&
      rs === 0
    ) {
      setShowPieChart(false);
    } else if (selectedMonthYearData.length > 0) {
      setDataToBePassed(
        generateDataForChart(travel, food, shopping, banking, rs),
      );
      setExpenseHeading(true);
      setShowPieChart(true);
    }
  }, [value, selectedMonthYearData, travel, food, shopping, banking, rs]);

  return (
    <ScrollView>
      <Text style={tw`text-black`}>
        Select a year to categorize your expenses across categories like Food,
        Travel, Shopping, etc.
      </Text>
      <Dropdown
        style={tw`w-2/5 self-center border px-1 my-1`}
        itemTextStyle={tw`text-black`}
        selectedTextStyle={tw`text-black`}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={'Select Year'}
        placeholderStyle={tw`text-black`}
        value={value}
        onChange={item => {
          setValue(item.value);
          setSelectedMonthYearData(
            receivedSMS.filter(
              each => each.date.getFullYear() === parseInt(item.value),
            ),
          );
          setExpenseHeading(true);
          setShowPieChart(true);
        }}
      />
      {showExpenseHeading && (
        <Text style={tw`text-center text-black text-xl font-bold my-2`}>
          {selectedMonthYearData.length > 0 ? `Yearly` : `No`} Expenses for{' '}
          {value}
        </Text>
      )}
      {showPieChart && (
        <>
          <PieChart
            data={dataToBePassed}
            width={Dimensions.get('window').width}
            height={220}
            chartConfig={{
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor={'amount'}
            backgroundColor={'transparent'}
          />
          <View>
            {selectedMonthYearData.map((each, i) => {
              return (
                <Card
                  key={i}
                  name={each.merchant}
                  amount={each.amount}
                  category={each.category}
                  date={each.date}
                />
              );
            })}
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default YearlyExpenses;
