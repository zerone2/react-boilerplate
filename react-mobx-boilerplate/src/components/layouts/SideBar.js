import React, { Fragment } from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { Layout, Icon, Button, Row, Col, Menu } from 'antd'
import { logout } from 'utils/apis'
import AppLink from '../fragments/AppLink'
import LogoImage from 'assets/images/menu-big-zipdata-logo-btn-select.png'
import LogoSmallImage from 'assets/images/menu-small-zipdata-logo-btn-normal.png'
import FoldImage from 'assets/images/menu-big-menu-btn-select.png'
import DotImg from 'assets/images/menu-big-icon-dot-normal.png'
import PencilImg from 'assets/images/menu-big-icon-3-normal.png'
import PlusImg from 'assets/images/menu-big-icon-more-normal.png'
import Icon1 from 'assets/images/menu-big-icon-1-normal.png'
import Icon2 from 'assets/images/menu-big-icon-2-normal.png'
import Icon3 from 'assets/images/menu-big-icon-4-normal.png'
import Icon4 from 'assets/images/menu-big-icon-5-normal.png'
import Icon5 from 'assets/images/menu-big-icon-6-normal.png'
import Icon6 from 'assets/images/menu-big-icon-7-normal.png'
import Icon7 from 'assets/images/menu-big-icon-8-normal.png'
import Icon8 from 'assets/images/menu-big-icon-9-select.png'
import styles from './sideBar.less'
const { Sider } = Layout
const { SubMenu } = Menu

