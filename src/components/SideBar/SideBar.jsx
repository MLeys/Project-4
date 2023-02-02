import React from 'react'
import {
  Button,
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react'



const VerticalSidebar = ({ animation, direction, visible }) => (
  <Sidebar
    as={Menu}
    animation={animation}
    direction={direction}
    icon='labeled'
    inverted
    vertical
    visible={visible}
    width='thin'
  >
    <Menu.Item as='a'>
      <Icon name='home' />
      Home
    </Menu.Item>
    <Menu.Item as='a'>
      <Icon name='gamepad' />
      Games
    </Menu.Item>
    <Menu.Item as='a'>
      <Icon name='camera' />
      Channels
    </Menu.Item>
  </Sidebar>
)

function exampleReducer(state, action) {
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

function SidebarExampleTransitions() {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    animation: 'overlay',
    direction: 'left',
    dimmed: false,
    visible: false,
  })

  const { animation, dimmed, direction, visible } = state
  const vertical = direction === 'bottom' || direction === 'top'

  return (
    <div>
      <Header as='h5'>Toggles</Header>
      <Button.Group>
        <Button
          active={direction === 'left'}
          onClick={() =>
            dispatch({ type: 'CHANGE_DIRECTION', direction: 'left' })
          }
        >
          Left
        </Button>
        <Button
        onClick={() =>
          dispatch({ type: 'CHANGE_ANIMATION', animation: 'push' })
        }
        >
        Push
      </Button>

      </Button.Group>




      <Sidebar.Pushable as={Segment} style={{ overflow: 'hidden' }}>
        {vertical && (
          <HorizontalSidebar
            animation={animation}
            direction={direction}
            visible={visible}
          />
        )}
        {!vertical && (
          <VerticalSidebar
            animation={animation}
            direction={direction}
            visible={visible}
          />
        )}

        <Sidebar.Pusher dimmed={dimmed && visible}>
          <Segment basic>
            <Header as='h3'>Application Content</Header>
            <Image src='/images/wireframe/paragraph.png' />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  )
}

export default SidebarExampleTransitions