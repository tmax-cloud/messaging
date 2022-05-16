import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection
} from 'react-flow-renderer'
import create from 'zustand'

interface FlowEditorStore {
  flowName: string
  nodes: Node[]
  edges: Edge[]
  updateNodes: (changes: NodeChange[]) => void
  updateEdges: (changes: EdgeChange[]) => void
  addEdge: (connection: Connection) => void
  setFlow: (newName: string, newFlow: { nodes: Node[]; edges: Edge[] }) => void
}

const useDiagramStore = create<FlowEditorStore>((set, get) => ({
  // Flow
  flowName: '',
  nodes: [],
  edges: [],
  updateNodes: (changes) => set((state) => ({ nodes: applyNodeChanges(changes, state.nodes) })),
  updateEdges: (changes) => set((state) => ({ edges: applyEdgeChanges(changes, state.edges) })),
  addEdge: (connection) => set((state) => ({ edges: addEdge(connection, state.edges) })),
  setFlow: (newName, newFlow) => {
    set(() => ({ flowName: newName, ...newFlow }))
  },
  // Flow Node
  // currentNode
  // setCurrentNode
  // Reset Diagram
  resetDiagram: () => set(() => ({ nodes: [], edges: [] }))
}))

export default useDiagramStore
