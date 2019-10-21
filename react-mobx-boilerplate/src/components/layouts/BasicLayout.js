import React from 'react'
import { observer } from 'mobx-react'
import { Layout } from 'antd'
import BasicHeader from './BasicHeader'
import BasicContent from './BasicContent'
import BasicFooter from './BasicFooter'

@observer
export default class BasicLayout extends React.Component {
  render() {
    const { title, center, children, className, width, match, history, isContent = true, style = {} } = this.props
    return (
      <Layout className={className} style={{ minHeight: '100vh', background: '#eef1f5', ...style }}>
        <BasicHeader match={match} history={history} />
        {
          isContent ?
          <BasicContent title={title} center={center} width={width}>
            {children}
          </BasicContent> :
            children
        }
        <BasicFooter />
      </Layout>
    )
  }
}
