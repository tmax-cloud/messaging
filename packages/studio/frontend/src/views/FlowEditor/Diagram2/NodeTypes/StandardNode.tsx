import { NodeTransition } from '@botpress/sdk'
import React, { FC } from 'react'
import { Handle, Position, WrapNodeProps } from 'react-flow-renderer'

import * as style from './style.module.scss'

interface StandardNodeData {
  name: string
  onEnter: string[]
  onReceive: null | string[]
  next: NodeTransition
}

export type OwnProps = WrapNodeProps<StandardNodeData>

const StandardNode: FC<OwnProps> = ({ selected, dragging, data: { name, onEnter, onReceive, next } }) => {
  return (
    <div className={style.nodeContainer}>
      <Handle type="target" position={Position.Left} />
      <h2>node_name</h2>
      <h4>On Enter</h4>
      <div className={style.blocks}>
        <div className={style.block}>asd</div>
        <div className={style.block}>asd</div>
        <div className={style.block}>asd</div>
      </div>
      <h4>On Receive</h4>
      <div className={style.blocks}>
        <div className={style.block}>fasdf</div>
        <div className={style.block}>asd</div>
        <div className={style.block}>asd</div>
      </div>
      <h4>Transitions</h4>
      <div className={style.transitions}>
        <div className={style.transition}>
          hello its something
          <Handle type="source" position={Position.Right} />
        </div>
      </div>
      {/* <Handle type="target" position={Position.Right} /> */}
    </div>
  )
}

export default StandardNode
