export default function SidebarReducer(state, action) {
    switch (action.type) {
      case 'CHANGE_ANIMATION':
        return { ...state, animation: action.animation, visible: !state.visible }
      case 'CHANGE_DIMMED':
        return { ...state, dimmed: action.dimmed }
      case 'CHANGE_DIRECTION':
        return { ...state, direction: action.direction, visible: false }
      default:
        throw new Error()
    }
  }