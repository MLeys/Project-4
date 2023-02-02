import React from 'react'
import { Button, Image, List } from 'semantic-ui-react'

const SkillList = () => (
  <List divided Link verticalAlign='middle'>
    <List.Item as={a}>
      <List.Content floated='right'>
        <Button>Add</Button>
      </List.Content>
      <Image avatar src='/images/avatar/small/lena.png' />
      <List.Content>Lena</List.Content>
    </List.Item>
  </List>
)

export default SkillList
