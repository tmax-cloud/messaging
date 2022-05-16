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
  
  const getType = (action) => {
    if (action.includes('say #!builtin_text')) return style['block-simple']
    else if (action.includes('say #!builtin_carousel')) return style['block-complex']
    return style.block
  }

  return (
    <div className={cx(style.nodeContainer, { selected, dragging })}>
      <div className={style.head}>
        <div className={style.port}>
          <div>
            <h2>{name}</h2>
            <Handle type="target" position={Position.Left} />
          </div>
        </div>
      </div>
      
      <div className={style.content}>
        {onEnter && (
          <>
            <h4>On Enter</h4>
            <div className={style.blocks}>
              {onEnter.map((action) => (
                <div className={getType(action)}>{metaFromAction(action).action}</div>
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
      </div>
      <div className={style.footer}>
        <h4>Transitions</h4>
        <div className={style.transitions}>
          {next.map(({ condition, caption, node }) => (
            <div className={style.transition}>
              {caption || condition}
              <Handle type="source" position={Position.Right} />
            </div>
          ))}
        </div>
      </div>
      {/* <Handle type="target" position={Position.Right} /> */}
    </div>
  )
}

export default StandardNode
