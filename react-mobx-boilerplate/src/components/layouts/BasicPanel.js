import React from 'react'
import { observer } from 'mobx-react'
import styles from './basicPanel.less'

@observer
export default class BasicPanel extends React.Component {
  render() {
    const { title, subTitle = '', bodyStyle = {}, children } = this.props
    return (
      <div className={styles.basicPanel}>
        <h3>{title}</h3>
        <div className={styles.subTitle}>{subTitle}</div>
        <div className={styles.body} style={bodyStyle}>
          {children}
        </div>
      </div>
    )
  }
}
