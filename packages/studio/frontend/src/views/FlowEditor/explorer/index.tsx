import cx from 'classnames'
import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'
import { createFlow, duplicateFlow, renameFlow, deleteFlow, switchFlow } from '~/src/actions'
import { lang } from '~/src/components/Shared/translations'
import { RootReducer, getAllFlows, getCurrentFlow, getFlowNamesList, getDirtyFlows } from '~/src/reducers'

import * as style from './style.module.scss'

export type PanelPermissions = 'create' | 'rename' | 'delete'

const Explorer: FC<any> = ({ flows, dirtyFlows, flowsName }) => {
  useEffect(() => {
    console.log(flows)
    console.log(dirtyFlows)
    console.log(flowsName)
  }, [flows, dirtyFlows, flowsName])
  return (
    <div className={style.container}>
      <div className={style.head}>
        <div className={style.nav}>
          <h2 className={cx(style.navEl, { [style.selected]: true })}>{lang.tr('flows')}</h2>
          <h2 className={cx(style.navEl, { [style.selected]: false })}>{lang.tr('Skills')}</h2>
        </div>

        <input className={style.search} placeholder="Filter nodes.." />
      </div>
      <div className={style.insetSection}>{/* <Tree contents={buildFlowsTree(flows, {}) as any} /> */}</div>
    </div>
  )
}
const mapStateToProps = (state: RootReducer) => ({
  flows: getAllFlows(state),
  currentFlow: getCurrentFlow(state),
  dirtyFlows: getDirtyFlows(state as never),
  flowsName: getFlowNamesList(state as never)
})

const mapDispatchToProps = {
  createFlow,
  duplicateFlow,
  renameFlow,
  deleteFlow,
  switchFlow
}

export default connect<any>(mapStateToProps, mapDispatchToProps)(withRouter(Explorer))

// const mapStateToProps = (state: RootReducer) => ({
//   flows: getAllFlows(state.flows),
//   currentFlow: getCurrentFlow(state),
//   currentFlowNode: getCurrentFlowNode(state as never),
//   currentDiagramAction: state.flows.currentDiagramAction,
//   canPasteNode: Boolean(state.flows.buffer?.nodes),
//   emulatorOpen: state.ui.emulatorOpen,
//   debuggerEvent: state.flows.debuggerEvent,
//   zoomLevel: state.ui.zoomLevel,
//   skills: state.skills.installed
// })

// const mapDispatchToProps = {
//   fetchFlows,
//   switchFlowNode,
//   openFlowNodeProps,
//   closeFlowNodeProps,
//   setDiagramAction,
//   createFlowNode,
//   removeFlowNode,
//   createFlow,
//   updateFlowNode,
//   switchFlow,
//   updateFlow,
//   copyFlowNodes,
//   pasteFlowNode,
//   refreshFlowsLinks,
//   insertNewSkillNode,
//   updateFlowProblems,
//   zoomToLevel,
//   buildSkill: buildNewSkill
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Explorer)
// export default Explorer
