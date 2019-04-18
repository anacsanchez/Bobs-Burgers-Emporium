import createHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'

const history = process.env.NODE_ENV === 'test' ? createMemoryHistory() : createHistory({ basename: '/burgers-emporium' })

// history.listen(location => { console.log(location.pathname) })

export default history
