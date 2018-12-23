import elasticsearch from 'elasticsearch'
import { history } from '../../store'

export const SEARCH_RESULTS = 'SEARCH_RESULTS'
export const SEARCH_INPUT = 'SEARCH_INPUT'

const elasticsearchConnectionString = process.env.SEARCHBOX_URL

const client = new elasticsearch.Client({
  host: elasticsearchConnectionString || 'localhost:9200'
});

export default (searchInput, filter) => {

  const searchQuery = (filter) ? `${searchInput} _exists_:paid` : searchInput

  return (dispatch) => {
    client.search({q: searchQuery}).then((results) => {
        const convertedResults = results.hits.hits.map((result) => {
          const id = result._id
          const event = result._source
          return { ...event, _id: id }
        })

        dispatch({type: SEARCH_RESULTS, payload: convertedResults})
        dispatch({type: SEARCH_INPUT, payload: searchInput})
        history.push('/search-results')
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
