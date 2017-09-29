import React from 'react'
import { Link } from 'react-router-dom'
import EventIndexItem from './event_index_item'
import moment from 'moment'
import Calendar from 'react-calendar'
import 'react-calendar/build/Calendar.less'

class EventsIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: true, events: [], selectedDate: new Date }
    this.filterDates = this.filterDates.bind(this)
    this.handleCalendar = this.handleCalendar.bind(this)
    this.setCalendarEvents = this.setCalendarEvents.bind(this)
  }

  componentDidMount(){
    this.props.fetchUserProjects(this.props.projectId).
      then(res => this.props.fetchProjectEvents(this.props.projectId)).
      then(res => {
        this.filterDates()
        this.setCalendarEvents()
      })
  }

  componentWillReceiveProps(newProps){
    if(Object.keys(this.props.events).length > 0){
      this.filterDates()
    }
    setTimeout( () => this.setState({loading: false}), 500)
  }

  filterDates(date){
    console.log('filtering');
    if(!date){
      date = this.state.selectedDate
    }
    let events = Object.values(this.props.events).sort((a,b)=>{
      return moment.utc(a.startDate).diff(moment.utc(b.startDate))
    })
    events = events.filter(event => {
      return moment.utc(event.startDate).diff(moment.utc(date)) >= 0 ||
        moment.utc(event.endDate).diff(moment.utc(date)) >= 0
    })

    this.setState({ events, selectedDate: date })
  }

  handleCalendar(date){
    console.log(date);
    this.filterDates(date)
  }

  setCalendarEvents({ date, view }){
    //Date range logic source:
    //https://stackoverflow.com/questions/28010754/using-moment-js-to-make-an-array-of-this-weeks-dates-doesnt-add-to-array
    return Object.values(this.props.events).map(event => {
      const start = moment(event.startDate)
      const end = moment(event.endDate)
      let days = []
      let day = start
      while(day <= end){
        if(!days.includes(day)){
          days.push(day)
          day = day.clone().add(1, 'd')
        }
      }
      const d = date
      return days.map(day =>{
        const dayDate = day.toDate()
        return (view === 'month' && dayDate.getDate() === d.getDate()
        && dayDate.getMonth() === d.getMonth()
        && dayDate.getYear() === d.getYear() ? <div className='event-block'></div> : null)

      })
    })
  }

  render(){
    if( Object.keys(this.props.events).length > 0 && !this.state.loading ){
      return (
        <div className='tool-page'>
          <header>
            <Link to={`/${this.props.currentUser.id}/projects/${this.props.project.id}`}>
              <span>{this.props.project.name}</span>
            </Link>
            > Schedule
          </header>
          <div className='main-tool'>
            <h1>Schedule</h1>
            <div className='calendar'>
              <Calendar
                value={this.state.selectedDate}
                onChange={this.handleCalendar}
                renderChildren={this.setCalendarEvents}/>
            </div>
            <Link to={`/${this.props.currentUser.id}/projects/${this.props.project.id}/events/new`}
              className='btn event btn-submit'>
              Add an event
            </Link>
            <ul className='event-list'>
              {
                this.state.events.map(event =>
                  <EventIndexItem
                    event={event}
                    key={event.id}
                    currentUser={this.props.currentUser}
                    project={this.props.project} />)
              }
            </ul>
          </div>
        </div>
      )
    } else {
      return (
        <div>Loading....</div>
      )
    }
  }
}

export default EventsIndex
