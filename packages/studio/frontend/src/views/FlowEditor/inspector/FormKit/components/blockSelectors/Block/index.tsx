import cx from 'classnames'
import React, { useCallback, forwardRef, FC } from 'react'

import Tags from '~/src/components/Tags'
import useInspectorStore from '../../../../store'
import { Text, TextIntents } from '../../../shared'
import * as style from './style.module.scss'

// export enum BlockTypes {
//   CONTENT = 'content',
//   CODE = 'code'
// }

export interface OwnProps {
  block: any
  grab?: boolean
  temp?: boolean
  dragging?: boolean
  options?: boolean
  className?: string
  onDoubleClick?: () => void
  ref?: React.ForwardedRef<any>
}

const Block: FC<OwnProps> = forwardRef(
  ({ block, grab, temp, options, className, dragging, onDoubleClick = () => {} }, ref) => {
    const openTabId = useInspectorStore((state) => state.openTabId)

    const handleClicks = useCallback(
      (e) => {
        if (e.detail === 2) {
          onDoubleClick()
        }
      },
      [onDoubleClick]
    )

    return (
      <div ref={ref as any} className={cx(style.container, className)} onClick={() => openTabId(block)}>
        {/* {grab && <Grabber className={cx({ [style.hidden]: dragging })} />} */}
        <div
          className={cx(style.block, { [style.temp]: temp, [style.grab]: grab, [style.dragging]: dragging })}
          onClick={handleClicks}
        >
          <Tags icon="text" />
          {/* <Text className={style.type} value={block.type} large /> */}
          <Text className={style.name} intent={TextIntents.LITE} value={block} large />
          {/* <Text className={style.id} intent={TextIntent.LITE_PLACEHOLDER} value={} /> */}
        </div>
      </div>
    )
  }
)

export default Block
