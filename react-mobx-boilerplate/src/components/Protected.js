import React from 'react'
import { inject, observer } from 'mobx-react'

@observer
export default (options = {}) => {
  const { user_types } = options
  return Component => (
    @inject('userStore')
    class extends React.Component {
      constructor(props) {
        super(props)
        const { userStore, location, history } = props
        if(!userStore.isAuthenticated) {
          const { state = {}, pathname } = location
          history.replace('/login', { nextPath: pathname, ...state })
        }

        if(user_types && !user_types.find(type => type === userStore.currentUser.user_type)) {
          alert('해당 주소에 대한 접근 권한이 없습니다.')
          history.goBack()
        }
      }
      render() {
        return (
          <Component {...this.props} />
        )
      }
    }
  )
}
