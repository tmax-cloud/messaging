import cx from 'classnames'
import React, { useEffect } from 'react'
import { ReactFlowProvider } from 'react-flow-renderer'

import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import {
  clearErrorSaveFlows,
  closeFlowNodeProps,
  flowEditorRedo,
  flowEditorUndo,
  refreshActions,
  refreshIntents,
  setDiagramAction,
  switchFlow,
  fetchFlows
} from '~/src/actions'
import { RootReducer, getCurrentFlowNode } from '~/src/reducers'

import '~/src/scss/style.scss'
import Diagram2 from './Diagram2'
import Explorer from './explorer'
import Inspector from './inspector'
import { Navbar } from './tmp'
import * as tmp from './tmp/tmp.module.scss'

interface OwnProps {
  currentMutex: any
}

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof mapDispatchToProps
type Props = DispatchProps & StateProps & OwnProps & RouteComponentProps

const FlowEditor = (props: Props) => {
  const { currentFlowNode, fetchFlows } = props

  useEffect(() => {
    fetchFlows()
  }, [])

  return (
    <div className={cx(tmp.main)} data-theme="theme-light">
      <div className={tmp.view}>
        <div className={tmp.diagram}>
          <ReactFlowProvider>
            <Diagram2 />
          </ReactFlowProvider>
        </div>

        <div className={tmp.inner}>
          <Explorer />
          {currentFlowNode && <Inspector currentFlowNode={currentFlowNode} />}
        </div>
      </div>
      <div className={tmp.layout}>
        <div className={tmp.nav}>
          <Navbar />
        </div>
        <div className={tmp.toolbar}>
          <span>asdfs</span>
          <span>Name</span>
          <span>Train Chatbot</span>
        </div>
      </div>
    </div>
    // <div className={tmp.view}>
    //   <div className={style.container}>
    //     <div className={style.diagram}>
    //       {/* <Diagram
    //       readOnly={readOnly}
    //       showSearch={showSearch}
    //       hideSearch={() => setShowSearch(false)}
    //       handleFilterChanged={handleFilterChanged}
    //       highlightFilter={highlightFilter}
    //       mutexInfo={mutex}
    //       ref={(el) => {
    //         if (!!el) {
    //           // @ts-ignore
    //           diagram = el.getWrappedInstance()
    //         }
    //       }}
    //     /> */}
    //       <ReactFlowProvider>
    //         <Diagram2 />
    //       </ReactFlowProvider>
    //     </div>
    //     <div className={tmp.uiLayerBorder}>
    //     <Explorer />
    //     {currentFlowNode && <Inspector currentFlowNode={currentFlowNode} />}
    //     </div>
    //   </div>
    //   <div className={tmp.uiLayerBorder}>
    //     <Navbar />
    //     <Toolbar />
    //   </div>
    // </div>
  )
}

const mapStateToProps = (state: RootReducer) => ({
  currentFlow: state.flows.currentFlow,
  flowsByName: state.flows.flowsByName,
  showFlowNodeProps: state.flows.showFlowNodeProps,
  user: state.user,
  errorSavingFlows: state.flows.errorSavingFlows,
  currentFlowNode: getCurrentFlowNode(state as never) as any
})

const mapDispatchToProps = {
  switchFlow,
  setDiagramAction,
  flowEditorUndo,
  flowEditorRedo,
  clearErrorSaveFlows,
  closeFlowNodeProps,
  refreshActions,
  refreshIntents,
  fetchFlows
}

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(withRouter(FlowEditor))

// main container (wraps around entire app)
// View Wrapper Container
// FlowEditor
// Diagram
// Inner View Layout invisiTM Container (reusable class, padds the view,low z-index,one to pad views if nessesairy like settings page)
// Explorer
// SearchBar and undo redo
// Inspector
// Layout Invisi Container
// nav
// toolbar
