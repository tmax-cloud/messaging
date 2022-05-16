import create from 'zustand'

interface FlowEditorStore {
  tabs: string[]
  activeTabIdx: number
  openTabId: (id: string) => void
  changeTab: (idx: number) => void
  closeTabIdx: (idx: number) => void
  resetInspector: () => void
}

const useFlowEditorStore = create<any>((set, get) => ({
  // Flow
  nodes,
  edges,
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

  // Reset Flow Editor
  resetFlowEditor: () => set(() => ({}))
}))

export default useFlowEditorStore

// const initialNodes = [
//   {
//     id: '1',
//     type: 'input',
//     data: { label: 'Input Node' },
//     position: { x: 250, y: 25 }
//   },

//   {
//     id: '2',
//     // you can also pass a React component as a label
//     data: { label: <div>Default Node</div> },
//     position: { x: 100, y: 125 }
//   },
//   {
//     id: '3',
//     type: 'output',
//     data: { label: 'Output Node' },
//     position: { x: 250, y: 250 }
//   }
// ]

// const initialEdges = [
//   { id: 'e1-2', source: '1', target: '2' },
//   { id: 'e2-3', source: '2', target: '3', animated: true }
// ]
