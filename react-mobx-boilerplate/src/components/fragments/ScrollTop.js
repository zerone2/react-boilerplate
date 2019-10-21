import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

const ScrollToTop = ({ children, location: { pathname }, history: { action } }) => {
  if(action === 'PUSH') {
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [pathname])
  }

  return children || null
}

export default withRouter(ScrollToTop)
