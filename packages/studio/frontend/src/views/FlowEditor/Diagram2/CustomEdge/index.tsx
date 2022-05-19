import React, { useState, useCallback, FC } from 'react'
import { getBezierPath, getEdgeCenter, EdgeProps } from 'react-flow-renderer'

import * as style from './style.module.scss'

const foreignObjectSize = 40

const onEdgeClick = (evt, id) => {
  evt.stopPropagation()
  alert(`remove ${id}`)
}

const CustomEdge: FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  selected,
  markerEnd
}) => {
  const [isHover, setIsHover] = useState(false)

  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  })
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY
  })

  const handleOnHover = useCallback((hover: boolean) => setIsHover(hover), [setIsHover])

  return (
    <>
      <path
        id={id}
        style={style}
        // className={cx(style.edgePath, { [style.selected]: selected })}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        onMouseOver={() => handleOnHover(true)}
        onMouseOut={() => handleOnHover(false)}
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={edgeCenterX - foreignObjectSize / 2}
        y={edgeCenterY - foreignObjectSize / 2}
        className={style.edgebuttonForeignobject}
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div>
          <button className={style.edgebutton} onClick={(event) => onEdgeClick(event, id)}>
            ×
          </button>
        </div>
      </foreignObject>
    </>
  )
}

export default {
  bp_edge: CustomEdge
}
