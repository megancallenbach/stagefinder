import elasticsearch from 'elasticsearch'
import { history } from '../../store'

export const SEARCH_RESULTS = 'SEARCH_RESULTS'
export const SEARCH_INPUT = 'SEARCH_INPUT'

const elasticsearchConnectionString = 'https://41fm65xs2n:x7knciawu5@yew-541626802.eu-west-1.bonsaisearch.net:443';

const client = new elasticsearch.Client({
  host: elasticsearchConnectionString
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
