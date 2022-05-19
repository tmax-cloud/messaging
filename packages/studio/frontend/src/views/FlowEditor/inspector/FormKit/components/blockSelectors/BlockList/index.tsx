import React, { FC } from 'react'
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd'

import { Label, AddBtn, FormKitOnAction } from '../../../shared'
import * as layout from '../../../shared/layout.module.scss'
import Block, { BLOCK_HEIGHT_PX } from '../Block'

import * as style from './style.module.scss'

export enum BlockListActions {
  UPDATE = 'update',
  CREATE = 'create',
  DISABLE = 'disable'
}

enum BlockTypes {
  BLOCK = 'block'
}

export interface OwnProps {
  id: string
  value: any[]
  label: string
  hint?: string
  disableable?: boolean
  disableText?: string
  onAction?: FormKitOnAction<BlockListActions>
}

const getRenderItem = (blocks: any) => (provided: any, snapshot: any, rubric: any) => {
  return (
    <div
      // style={{ height: `${BLOCK_HEIGHT_PX}px` }}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
    >
      <Block block={blocks[rubric.source.index]} onDoubleClick={console.log} grab />
    </div>
  )
}

const BlockList: FC<OwnProps> = ({ id, label, hint, value, disableable, disableText, onAction = () => {} }) => {
  const renderItem = getRenderItem(value)

  return (
    <DragDropContext>
      <div className={layout.formKitContainer}>
        <div className={layout.labelSection}>
          <Label className={layout.center} label={label} hint={hint} />
          <AddBtn className={layout.rightBtn} />
        </div>
        <Droppable droppableId={id} renderClone={renderItem}>
          {(provided: any, snapshot: any) => (
            <div
              className={style.container}
              style={{ minHeight: `${BLOCK_HEIGHT_PX * value.length}px` }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {value.map((block, idx) => (
                <Draggable draggableId={block} index={idx} key={block}>
                  {renderItem}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  )
}

export default BlockList
