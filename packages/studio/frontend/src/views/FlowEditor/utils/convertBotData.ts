import { FlowView, NodeLinkView } from '@botpress/common'
import { FlowNode } from '@botpress/sdk'
import { Node, Edge } from 'react-flow-renderer'

interface RFlow {
  nodes: Node[]
  edges: Edge[]
}
interface FlowNodeWeb extends FlowNode {
  x: number
  y: number
  skill: string
}
interface NodeLinkViewWeb extends NodeLinkView {
  id: string
  sourcePort: string
}
interface FlowViewWeb extends FlowView {
  nodes: FlowNodeWeb[]
  links: NodeLinkViewWeb[]
}
type RFLowFn = (bpFlow: FlowViewWeb) => RFlow

export const toRFlow: RFLowFn = (bpFlow) => {
  return {
    nodes: bpFlow.nodes.map(({ id, type, name, onEnter, onReceive, next, skill, x, y }) => {
      return {
        id,
        type: type || 'entry',
        data: {
          name,
          next,
          skill,
          onEnter,
          onReceive
        },
        position: { x, y }
      }
    }),
    edges: bpFlow.links.map(({ id, source, target, sourcePort }) => {
      return {
        id,
        type: 'smoothstep',
        source,
        target,
        sourceHandle: sourcePort
      }
    })
  }
}

export const metaFromAction = (action: string) => {
  const split = action.split(' ')
  if (split[0] === 'say') {
    return {
      type: action.slice(action.indexOf('_') + 1, action.lastIndexOf('-')),
      action: split[1]
    }
  }
  return {
    type: split[0],
    action: split[1]
  }
}
