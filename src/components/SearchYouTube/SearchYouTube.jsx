import { useState, useEffect, useContext } from 'react';

import { 
		Segment,
		Container,
		Card,
		Button,
		Form,
		Embed,
		Search,
		Input
} from 'semantic-ui-react';

import * as youTubeApi from "../../utils/youTubeApi.js"
import ResourceCard from '../ResourceCard/ResourceCard.jsx';

import { SkillsContext } from '../../context/SkillsContext/SkillsContext.jsx';



function SearchYouTube() {
	const ctx = useContext(SkillsContext);
	const skills = ctx.skills;
	
	const loggedUser = ctx.loggedUser;
	const skillIndex = ctx.activeSkill.index;
	const skill = ctx.skill;
	const subIndex = ctx.activeSub.index;
	const subSkills = skill.subSkills;
	const handleAddResource = ctx.handleAddResource;
	const subSkill = ctx.activeSub.subSkill
	
	const [search, setSearch] = useState('');
	const [results, setResults] = useState([]);

	async function searchYouTube(search) {
		console.log('start search funct', skill.name, subSkill.title)
		try {
			const response = await youTubeApi.searchYouTube(search, skill.name, subSkill.title);
			console.log(response, " <------ response from YOUTUBE SEARCH");
		
			setResults([...response])
		} catch (err) {
			console.log(err.message, " <<<<<YouTube SEARCH ERROR>>>>>");
		}
	}
	
	function handleAddResourceClick(e, resource) {
		e.preventDefault();
		// ADD PARAMS TO REMOVE FROM results WHEN CLICKED
		
		// console.log(resource, "<- resource clicked")
		const data = {
			title: resource.title,
			videoId: resource.videoId,
			description: resource.description,
			thumbnail: resource.thumbnail,
			datePublished: resource.publishTime,
			skillId: skill._id,
			subId: skill.subSkills[subIndex]._id,
			userId: loggedUser._id,
			source: 'youtube',
			skillIndex: skillIndex,
			subIndex: subIndex
		}
		
		// setAddResource({
		// 	...addResource,
		// 	title: resource.title,
		// 	videoId: resource.videoId,
		// 	description: resource.description,
		// 	thumbnail: resource.thumbnail,
		// 	datePublished: resource.publishTime,
		// 	skillId: skill._id,
		// 	userId: loggedUser._id,
		// 	source: 'youtube'
		// })
		handleAddResource(data);
		
	}

	

	function handleChange(e){
		setSearch(e.target.value)
	}

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const videoInfo = await searchYouTube(search);
		} catch(err) {
			console.log(err, "<<!! ERROR submitting resource search")
		}
	}

	return (
		<Container>
			<Form
				onSubmit={handleSubmit}
				size='large'
			>
				<Form.Group inline={true}>
						<Form.Input
							className="form-control"
							width={10}
							name="search"
							value={search}
							onChange={handleChange}
							placeholder={`Find Results for ${skill.name}`}
						/>

					<Form.Button> Search YouTube </Form.Button>
				</Form.Group>
			</Form>
				
				<Card.Group>
					{
			results.map((result, index) => {
				const resource = result;
				const resultIndex = index;
				return (
					<Card key={`result-${index}-${resource.videoId}`} >
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
						<Card.Content  as='a' extra={true}>
						<div className='ui two buttons'>
							<Button 
								basic 
								color='green'
								onClick={(e)=>{handleAddResourceClick(e, resource)}}
							>
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
		}
					</Card.Group>
		</Container>




	);
}

export default SearchYouTube;

// {/* <Form.Input
// className="form-control"
// name="search"
// value={search}
// onChange={handleChange}
// placeholder={skill.name}

// />
// <Button type="submit" className="btn">
// Add Skill
// </Button> */}