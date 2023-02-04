import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function SubSkillCard({ skill }) {

    return (
        <Card fluid key={skill._id}>
            <Card.Content>

                <Card.Header>Steve Sanders</Card.Header>
                <Card.Meta>Friends of Elliot</Card.Meta>
                <Card.Description>
                Steve wants to add you to the group <strong>best friends</strong>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                <Button basic color='green'>
                    Approve
                </Button>
                <Button basic color='red'>
                    Decline
                </Button>
                </div>
            </Card.Content>


        </Card>




    )
}