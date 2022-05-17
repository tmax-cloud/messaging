import React from 'react'
import Tags, { TagGroups } from '~/src/components/Tags'

import style from './style.module.scss'

const NodeBlock = (type) => {
  console.log(type)
  function GetBlockClass() {
    let group = null
    for (const [key, value] of Object.entries(TagGroups)) {
      value.find((o, i) => {
        if (o.type === type.type.type) {
          group = key
        }
      })
    }

    return group ? `block-${group}` : 'block'
  }

  return (
    <div className={style[GetBlockClass()]}>
      <Tags icon={type.type.type} />
      <span>{type.type.action}</span>
    </div>
  )
}

export default NodeBlock
