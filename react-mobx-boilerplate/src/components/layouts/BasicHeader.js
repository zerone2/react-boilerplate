import React from 'react'
import { inject, observer } from 'mobx-react'
import { Layout } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import HeaderRight from 'components/header/HeaderRight'
import NavTabs from 'components/header/NavTabs'
import ZipDataLogo from 'assets/images/header-zipdata-logo-btn-normal.png'

const { Header } = Layout
const StyledHeader = styled(Header)`
  background: #fff;
  border-bottom: 1px solid #dbdbdb;
  height: 70px;
  line-height: 70px;
  & > div {
    height: 100%;
    margin: 0 auto;
    font-size: 14px;
    width: 1045px;
    @media (max-width: 1199px) {
      max-width: 760px;
    }
    .header__left {
      float: left;
      a {
        margin-right: 35px;
      }
    }
    .header__right {
      float: right;
    }
    .header__center {
      float: left;
      padding-left: 40px;
      color: #666;
      font-size: 16px;
      cursor: pointer;
      font-weight: bold;
      &.center__last {
      padding-left: 30px;
      }
      
      &.active {
        color: #ff6000;
      }
    }
  }
  & + * {
    margin-top: 70px;
  }
`

@withRouter
@inject('userStore')
@observer
export default class BasicHeader extends React.Component {
  constructor(props) {
    super(props)

    this.userStore = this.props.userStore
  }

  render() {
    const { isAuthenticated, currentUser } = this.userStore

    return (
      <StyledHeader style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 2 }}>
        <div style={{ position: 'relative' }}>
          <div className="header__left">
            <Link to={'/'}>
              <img src={ZipDataLogo} />
            </Link>
          </div>
          <NavTabs />
          <HeaderRight isAuthenticated={isAuthenticated}
                       logout={this.userStore.logout}
                       currentUser={currentUser}
                       history={this.props.history} />
        </div>
      </StyledHeader>
    )
  }
}
