import { useState, useEffect, useContext } from 'react';

import { 
		Segment,
		Container,
		Card,
		Button,
		Form,
		Search,
		Input
} from 'semantic-ui-react';

import * as youTubeApi from "../../utils/youTubeApi.js"
import ResourceCard from '../ResourceCard/ResourceCard.jsx';

import { SkillsContext } from '../../context/SkillsContext/SkillsContext.jsx';



function SearchYouTube() {
	const ctx = useContext(SkillsContext)
	const skill = ctx.skills[ctx.activeSkill.index]

	const [search, setSearch] = useState('');
	const [results, setResults] = useState({});


	function handleSetResults(data) {
		console.log(data, " DATA")
		setResults({
			...results,
			title: data[index].title,
			videoId: data[index].videoId,
			description: data[index].description,
			thumbnail: data[index].thumbnail,
			datePublished: data[index].publishTime,
			skillId: skill._id,
			userId: loggedUser._id,
			source: 'youtube'
			
		})
	}

	async function searchYouTube(search) {
		console.log('start search funct')
		try {
			const response = await youTubeApi.searchYouTube(search);
			console.log(response, " <------ response from YOUTUBE SEARCH");
			
			handleSetResults(response)
		} catch (err) {
			console.log(err.message, " <<<<<YouTube SEARCH ERROR>>>>>");
		}
		console.log(results, '<-current results after search')
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
	
	}, [results]);  



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
								placeholder={`Find Resources for ${skill.name}`}
							/>
						</Form.Field>
					</Form>
				</Segment>
				
				<Segment>

				</Segment>
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