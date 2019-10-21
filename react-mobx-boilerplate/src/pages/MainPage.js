import React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import TestPage from './TestPage'

@observer
export default class MainPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div>
          <p>MainPage</p>
          <Link to="/test">testpage</Link>
        </div>
      </div>
    );
  }
}
