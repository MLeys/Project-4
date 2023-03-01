import _ from 'lodash'

import { useEffect, useState, useRef } from "react";

import React from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import * as youTubeApi from "../../utils/youTubeApi.js"

async function searchYouTube(search) {
    
	try {
		const response = await youTubeApi.searchYouTube(search);
		console.log(response, " <------ response from YOUTUBE SEARCH");
		return await response
	} catch (err) {
		console.log(err.message, " <<<<<YouTube SEARCH ERROR>>>>>");
	}
}

const source = _.times(5, () => ({
	title: ''
  // title: faker.company.companyName(),
  // description: faker.company.catchPhrase(),
  // image: faker.internet.avatar(),
  // price: faker.finance.amount(0, 100, 2, '$'),
}))

const initialState = {
  loading: false,
  results: [],
  value: '',
}

function exampleReducer(state, action) {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.query }
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results }
    case 'UPDATE_SELECTION':
      return { ...state, value: action.selection }

    default:
      throw new Error()
  }
}

function SearchResources() {
  const [state, dispatch] = React.useReducer(exampleReducer, initialState)
  const { loading, results, value } = state

  const timeoutRef = React.useRef()



  const handleSearchChange = React.useCallback((e, data) => {
		if (e.key === 'Enter') {
			clearTimeout(timeoutRef.current)
	
			if (data.value.length === 0) {
				dispatch({ type: 'CLEAN_QUERY' })
				return
			}
	
			searchYouTube(data.value)
				.then((response) => {
					dispatch({
						type: 'FINISH_SEARCH',
						results: response.items,
					})
				})
				.catch((err) => {
					console.log(err.message, '<<<<<YouTube SEARCH ERROR>>>>>')
				})
		}
	}, [])
		


  //   clearTimeout(timeoutRef.current)
  //   dispatch({ type: 'START_SEARCH', query: data.value })

  //   timeoutRef.current = setTimeout(() => {
  //     if (data.value.length === 0) {
  //       dispatch({ type: 'CLEAN_QUERY' })
  //       return
  //     }

  //     const re = new RegExp(_.escapeRegExp(data.value), 'i')
  //     const isMatch = (result) => re.test(result.title)

  //     dispatch({
  //       type: 'FINISH_SEARCH',
  //       results: _.filter(source, isMatch),
  //     })
  //   }, 300)
  // }, [])




  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <Grid>
      <Grid.Column width={6}>
        <Search
          loading={loading}
					
          placeholder='Search...'
          onResultSelect={(e, data) =>
            dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
          }
					
          onSearchChange={handleSearchChange}
          results={results}
          value={value}
        />
      </Grid.Column>

      <Grid.Column width={10}>
        <Segment>
          <Header>State</Header>
          <pre style={{ overflowX: 'auto' }}>
            {JSON.stringify({ loading, results, value }, null, 2)}
          </pre>
          <Header>Options</Header>
          <pre style={{ overflowX: 'auto' }}>
            {JSON.stringify(source, null, 2)}
          </pre>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default SearchResources
