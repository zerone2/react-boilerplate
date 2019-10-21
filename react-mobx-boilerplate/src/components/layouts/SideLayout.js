import React from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Layout } from 'antd'
import { Helmet } from 'react-helmet'
import BasicContent from './BasicContent'
import BasicFooter from './BasicFooter'
import SideBar from './SideBar'
import PayAlert from '../screening/PayAlert'
import Agree from '../screening/Agree'
import Protected from '../Protected'

@Protected()
@inject('userStore', 'appStore')
@observer
export default class SideLayout extends React.Component {
  @observable isLoaded
  constructor(props) {
    super(props)

    this.userStore = props.userStore
    this.appStore = props.appStore
    this.appStore.getInfo()
      .then(() => {
        this.isLoaded = true
      })
  }
  render() {
    const { title, children, className, width, location, style = {} } = this.props
    const { currentUser } = this.userStore

    return (
      <Layout className={className} style={{ minHeight: '100vh', background: '#f0f2f5', ...style }}>
        <Helmet>
          <title>ZIPDATA 담보심사 사이트</title>
        </Helmet>
        <SideBar currentUser={currentUser} appStore={this.appStore} location={location} />
        <Layout>
          <BasicContent title={title} width={width}>
            {this.isLoaded && children}
          </BasicContent>
          <BasicFooter />
        </Layout>
      </Layout>
    )
  }
}
