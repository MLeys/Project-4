import { useState, useEffect } from 'react';

import { 
    Card,
    Button,
    Embed,

} from 'semantic-ui-react';

function ResourceCard({liftYouTubeSearchResults, youTubeSearchResults, 
	skill, handleAddResource,
	loggedUser
}) {
	const [resources, setResources] = useState([]);
	const [selected, setSelected] = useState({});
	const [addResource, setAddResource] = useState({})

	function handleSelect(e, resource, index) {
		e.preventDefault();
		// const newResource = {
		// 	title: resource.title,
		// 	videoId: resource.videoId,
		// 	description: resource.description,
		// 	thumbnail: resource.thumbnail,
		// 	datePublished: resource.publishTime,
		// 	skillId: skill._id,
		// 	userId: loggedUser._id,
		// 	source: 'youtube'
		// }
		setAddResource({
			...addResource,
			title: resources[index].title,
			videoId: resources[index].videoId,
			description: resources[index].description,
			thumbnail: resources[index].thumbnail,
			datePublished: resources[index].publishTime,
			skillId: skill._id,
			userId: loggedUser._id,
			source: 'youtube'
		})

		
		console.log(`addResource(resourceCard-handleSelect): ${addResource}`)
		handleAddResource(addResource);

	}
	

	function getSearchResults() {
		(youTubeSearchResults) ? setResources([...youTubeSearchResults]) : '';
	}

	useEffect(() => {
		getSearchResults();
	}, [youTubeSearchResults]);
	


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