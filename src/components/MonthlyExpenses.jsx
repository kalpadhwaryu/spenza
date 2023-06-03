import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import MonthYearPicker from 'react-native-month-year-picker';
import {useExpensesStore} from '../screens/Home';
import {dummyData} from '../data/DummyData';
import {PieChart} from 'react-native-chart-kit';
import tw from 'twrnc';
import Card from './Card';

export const generateDataForChart = (
  travelExpense = 0,
  foodExpense = 0,
  shoppingExpense = 0,
  bankingExpense = 0,
  rsExpense = 0,
) => {
  return [
    {
      name: 'Travel',
      amount: travelExpense,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Food',
      amount: foodExpense,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Shopping',
      amount: shoppingExpense,
      color: 'red',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Subscriptions',
      amount: rsExpense,
      color: '#ffffff',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Banking',
      amount: bankingExpense,
      color: 'rgb(0, 0, 255)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];
};

const MonthlyExpenses = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selectedMonthYearData, setSelectedMonthYearData] = useState([]);
  const {receivedSMS} = useExpensesStore();
  const [travel, setTravel] = useState(0);
  const [food, setFood] = useState(0);
  const [shopping, setShopping] = useState(0);
  const [rs, setRs] = useState(0);
  const [banking, setBanking] = useState(0);
  const [dataToBePassed, setDataToBePassed] = useState([]);
  const [showPieChart, setShowPieChart] = useState(false);

  const showPicker = value => setShow(value);

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
    } else {
      setDataToBePassed(
        generateDataForChart(travel, food, shopping, banking, rs),
      );
      setShowPieChart(true);
    }
  }, [date, selectedMonthYearData, travel, food, shopping, banking, rs]);

  const onValueChange = (event, newDate) => {
    const selectedDate = newDate || date;
    showPicker(false);
    setDate(selectedDate);
    setSelectedMonthYearData(
      dummyData.filter(
        each =>
          each.date.getMonth() === selectedDate.getMonth() &&
          each.date.getFullYear() === selectedDate.getFullYear(),
      ),
    );
    setShowPieChart(true);
  };
  return (
    <ScrollView>
      <Text style={tw`text-black`}>
        Select month and year to categorize your expenses across categories like
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
      <Text style={tw`text-center text-black text-xl font-bold my-2`}>
        {selectedMonthYearData.length > 0 ? `Monthly` : `No`} Expenses for{' '}
        {new Date(date).toLocaleString('default', {
          month: 'short',
        }) +
          ' ' +
          new Date(date).getFullYear()}
      </Text>
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

export default MonthlyExpenses;
