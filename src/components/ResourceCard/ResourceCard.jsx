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

function ResourceCard({resultSearchYT, skill}) {
	const [resources, setResources] = useState([]);

	function getResources() {
		setResources([...resultSearchYT])
	}

	useEffect(() => {
		getResources();
	}, [!resources]);
	
	return (
		<>
		{
			resultSearchYT.map((res) => {
				console.log(res.title)
				return (
				  
					<Card key={`search-${skill.name}-${res.videoId}`}>
					  	<iframe
						  width="280"
						  height="157.5"
						  src={`https://www.youtube.com/embed/${res.videoId}`}
						  title={res.title}
						  allowFullScreen
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
		}
		
		</>
	)

    resultSearchYT.map((res) => {
        console.log(res.title)
        return (
          
            <Card key={`search-${skill.name}-${res.videoId}`}>
              <Image src={res.thumbnail} wrapped ui={false}/>
              <Card.Content>
                <Card.Header content={res.title}/>
                <Card.Meta content={res.publishTime} />
                <Card.Description content={res.description} />
              </Card.Content>
              <Card.Content extra={true}>
                <div className='ui two buttons'>
                  <Button basic color='green'>
                    Approve
                  </Button>
                  <Button basic color='red'>
                    Decline
                  </Button>
                </div>
              </Card.Content>
              {/* <Card.Content extra={true}>
                <iframe
                  width="280"
                  height="157.5"
                  src={`https://www.youtube.com/embed/${res.videoId}`}
                  title={res.title}
                  allowFullScreen
                />
              </Card.Content> */}
            </Card>
        )
      })
}

export default ResourceCard;