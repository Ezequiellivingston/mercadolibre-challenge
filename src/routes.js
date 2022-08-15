import Home from './pages/Home'
import Search from './pages/Search'
import Detail from './pages/Detail'

export const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/items',
    component: Search
  },
  {
    path: '/items/:id',
    component: Detail
  }
]
