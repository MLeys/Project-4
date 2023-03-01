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

	function getResources() {
		(youTubeSearchResults) ? setResources([...youTubeSearchResults]) : '';
	}

	useEffect(() => {
		getResources();
	}, [youTubeSearchResults]);
	
	return (
	<>{
		resources.map((res) => {
			console.log(res.title)
			return (
				
				<Card key={`search-${skill.name}-${res.videoId}`}>
					<Embed
						autoplay={false}
						color='white'
						hd={false}
						id={res.videoId}
						iframe={{
							allowFullScreen: true,
							style: {
								padding: 10,
							},
						}}
						placeholder={res.thumbnail}
						source='youtube'
					/>

					<Card.Content>
					<Card.Header content={res.title}/>
					<Card.Meta content={res.publishTime} />
					<Card.Description content={res.description} />
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