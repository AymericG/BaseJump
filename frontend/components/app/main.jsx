import React from 'react'
import NavBarContainer from './nav_bar_container'
import PageContentContainer from './page_content_container'
import ProjectShowContainer from './project/project_show_container'
import { Switch, Route, Redirect } from 'react-router-dom'
import TodoListIndexContainer from './todolist/todolist_index_container'
import TodoListShowContainer from './todolist/todolist_show_container'
import MessageBoardContainer from './message_board/message_board_container'
import MessageFormContainer from './message_board/message_form_container'
import MessageShowContainer from './message_board/message_show_container'
import EventsIndexContainer from './schedule/events_index_container'
import EventFormContainer from './schedule/event_form_container'
import EventShowContainer from './schedule/event_show_container'
import Loading from './loader'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: false }
  }

  componentDidMount(){
    // this.setState({loading: true})
    // setTimeout(() => this.setState({loading: false}), 750)
  }

  componentWillReceiveProps(){
  }

  render(){
    if(this.state.loading){
      return ( <Loading />)
    } else {
      return (
        <div className='main-app'>
          <NavBarContainer />
          <Switch>
            <Route exact path='/:userId/projects/:projectId/events/new' component={EventFormContainer}/>
            <Route exact path='/:userId/projects/:projectId/events/:eventId/edit' component={EventFormContainer}/>
            <Route exact path='/:userId/projects/:projectId/events/:eventId' component={EventShowContainer}/>
            <Route exact path='/:userId/projects/:projectId/events' component={EventsIndexContainer}/>
            <Route exact path='/:userId/projects/:projectId/todolists/:listId' component={TodoListShowContainer}/>
            <Route exact path='/:userId/projects/:projectId/messages/new' component={MessageFormContainer}/>
            <Route exact path='/:userId/projects/:projectId/messages/:messageId/edit' component={MessageFormContainer}/>
            <Route exact path='/:userId/projects/:projectId/messages/:messageId' component={MessageShowContainer}/>
            <Route exact path='/:userId/projects/:projectId/messages' component={MessageBoardContainer}/>
            <Route exact path='/:userId/projects/:projectId/todolists' component={TodoListIndexContainer}/>
            <Redirect from='/:userId/projects/:projectId/:otherLink' to={`/${this.props.currentUserId}/projects`} />
            <Route exact path='/:userId/projects/:projectId' component={ProjectShowContainer}/>
            <Route exact path='/:userId/projects' component={PageContentContainer}/>
          </Switch>
        </div>
      )
    }
  }
}

export default App
