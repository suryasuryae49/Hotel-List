import { Helmet } from 'react-helmet-async'
import EmptyState from '../components/EmptyState.jsx'

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Not Found | HotelHub</title>
      </Helmet>
      <section className="container section">
        <EmptyState title="404 - Page not found" message="The page you are looking for is not available." />
      </section>
    </>
  )
}

export default NotFound
