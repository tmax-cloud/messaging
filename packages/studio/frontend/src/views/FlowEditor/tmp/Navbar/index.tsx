import { Icon } from '@blueprintjs/core'
import React, { FC, useState } from 'react'
import logo from '~/src/img/logo-icon.svg'

import * as style from './style.module.scss'

interface OwnProps {}

const NavEl = ({ icon }) => {
  const [isHover, setIsHover] = useState(false)

  const handleHover = () => {
    setIsHover(!isHover)
  }

  return (
    <div className={style.navEl}>
      <Icon icon={icon} onMouseOver={() => handleHover()} color="" />
    </div>
  )
}

const Navbar: FC<OwnProps> = ({}) => {
  return (
    <div className={style.container}>
      <a href="admin/" className={style.logo} id="bp-menu_admin">
        <img width="19" src={logo} alt="Botpress Logo" />
      </a>
      <NavEl icon="page-layout" key={1} />
      <NavEl icon="document" key={2} />
      <NavEl icon="translate" key={3} />
      <NavEl icon="book" key={4} />
      <NavEl icon="code" key={5} />
      <NavEl icon="cog" key={6} />
    </div>
  )
}

export default Navbar
