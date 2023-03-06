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
	const loggedUser = ctx.loggedUser;
	const skillIndex = ctx.activeSkill?.index;
	const skill = ctx.skills[skillIndex];
	const subIndex = ctx.activeSub?.index;
	const subSkills = skill.subSkills;
	const subSkill = subSkills[subIndex]
	const subTitle = subSkill.title;
	

	const [search, setSearch] = useState('');
	const [results, setResults] = useState([]);



	async function searchYouTube(search) {
		console.log('start search funct')
		try {
			const response = await youTubeApi.searchYouTube(search);
			console.log(response, " <------ response from YOUTUBE SEARCH");
			
			setResults([...response])
		} catch (err) {
			console.log(err.message, " <<<<<YouTube SEARCH ERROR>>>>>");
		}
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


	useEffect(() => {
	
	}, []);  

	return (
		<Container>
			<Segment.Group>
				<Segment>
					<Form
						onSubmit={handleSubmit}
						size='large'
					>
						<Form.Field >
							<Form.Input
								className="form-control"
								name="search"
								value={search}
								onChange={handleChange}
								placeholder={`Find Results for ${skill.name}`}
							/>
						</Form.Field>
						<Form.Button >go</Form.Button>
					</Form>
				</Segment>
				<Card.Group>
					{
			results.map((resource, index) => {
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
		}
		</Card.Group>
					
					

				

				
			</Segment.Group>
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