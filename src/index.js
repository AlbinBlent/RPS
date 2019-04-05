import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom' //Why?
import './index.css'
import App from './client/containers//App'
import * as serviceWorker from './serviceWorker'

/*
ReactDOM.render(<App />, document.getElementById("root"));
*/

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
