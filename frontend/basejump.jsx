import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store/store.js'
import { fetchCompany } from './actions/company_actions'
import Root from './components/root'
import { fetchUserProjects, fetchProject } from './util/project_api_util'
import { fetchProjectMessages } from './actions/message_actions'

document.addEventListener('DOMContentLoaded', () => {
  let preLoadedState = {}
  if(window.currentUser){
    preLoadedState = Object.assign({}, preLoadedState, { session: {currentUser: window.currentUser}})
  }
  const store = configureStore(preLoadedState)
  delete window.currentUser
  window.getState = store.getState
  window.dispatch = store.dispatch
  window.fetchProjectMessages = fetchProjectMessages
  const root = document.getElementById('root')
  ReactDOM.render(<Root store={store} />, root)
})
