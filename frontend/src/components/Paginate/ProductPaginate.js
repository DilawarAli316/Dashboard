import React from 'react'
import { Pagination } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from 'react-router-dom'

const Paginate = ({
  path,
  query,
  oldQuery,
  pages,
  page,
  isAdmin = false,
  keyword = '',
}) => {
  console.log(path, oldQuery, query)
  const pagePath =
    path.includes(':pageNumber') ||
    [...Array(11).keys()].some((substring) => path.includes(substring))
      ? path.split('/')
      : path

  pagePath.pop()

  const myPath = pagePath.join('/')

  const history = useHistory()
  return (
    pages > 1 && (
      <Pagination style={{ padding: '0 3px' }}>
        {[...Array(pages).keys()].map(
          (
            x // [0,1,2,3]
          ) => (
            <Pagination.Item
              key={x + 1}
              active={x + 1 == page}
              onClick={() =>
                !isAdmin
                  ? keyword
                    ? history.push(`/search/${keyword}/page/${x + 1}`)
                    : history.push(`/page/${x + 1}`)
                  : history.push(`${myPath}/${x + 1}${query}${x + 1}`)
              }
            >
              {x + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>
    )
  )
}

export default Paginate
