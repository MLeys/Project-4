import { useState, useEffect } from 'react';

import { 
    Segment,
    Card,
    Button,
    Icon,
    Label,
    Form,
    Embed,
	Image


} from 'semantic-ui-react';

function ResourceCard({liftYouTubeSearchResults, youTubeSearchResults, skill}) {
	const [resources, setResources] = useState([]);
	const [selected, setSelected] = useState();

	function handleSelect(e, resource) {
		e.stopPropagation();
		e.preventDefault();
		console.log(`Data (resourceCard): ${resource}`)
		setSelected(resource)
		

	}

	function getResources() {
		(youTubeSearchResults) ? setResources([...youTubeSearchResults]) : '';
	}

	useEffect(() => {
		getResources();
	}, [youTubeSearchResults]);
	
	return (
	<>{
		resources.map((resource) => {
			return (
				
				<Card 
					key={`search-${skill.name}-${resource.videoId}`}
					onClick={(e) =>{
						
						handleSelect(e, resource)} }
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