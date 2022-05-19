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
    <div
      className={cx(
        style.nodeContainer,
        selected ? style.selected : null,
        dragging ? style.dragging : null,
        'flow-node-body'
      )}
    >
      <div className={style.head}>
        <div className={cx(style.port, 'nodrag')}>
          <Handle type="target" position={Position.Left} />
          <h2 className={selected ? style.selected : null}>{name}</h2>
        </div>
        <Icon icon="help" color={style.tipColor} />
      </div>

      <div className={style.nodeBody}>
        {onEnter && (
          <>
            <h4>On Enter</h4>
            {/* <div className={style.content}> */}
            <div className={cx(style.blocks, 'nodrag')}>
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
            <div className={cx(style.blocks, 'nodrag')}>
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
          {next.map(({ condition, caption, node }, idx) => (
            <div className={cx(style.transition, 'nodrag')} key={idx}>
              {condition} {caption} {node}
              <Handle id={`out${idx}`} type="source" position={Position.Right} />
            </div>
          ))}
        </div>
      </div>
      {/* <Handle type="target" position={Position.Right} /> */}
    </div>
  )
}

export default StandardNode
