import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Button, Layout } from 'antd'
const { Footer } = Layout
import ZipDataLogo from 'assets/images/footer-zipdata-logo-btn-normal.png'
import StyledModal from '../fragments/StyledModal'
import Term from 'components/Term'
import modalStyles from '../screening/payAlert.less'
import styles from './basicFooter.less'

@observer
export default class BasicFooter extends React.Component {
  @observable agreeVisible
  @observable personalVisible

  constructor(props) {
    super(props)

    this.agreeVisible = false
    this.personalVisible = false
  }

  render() {
    return (
      <Footer className={styles.footer} id={'footer'}>
        <div style={{ textAlign: 'left' }}>
          <img src={ZipDataLogo} style={{ marginTop: -5, marginRight: 15 }} />
          <a key="intro" href={'http://home-test.zer01ne.dev/about'} target={'_blank'} className={styles.link}>
            회사소개
          </a>
          <span className={styles.divider} />
          <span className={styles.link} onClick={() => this.personalVisible = true}>개인정보 처리방침</span>
          <span className={styles.divider} />
          <span className={styles.link} onClick={() => this.agreeVisible = true}>이용약관</span>
          <span className={styles.divider} />
          <span className={styles.link} onClick={() => window.CHPlugin.show()}>고객센터</span>
        </div>
        <div className={styles.info}>
          주식회사 지로원  ㅣ  대표: 조영일  ㅣ  사업자등록번호: 000-00-00000  ㅣ  서울특별시 강남구 역삼동  ㅣ  이메일: czer01ne@gmail.com  ㅣ  대표전화: 010-8766-1529  ㅣ  팩스: 02-0000-0000
        </div>
        <div className={styles.info} style={{ textAlign: 'right', fontSize: 12, letterSpacing: '-0.24px' }}>
          ⓒ ZER01NE. ALL RIGHTS RESERVED.
        </div>
        <Popup title={'개인정보 보호정책'} visible={this.personalVisible} onCancel={() => this.personalVisible = false} />
        <Popup title={'이용약관'} visible={this.agreeVisible} onCancel={() => this.agreeVisible = false} />
      </Footer>
    )
  }
}

const Popup = ({title, visible, onCancel}) => {
  return (
    <StyledModal visible={visible} className={modalStyles.payAlert} onCancel={onCancel}>
      <div className={modalStyles.managerInfo}>
        <div className={modalStyles.body}>
          <h3>{title}</h3>
          <Term />
        </div>
        <Button block onClick={onCancel}>
          닫기
        </Button>
      </div>
    </StyledModal>
  )
}
