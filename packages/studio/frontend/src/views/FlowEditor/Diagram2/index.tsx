import React, { useState, useCallback, FC, useEffect } from 'react'
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MiniMap,
  Controls,
  Background
} from 'react-flow-renderer'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import NodeTypes from './NodeTypes'
import { getCurrentFlow, getCurrentFlowNode, RootReducer } from '../../../reducers'
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

const initialNodes = [
  {
    id: '1',
    type: 'standard',
    data: { name: 'Input Node' },
    position: { x: 150, y: 25 }
  },

  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 300, y: 125 }
  },
  {
    id: '3',
    type: 'standard',
    data: { name: 'Input Node' },
    position: { x: 150, y: 250 }
  }
]

const initialEdges = []

interface OwnProps {}

const Diagram2: FC<any> = ({ currentFlow, currentFlowNode, canPasteNode }) => {
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)
  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes])
  const onEdgesChange = useCallback(
    (changes) => {
      console.log(changes)
      return setEdges((eds) => applyEdgeChanges(changes, eds))
    },
    [setEdges]
  )
  const onConnect = useCallback((connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges])

  useEffect(() => {
    console.log(currentFlow)
  }, [currentFlow])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={NodeTypes}
      // we should pay for react-flow at least at the lowsest level to remove attribution, it's still MIT license but karma
      proOptions={{ account: 'paid-pro', hideAttribution: true }}
      fitView
    >
      <MiniMap />
      <Controls />
      <Background />
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
