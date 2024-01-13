import React from 'react'
import {Pagination,LinkContainer} from 'react-bootstrap';
const Paginate = ({pages, page, isAdmin = false}) => {
  return (
    pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map((x) => (
                <LinkContainer
                    key={x + 1}
                    to={
                        !isAdmin
                            ? `/page/${x + 1}`
                            : `/admin/productlist/${x + 1}`
                    }
                >
                    <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
  )
}

export default Paginate