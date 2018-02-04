import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import Calendar from 'react-calendar/dist/entry.nostyle';
import calendarStyle from './CalendarStyle.css';
import Actions from '../actions/index';

const eventsAction = Actions.eventsAction;


const styles = {
  calendarContainer: {
    marginLeft:'2vw',
    height:'70vh',
    boxShadow: '0 0 10px #888',
    background: '#B1BBCC',
    display: 'flex',
    flexDirection: 'column',
    '& ul':{
      padding: '0',
      margin: '0 5%',
    }
  },
  list: {
    display: 'grid',
    gridTemplateColumns: '2fr 5fr',
    borderRadius: '0.5vw',
    padding:'5%',
    listStyle: 'none',
    marginTop: '20px',
    fontSize: '2vh',
    color:'#607896',
    '& div':{
      marginRight:'2vw',
      display:'flex',
      flexDirection:'row',
      justifyContent:'flex-start',
    }
  },
  events: {
    overflow:'scroll',
  }
};

const numbToMonth = (numb) => {
  let month = new Array();
  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "Mar";
  month[3] = "Apr";
  month[4] = "May";
  month[5] = "Jun";
  month[6] = "Jul";
  month[7] = "Aug";
  month[8] = "Sepr";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";
  let n = month[numb];
  return n;
}

class CalendarComponent extends Component {
  state = {
    date: new Date(),
    month: numbToMonth((new Date().getMonth())),
  }

  componentDidMount() {
    this.props.onCalendarComponentDidMount(localStorage.getItem('sessionId'))
  }

  onChange = date => {
    this.setState({ date })
    console.log('state was changed ' + this.state.date)
  }

  onMonthChange = month => {
    this.setState({ date: month.activeStartDate, month: month.activeStartDate.toString().split(' ')[1] })
  }

  renderEvents = obj => {
    if(new Date(obj.date).toString().split(' ')[1] === this.state.month) {
      return <li className={this.props.classes.list}>
        <div>{obj.date.split('-').join(' ')}</div>
        <div>{obj.description}</div>
      </li>
    }
  }

  render() {
    const { classes, events } = this.props;
    return (
      <div className={classes.calendarContainer}>
        <Calendar
          style={calendarStyle}
          onChange={this.onChange}
          onMonthClick={(value) => console.log('hi')}
          onActiveDateChange={this.onMonthChange}
          onClickDay={(value) => this.setState({date: value})}
          value={this.state.date}
        />
        <div className={classes.events}>
          <ul>
            {events.map(this.renderEvents)}
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    sessionId: state.sessionInfo.sessionId,
    events: state.events,
  }),
  dispatch => ({
    onCalendarComponentDidMount: (sessionId) => {
      dispatch(eventsAction(sessionId));
    },
  })
)(injectSheet(styles)(CalendarComponent));
