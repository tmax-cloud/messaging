import { NodeTransition } from '@botpress/sdk'
import cx from 'classnames'
import React, { FC } from 'react'
import { Handle, Position, WrapNodeProps } from 'react-flow-renderer'

import { metaFromAction } from '../../utils/convertBotData'
import * as style from './style.module.scss'

interface StandardNodeData {
  name: string
  onEnter: string[]
  onReceive: null | string[]
  next: NodeTransition[]
}

export type OwnProps = WrapNodeProps<StandardNodeData>

const StandardNode: FC<OwnProps> = ({ selected, dragging, data: { name, onEnter, onReceive, next } }) => {
  return (
    <div className={cx(style.nodeContainer, { selected, dragging })}>
      <Handle type="target" position={Position.Left} />
      <h2>{name}</h2>
      {onEnter && (
        <>
          <h4>On Enter</h4>
          <div className={style.blocks}>
            {onEnter.map((action) => (
              <div className={style.block}>{metaFromAction(action).action}</div>
            ))}
          </div>
        </>
      )}
      {onReceive && (
        <>
          <h4>On Receive</h4>
          <div className={style.blocks}>
            {onReceive.map((action) => (
              <div className={style.block}>{metaFromAction(action).action}</div>
            ))}
          </div>
        </>
      )}
      <h4>Transitions</h4>
      <div className={style.transitions}>
        {next.map(({ condition, caption, node }) => (
          <div className={style.transition}>
            {caption || condition}
            <Handle type="source" position={Position.Right} />
          </div>
        ))}
      </div>
      {/* <Handle type="target" position={Position.Right} /> */}
    </div>
  )
}

export default StandardNode
