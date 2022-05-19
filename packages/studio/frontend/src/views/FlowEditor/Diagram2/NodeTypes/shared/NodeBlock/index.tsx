import React, { useState, useEffect, FC } from 'react'
import { connect } from 'react-redux'

import { fetchContentItem, refreshFlowsLinks } from '~/src/actions'
import Tags, { TagGroups } from '~/src/components/Tags'
import style from './style.module.scss'

// export const textToItemId = (text) => text?.match(/^say #!(.*)$/)?.[1]
// this.props.fetchContentItem(this.state.itemId, { force: true, batched: true }).then(this.props.refreshFlowsLinks)
// const item = this.props.items[this.state.itemId]

const NodeBlock: FC<any> = ({ action, items, fetchContentItem, refreshFlowsLinks }) => {
  const [actionId, setActionId] = useState('')

  useEffect(() => {
    const id = action?.match(/^say #!(.*)$/)?.[1]
    if (id) {
      fetchContentItem(id, { force: true, batched: true })
        .then(refreshFlowsLinks)
        .then(() => setActionId(id))
    } else {
      setActionId('')
    }
  }, [action, setActionId])

  const getBlockClass = (type) => {
    let group = null
    for (const [key, value] of Object.entries(TagGroups)) {
      value.find((o, i) => {
        if (o.type === type) {
          group = key
        }
      })
    }

    return group ? `block-${group}` : 'block'
  }

  return !action.startsWith('say') ? (
    <div className={style['block-code']}>
      <Tags type={'code'} />
      <span>{action.split(' ')[0]} (Args)</span>
    </div>
  ) : items[actionId] ? (
    <div className={style[getBlockClass(items[actionId].contentType)]}>
      <Tags type={items[actionId].contentType} />
      <span>{items[actionId].previews.en}</span>
    </div>
  ) : (
    <div className={style['block-loading']}>
      {/* <Tags icon={type.type.type} /> */}
      <span>loading</span>
    </div>
  )
}
const mapStateToProps = (state) => ({ items: state.content.itemsById })
const mapDispatchToProps = { fetchContentItem, refreshFlowsLinks }

export default connect(mapStateToProps, mapDispatchToProps)(NodeBlock)