@inject('userStore')
@observer
export default class SideBar extends React.Component {
  @observable size
  @observable activeKey
  constructor(props) {
    super(props)

    this.userStore = props.userStore
    this.size = 5
    this.getSelectedKey()
  }
  componentDidUpdate() {
    this.getSelectedKey()
  }
  render() {
    let { appStore: { user_type, pay_info = {}, report_history = [], collapsedWidth, width, collapsed, toggleCollapsed, historyCollapsed, toggleHistoryCollapsed } } = this.props
    const { possible_apart = 0, possible_regist = 0, apart_limit = 0, regist_limit = 0 } = pay_info
    return (
      <Sider width={width}
             className={cx(styles.sideBar, { [styles.foldSidebar]: collapsed })}
             collapsedWidth={collapsedWidth}
             collapsed={collapsed}
      >
        {
          collapsed ?
            <div className={styles.header}>
              <AppLink isApp={false} to={'/'}><img src={LogoSmallImage} /></AppLink>
              <div className={styles.fold} onClick={toggleCollapsed}>
                <Icon type={'right'} style={{ color: '#55626e', fontSize: 12 }} /><img src={FoldImage} />
              </div>
            </div> :
            <div className={styles.header}>
              <AppLink isApp={false} to={'/'}><img src={LogoImage} /></AppLink>
              <span className={styles.fold} onClick={toggleCollapsed}>
                <Icon type={'left'} style={{ color: '#55626e', fontSize: 12 }} /><img src={FoldImage} />
              </span>
            </div>
        }
        {
          collapsed ?
            <Fragment>
              <div className={'ant-menu-item'}>
                <div className={cx(styles.collapseMenuItem, styles.reportButton)}>
                  <div><Link to={'/screening/screeningSearch'}>담보심사</Link></div>
                </div>
              </div>
              <div className={'ant-menu-item'}>
                <div className={styles.collapseMenuItem}>
                  <div className={styles.number}>{possible_apart}</div>
                  <div className={styles.type}>기본</div>
                </div>
              </div>
              <div className={'ant-menu-item'}>
                <div className={styles.collapseMenuItem}>
                  <div className={styles.number}>{possible_regist}</div>
                  <div className={styles.type}>등기부</div>
                </div>
              </div>
            </Fragment>
             :
            <Fragment>
              <div className={styles.evaluateBtn}>
                <Button type={'danger'}>
                  <Link to={'/screening/screeningSearch'}>담보 심사하기</Link>
                </Button>
              </div>
              <Row className={styles.limit}>
                <Col xs={12}>
                  <div className={styles.number}>{possible_apart}</div>
                  <div className={styles.type}>기본</div>
                  <div className={styles.total}>(총 {apart_limit || 0}회)</div>
                </Col>
                <span className={styles.divider} />
                <Col xs={12}>
                  <div className={styles.number}>{possible_regist}</div>
                  <div className={styles.type}>등기부등본</div>
                  <div className={styles.total}>(총 {regist_limit || 0}회)</div>
                </Col>
              </Row>
            </Fragment>
        }
        <Menu
          selectedKeys={[this.activeKey]}
          openKeys={historyCollapsed ? ['my_history'] : []}
          mode="inline"
          theme="dark"
          className={cx({[styles.noHistory]: report_history.length === 0})}
        >
          <Menu.Item key='/screening/screeningList'>
            <Link to={'/screening/screeningList'}>
              {
                collapsed ?
                  <div className={styles.collapseMenuItem}>
                    <div>심사관리</div>
                  </div> :
                  <Fragment>
                    <img src={Icon1} />
                    <span>내 담보 심사 관리</span>
                  </Fragment>
              }
            </Link>
          </Menu.Item>
          {
            !collapsed &&
            <SubMenu key="my_history"
                     onTitleClick={toggleHistoryCollapsed}
                     title={
                       <span>
                         <img src={Icon2} />
                         <span>내 조회 히스토리</span>
                       </span>
                     }
            >
              {
                report_history.slice(0, this.size).map(history => (
                  <li key={history.code} className={cx(styles.history ,{[styles.active]: history.code === this.activeKey})}>
                    <Link to={{ pathname: '/screening/screeningSearch', state: { report_code: history.code }}}>
                      {
                        history.name ?
                          <span className={styles.name}>
                          <img src={DotImg} /><span>{history.name}</span>
                        </span> :
                          <span className={styles.noName}>
                          <img src={PencilImg} /><span>심사명을 입력해주세요.</span>
                        </span>
                      }
                    </Link>
                  </li>
                ))
              }
              {
                (this.size === 5 && report_history.length > 5) &&
                <li className={styles.history} style={{ cursor: 'pointer' }} onClick={this.moreHistory}>
                <span className={styles.noName}>
                  <img src={PlusImg} /><span>더보기</span>
                </span>
                </li>
              }
            </SubMenu>
          }
          {
            (user_type === 'M' || user_type === 'N') &&
            <Menu.Item key='/accounts/license/payment'>
              <Link to={'/accounts/license/payment'}>
                {
                  collapsed ?
                    <div className={styles.collapseMenuItem}>
                      <div>결제내역</div>
                    </div> :
                    <Fragment>
                      <img src={Icon3} />
                      <span>라이선스 결제 내역</span>
                    </Fragment>
                }
              </Link>
            </Menu.Item>
          }
          {
            user_type === 'M' &&
            <Menu.Item key='/accounts/company/manageAccount'>
              <Link to={'/accounts/company/manageAccount'}>
                {
                  collapsed ?
                    <div className={styles.collapseMenuItem}>
                      <div>기업정보</div>
                    </div> :
                    <Fragment>
                      <img src={Icon4} />
                      <span>기업 정보 수정</span>
                    </Fragment>
                }
              </Link>
            </Menu.Item>
          }
          {
            user_type === 'M' &&
            <Menu.Item key='/accounts/branch/branchList'>
              <Link to={'/accounts/branch/branchList'}>
                {
                  collapsed ?
                    <div className={styles.collapseMenuItem}>
                      <div>지사정보</div>
                    </div> :
                    <Fragment>
                      <img src={Icon5} />
                      <span>지사 정보 관리</span>
                    </Fragment>
                }
              </Link>
            </Menu.Item>
          }
          {
            user_type === 'M' &&
            <Menu.Item key='/accounts/company/screeningAccountList'>
              <Link to={'/accounts/company/screeningAccountList'}>
                {
                  collapsed ?
                    <div className={styles.collapseMenuItem}>
                      <div>계정관리</div>
                    </div> :
                    <Fragment>
                      <img src={Icon6} />
                      <span>심사 계정 관리</span>
                    </Fragment>
                }
              </Link>
            </Menu.Item>
          }
          {
            user_type === 'M' &&
            <Menu.Item key='/screening/summary'>
              <Link to={'/screening/summary'}>
                {
                  collapsed ?
                    <div className={styles.collapseMenuItem}>
                      <div>계정통계</div>
                    </div> :
                    <Fragment>
                      <img src={Icon7} />
                      <span>심사 계정 활동 통계</span>
                    </Fragment>
                }
              </Link>
            </Menu.Item>
          }
          <Menu.Item key='/accounts/memberInfo'>
            <Link to={'/accounts/memberInfo'}>
              {
                collapsed ?
                  <div className={styles.collapseMenuItem}>
                    <div>정보수정</div>
                  </div> :
                  <Fragment>
                    <img src={Icon8} />
                    <span>내 정보 수정</span>
                  </Fragment>
              }
            </Link>
          </Menu.Item>
          {
            collapsed &&
              <Fragment>
                <li key="center" className={'ant-menu-item'} onClick={() => window.CHPlugin.show()}>
                  <div className={styles.collapseMenuItem}>
                    <div>고객센터</div>
                  </div>
                </li>
                <li key="logout" className={'ant-menu-item'}>
                  <div className={styles.collapseMenuItem}>
                    <div onClick={this.handleClickLogout}>로그아웃</div>
                  </div>
                </li>
              </Fragment>
          }
        </Menu>
        {
          !collapsed &&
          <div className={styles.btns}>
            <div onClick={() => window.CHPlugin.show()}>고객센터</div>
            <div onClick={this.handleClickLogout}>로그아웃</div>
          </div>
        }
      </Sider>
    )
  }

  moreHistory = () => {
    this.size = 10
  }

  handleClickLogout = e => {
    if(confirm('로그아웃하시겠습니까?')) {
      logout()
        .then(() => {
          this.props.userStore.logout()
        })
    }
  }

  getSelectedKey = () => {
    const { location: { pathname, state = {} } } = this.props
    this.activeKey = state.report_code || pathname
  }
}
