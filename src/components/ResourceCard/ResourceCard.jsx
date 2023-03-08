import { useState, useEffect, useContext } from 'react';

import { 
    Card,
    Button,
    Embed,

} from 'semantic-ui-react';

import { SkillsContext } from '../../context/SkillsContext/SkillsContext';

function ResourceCard() {
	const ctx = useContext(SkillsContext);
	const resources = ctx.activeSub.resources;

	return (
	<>{
		resources.map((resource, index) => {
			return (
				
				<Card 
					key={`${resource.videoId}-${index}`}
					onClick={(e, resource)=>{handleSelect(e, resource, index)}}
						
				>
					<Embed
						autoplay={false}
						color='white'
						hd={false}
						id={resource.videoId}
						iframe={{
							allowFullScreen: true,
							style: {
								padding: 5,
							},
						}}
						placeholder={resource.thumbnail}
						source='youtube'
					/>

					<Card.Content>
					<Card.Header content={resource.title}/>
					<Card.Meta content={resource.publishTime} />
					<Card.Description content={resource.description} />
					</Card.Content>
					<Card.Content extra={true}>
					<div className='ui two buttons'>
						<Button basic color='green'>
						Learn
						</Button>
						<Button basic color='red'>
						Nope
						</Button>
					</div>
					</Card.Content>
				</Card>
			)
		})
	}</>
	)
}

export default ResourceCard;