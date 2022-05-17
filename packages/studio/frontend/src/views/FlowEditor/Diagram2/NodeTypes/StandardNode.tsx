import { Icon } from '@blueprintjs/core'
import { NodeTransition } from '@botpress/sdk'
import cx from 'classnames'
import React, { FC } from 'react'
import { Handle, Position, WrapNodeProps } from 'react-flow-renderer'

import { metaFromAction } from '../../utils/convertBotData'
import NodeBlock from './shared/NodeBlock'

import * as style from './smooth.module.scss'

interface StandardNodeData {
  name: string
  onEnter: string[]
  onReceive: null | string[]
  next: NodeTransition[]
}

export type OwnProps = WrapNodeProps<StandardNodeData>

const StandardNode: FC<OwnProps> = ({ selected, dragging, data: { name, onEnter, onReceive, next } }) => {
  return (
    <div className={cx(style.nodeContainer, selected ? style.selected : null, dragging ? style.dragging : null)}>
      <div className={style.head}>
        <div className={style.port}>
          <div>
            <h2>{name}</h2>
            <Handle type="target" position={Position.Left} />
          </div>
        </div>
        <Icon icon="help" color={style.tipColor} />
      </div>

      <div className={style.nodeBody}>
        {onEnter && (
          <>
            <h4>On Enter</h4>
            {/* <div className={style.content}> */}
            <div className={style.blocks}>
              {onEnter.map((action, i) => (
                <NodeBlock type={metaFromAction(action)} key={i} />
              ))}
            </div>
            {/* </div> */}
          </>
        )}
        {onReceive && (
          <>
            <h4>On Receive</h4>
            {/* <div className={style.content}> */}
            <div className={style.blocks}>
              {onReceive.map((action, i) => (
                <NodeBlock type={metaFromAction(action)} key={i} />
              ))}
            </div>
            {/* </div> */}
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
