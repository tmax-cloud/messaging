import React, { FC } from 'react'

import * as style from './style.module.scss'

interface OwnProps {}

const Toolbar: FC<OwnProps> = ({}) => {
  return (
    <div className={style.container}>
      <div className={style.section}>
        <span className={style.version}>0.0.0</span>
        <span className={style.name}>Name</span>
      </div>
      <div className={style.section}>
        <button className={style.train}>Deploy to Cloud</button>
        <button className={style.train}>Train Chatbot</button>
        <button className={style.train}>Emulator</button>
      </div>
    </div>
  )
}

export default Toolbar
