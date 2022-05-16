import React, { FC, useState, useEffect } from 'react'
import ReactFlow, { useReactFlow, MiniMap, Controls, Background } from 'react-flow-renderer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import shallow from 'zustand/shallow'

import {
  switchFlowNode,
  createFlowNode,
  removeFlowNode,
  updateFlowNode,
  updateFlow,
  copyFlowNodes,
  pasteFlowNode,
  refreshFlowsLinks
} from '~/src/actions'
import { getCurrentFlow, getCurrentFlowNode, RootReducer } from '../../../reducers'
import { toRFlow } from '../utils/convertBotData'
import NodeTypes from './NodeTypes'
import useDiagramStore from './store'

interface OwnProps {}

const Diagram2: FC<any> = ({ currentFlow, currentFlowNode, canPasteNode }) => {
  const [lastFlow, setLastFlow] = useState('')
  const reactFlow = useReactFlow()
  const [nodes, edges, flowName, updateNodes, updateEdges, addEdge, setFlow] = useDiagramStore(
    (state) => [
      state.nodes,
      state.edges,
      state.flowName,
      state.updateNodes,
      state.updateEdges,
      state.addEdge,
      state.setFlow
    ],
    shallow
  )

  useEffect(() => {
    console.log(nodes, edges)
    reactFlow.fitView({ padding: 1.25, duration: 500 })
  }, [nodes, edges])

  useEffect(() => {
    console.log('wat')
    if (currentFlow) {
      setFlow(currentFlow.name, toRFlow(currentFlow))
    }
  }, [currentFlow])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={updateNodes}
      onEdgesChange={updateEdges}
      onConnect={addEdge}
      nodeTypes={NodeTypes}
      maxZoom={4}
      // we should pay for react-flow at least at the lowsest level to remove attribution, it's still MIT license but karma
      proOptions={{ account: 'paid-pro', hideAttribution: true }}
    >
      <MiniMap />
      <Controls />
      {/* If you want to try the dark diagram */}
      <Background color="#394B59" style={{backgroundColor: '#0E1116'}}/>
      {/* <Background /> */}
    </ReactFlow>
  )
}

const mapStateToProps = (state: RootReducer) => ({
  currentFlow: getCurrentFlow(state),
  currentFlowNode: getCurrentFlowNode(state as never),
  canPasteNode: Boolean(state.flows.buffer?.nodes)
})

const mapDispatchToProps = {
  switchFlowNode,
  // openFlowNodeProps,
  // closeFlowNodeProps,
  // setDiagramAction,
  createFlowNode,
  removeFlowNode,
  // createFlow,
  updateFlowNode,
  // switchFlow,
  updateFlow,
  copyFlowNodes,
  pasteFlowNode,
  refreshFlowsLinks
  // insertNewSkillNode,
  // updateFlowProblems,
  // zoomToLevel,
  // buildSkill: buildNewSkill
}

export default connect<any>(mapStateToProps, mapDispatchToProps)(withRouter(Diagram2))
