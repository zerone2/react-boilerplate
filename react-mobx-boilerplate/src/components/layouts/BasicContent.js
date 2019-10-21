import React from 'react'
import { observer } from 'mobx-react'
import { Layout } from 'antd'
import styled from 'styled-components'
const { Content } = Layout

const StyledContent = styled(Content)`
  min-height: 700px;
  padding-bottom: 100px;
  & > div.content {
    width: ${props => props.width}px;
    max-width: ${props => props.center && (props.width || '800px')};
    margin: ${props => props.center && '0 auto'};
  }
`

const StyledTitle = styled.div`
  background: white;
  min-width: 1045px;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 45px;
  border-bottom: 1px solid #dbdbdb;
  
  & > div {
    width: 950px;
    margin: 30px auto 0;
    font-size: 30px;
    color: #44484b;
    font-weight: bold;
    letter-spacing: 1px;
  }
`

@observer
export default class BasicContent extends React.Component {
  render() {
    const { title, width, center = '', children } = this.props
    return (
      <StyledContent center={center.toString()} width={width} style={{ padding: '50px 30px' }}>
        {
          title &&
          <StyledTitle>
            <div>{title}</div>
          </StyledTitle>
        }
        <div className="content">
          {children}
        </div>
      </StyledContent>
    )
  }
}
