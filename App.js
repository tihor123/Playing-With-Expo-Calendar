// example only fot iOS !!
//
import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Constants, Calendar, Permissions } from 'expo';
import moment from 'moment'

export default class App extends Component {
  state = {
    results: '',
  };

  myCalendar = async () => {
    let { status } = await Permissions.askAsync(Permissions.CALENDAR);
    if (status === 'granted') {
      let s = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      console.log('upto here', s);
    }
    var eventi = await Calendar.createEventAsync("20087", {
        title: 'Repeat',
        startDate: new Date('2019-05-07'),
        endDate: new Date('2019-05-10'),
        timeZone: 'GMT-7',
        allDay: true,
        alarms: [{relativeOffset:910,method:Calendar.AlarmMethod.EMAIL}, {relativeOffset:911,method:Calendar.AlarmMethod.SMS}, {relativeOffset:912,method:Calendar.AlarmMethod.DEFAULT}],
        recurrenceRule : {
          frequency: Calendar.Frequency.DAILY,
          interval: 1,
          endDate: new Date('2019-05-21'),
          occurence: 1,
        },
    })
      .then(event => {
        this.setState({results:event});
        console.log('success', event);
      })
      .catch(error => {
        console.log('failure', error);
      });
    // var eventi = await Calendar.deleteEventAsync("1542").then(event=>{
    //   console.log('success',event);
    // }).catch(error=>{
    //   console.log('faliure', error);
    // })
    console.log("event",eventi);
    // let d = Calendar.getEventAsync("1533").then(event=>{
    //   console.log('success',JSON.stringify(JSON.stringify(event)));
    // }).catch(error=>{console.log('faliure', error);});
    // console.log("d",JSON.stringify(JSON.stringify(d)));
  };

  render() {
    // console.log(moment(new Date('2019-05-07')).format('DD-MM-YYYY, hh:mm A'))
    return (
      <View style={styles.container}>
        <Button
          title="Calendar"
          onPress={() => this.myCalendar()}
          buttonStyle={{ backgroundColor: '#d00001', fontWeight: 'bold' }}
        />

        <Text style={{ marginTop: 20 }}>{this.state.results}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
