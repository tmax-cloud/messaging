import React, { FC } from 'react'
import { lang } from '~/src/components/Shared/translations'

import * as style from './style.module.scss'

export type PanelPermissions = 'create' | 'rename' | 'delete'

const SidePanelContent: FC<any> = () => {
  return (
    <div className={style.container}>
      <div className={style.head}>
        <div className={style.nav}>
          <h2 className={style['navEl-selected']}>{lang.tr('flows')}</h2>
          <h2 className={style['navEl']}>{lang.tr('Skills')}</h2>
        </div>

        <input className={style.search} placeholder="Filter nodes.." />
      </div>
      <div className={style.insetSection}></div>
    </div>
  )
}

export default SidePanelContent
