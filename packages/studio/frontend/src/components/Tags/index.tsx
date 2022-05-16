import { Icon } from '@blueprintjs/core'
import cx from 'classnames'
import React, { FC } from 'react'
import * as style from './style.module.scss'


export interface OwnProps {
  icon: string
  text?: boolean
  type: string
}

const Tags: FC<OwnProps> = ({ icon, text, type }) => {
  return (
    <div className={type === 'simple' ? style['tag-simple'] : style.tag}>
      {icon === "Text" ? <Text /> : icon === "Code" ? <Code /> : null}
      { text ? <span>{icon}</span> : null}
    </div>
  )
}

const Text = () => (
  <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.9532 2H1.2052V3.456H3.7532V11.24H5.4052V3.456H7.9532V2Z" fill="#fff"/>
    <path d="M14.6112 8.902C14.3732 9.532 13.8832 9.924 13.2672 9.924C12.6512 9.924 12.3292 9.56 12.3292 8.888V5.836H15.2692V4.38H12.3292V2H10.9572L10.6772 4.38H8.94118V5.836H10.6772V9C10.6772 10.554 11.5872 11.408 13.1412 11.408C14.4852 11.408 15.4792 10.764 15.9552 9.644L14.6112 8.902Z" fill="#fff"/>
  </svg>
)

const Code = () => (
  <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_86_1823)">
      <path d="M10.9505 -0.797058L1.39293 7.59509C1.30364 7.67189 1.24261 7.77043 1.21772 7.87798C1.19283 7.98553 1.20522 8.09717 1.2533 8.19847C1.30137 8.29978 1.38292 8.38611 1.48742 8.44632C1.59192 8.50654 1.71458 8.53789 1.83956 8.53629H7.22127C7.33928 8.53348 7.4558 8.56004 7.55732 8.61294C7.65885 8.66585 7.74124 8.74294 7.79497 8.83524C7.8487 8.92755 7.87158 9.03131 7.86094 9.13455C7.8503 9.2378 7.80661 9.3363 7.73488 9.41864L2.79978 15.2029L13.9652 6.96766C14.0703 6.89544 14.1464 6.79558 14.1822 6.68268C14.2181 6.56977 14.2118 6.44976 14.1644 6.34019C14.117 6.23063 14.0309 6.13724 13.9187 6.07373C13.8065 6.01023 13.6741 5.97994 13.5409 5.98727L6.84165 6.22255C6.72653 6.22318 6.6133 6.19686 6.51362 6.14629C6.41394 6.09572 6.33142 6.02273 6.27455 5.93485C6.21768 5.84696 6.18852 5.74735 6.19007 5.64628C6.19162 5.5452 6.22383 5.44631 6.28338 5.3598L10.9505 -0.797058Z" fill="white"/>
    </g>
    <defs>
      <clipPath id="clip0_86_1823">
        <rect width="16" height="14" fill="white" transform="translate(0.2052)"/>
      </clipPath>
    </defs>
  </svg>
)

export default Tags
