import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

class CityWeather extends React.Component {
  render() {
    return (
      <ListItem
        title={this.props.name}
        subtitle={
          this.props.weather ? this.props.weather : 'TBD'
        }
        badge={{
          value: this.props.temp
            ? this.props.temp + ' °F'
            : '0 °F',
          badgeContainerStyle: {
            backgroundColor: 'lightblue',
          },
        }}
        avatar={{ uri: this.props.icon }}
        onPress={
          this.props.onPress ? this.props.onPress() : null
        }
      />
    );
  }
}

class MasterScreen extends React.Component {
  static navigationOptions = {
    title: 'Weather',
  };

  constructor() {
    super();

    this.state = {
      cities: [
        { name: 'San Jose', id: 5392171 },
        { name: 'New York', id: 5128581 },
        { name: 'London', id: 2643744 },
        { name: 'Paris', id: 2968815 },
        { name: 'Hong Kong', id: 1819729 },
        { name: 'Singapore', id: 1880252 },
        { name: 'Beijing', id: 1816670 },
        { name: 'Sydney', id: 6619279 },
        { name: 'São Paulo', id: 3448439 },
        { name: 'San Juan', id: 4568138 },
        { name: 'Mumbai', id: 1275339 },
        { name: 'Reykjavík', id: 6692263 },
      ],
    };
  }

  componentDidMount() {
    const ids = this.state.cities
      .map(city => city.id)
      .toString();

    fetch(
      `http://api.openweathermap.org/data/2.5/group?units=imperial&APPID=b1b35bba8b434a28a0be2a3e1071ae5b&id=${ids}`
    )
      .then(res => res.json())
      .then(body =>
        body.list.map(city => {
          return {
            id: city.id,
            name: city.name,
            temp: city.main.temp,
            icon: 'http://openweathermap.org/img/w/' +
              city.weather[0].icon +
              '.png',
            weather: city.weather[0].main,
          };
        }))
      .then(cities => {
        this.setState({
          cities: cities,
        });
      });
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        {this.state.cities.map(city => (
          <CityWeather
            key={city.id}
            name={city.name}
            temp={city.temp}
            weather={city.weather}
            icon={city.icon}
            onPress={() =>
              () =>
                this.props.navigation.navigate('Detail', {
                  cityId: city.id,
                })}
          />
        ))}
      </ScrollView>
    );
  }
}

class DetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Details',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Detailed weather information coming soon.
        </Text>
      </View>
    );
  }
}

export default (MainNavigator = StackNavigator({
  Master: { screen: MasterScreen },
  Detail: { screen: DetailScreen },
}));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
