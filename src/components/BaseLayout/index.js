import React from 'react'

import { Header } from '../common/Header'
import './index.scss'

const BaseLayout = (props) => (
  <div className='base-wrapper'>
    <Header />
    <div className='content'>
      {props.children}
    </div>
    <footer>Powered by GameSpot</footer>
  </div>
)

export default BaseLayout