import create from 'zustand'
import ReactFlow, {
  Node
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'react-flow-renderer'

interface FlowEditorStore {
  nodes: 
}

const useDiagramStore = create<any>((set, get) => ({
  // Flow
  nodes: [],
  edges: [],
  updateNodes: (changes) => set((state) => ({nodes: applyNodeChanges(changes, state.nodes)})),
  updateEdges:,
  addEdge:
  // Flow Node
  currentNode
  setCurrentNode
  //
  tabs: [],
  activeTabIdx: -1,
  openTabId: (id) => {
    const { tabs } = get()
    const existingTab = tabs.indexOf(id)

    if (existingTab === -1) {
      set((state) => ({ tabs: [id, ...state.tabs], activeTabIdx: 0 }))
    } else {
      set((state) => ({ activeTabIdx: existingTab }))
    }
  },
  changeTab: (idx) => set(() => ({ activeTabIdx: idx })),
  closeTabIdx: (idx) =>
    set((state) => ({ tabs: state.tabs.filter((_, i) => i !== idx), activeTabIdx: state.activeTabIdx - 1 })),

  // Reset Diagram
  resetDiagram: () => set(() => ({}))
}))

export default useDiagramStore

// const [nodes, setNodes] = useState(initialNodes)
// const [edges, setEdges] = useState(initialEdges)
// const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes])
// const onEdgesChange = useCallback(
//   (changes) => {
//     console.log(changes)
//     return setEdges((eds) => applyEdgeChanges(changes, eds))
//   },
//   [setEdges]
// )
// const onConnect = useCallback((connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges])