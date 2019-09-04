import React, { Component } from 'react';
import { Form, Pagination, PaginationItem, PaginationLink } from 'reactstrap';



const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
};
class PaginationBar extends Component {
    constructor(props) {
        super(props);
        const { totalRecords = null, pageLimit = 30, pageNeighbours = 0 } = props;

        this.pageLimit = typeof pageLimit === "number" ? pageLimit : 30;
        this.totalRecords = typeof totalRecords === "number" ? totalRecords : 0;

        this.pageNeighbours =
            typeof pageNeighbours === "number"
                ? Math.max(0, Math.min(pageNeighbours, 2))
                : 0;

        this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);

        this.state = { currentPage: 1 };
    }

    gotoPage = page => {
        const { onPageChanged = f => f } = this.props;

        const currentPage = Math.max(0, Math.min(page, this.totalPages));

        const paginationData = {
            currentPage,
            totalPages: this.totalPages,
            pageLimit: this.pageLimit,
            totalRecords: this.totalRecords
        };

        this.setState({ currentPage }, () => onPageChanged(paginationData));
    };

    componentDidMount() {
        this.gotoPage(1);
    }

    handleMoveLeft = evt => {
        evt.preventDefault();
        this.gotoPage(this.state.currentPage - this.pageNeighbours * 2 - 1);
    };

    handleMoveRight = evt => {
        evt.preventDefault();
        this.gotoPage(this.state.currentPage + this.pageNeighbours * 2 + 1);
    };

    fetchPageNumbers = () => {
        const totalPages = this.totalPages;
        const currentPage = this.state.currentPage;
        const pageNeighbours = this.pageNeighbours;

        const totalNumbers = this.pageNeighbours * 2 + 3;
        const totalBlocks = totalNumbers + 2;

        if (totalPages > totalBlocks) {
            let pages = [];

            const leftBound = currentPage - pageNeighbours;
            const rightBound = currentPage + pageNeighbours;
            const beforeLastPage = totalPages - 1;

            const startPage = leftBound > 2 ? leftBound : 2;
            const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

            pages = range(startPage, endPage);

            const pagesCount = pages.length;
            const singleSpillOffset = totalNumbers - pagesCount - 1;

            const leftSpill = startPage > 2;
            const rightSpill = endPage < beforeLastPage;

            const leftSpillPage = LEFT_PAGE;
            const rightSpillPage = RIGHT_PAGE;

            if (leftSpill && !rightSpill) {
                const extraPages = range(startPage - singleSpillOffset, startPage - 1);
                pages = [leftSpillPage, ...extraPages, ...pages];
            } else if (!leftSpill && rightSpill) {
                const extraPages = range(endPage + 1, endPage + singleSpillOffset);
                pages = [...pages, ...extraPages, rightSpillPage];
            } else if (leftSpill && rightSpill) {
                pages = [leftSpillPage, ...pages, rightSpillPage];
            }

            return [1, ...pages, totalPages];
        }

        return range(1, totalPages);
    };


    handleClick = (page, evt) => {
        evt.preventDefault();
        this.gotoPage(page);
    };

    render() {
        const { currentPage } = this.state;
         const pages = this.fetchPageNumbers();
        return (
            <React.Fragment>
                <Form>
                    <Pagination>
                    {pages.map((page, index) => {
                    if (page === LEFT_PAGE)
                    return (
                        <PaginationItem  key={index}>
                            <PaginationLink previous tag="button" onClick={this.handleMoveLeft} />
                        </PaginationItem>
                    );
                    if (page === RIGHT_PAGE)
                    return (
                        <PaginationItem  key={index}>
                            <PaginationLink previous tag="button" onClick={this.handleMoveRight} />
                        </PaginationItem>
                    );
                    return (
                            <PaginationItem key={index}
                            className={`page-item${currentPage === page ? " active" : ""}`}
                            >
                                    <PaginationLink tag="button" onClick={e => this.handleClick(page, e)}>
                                        {page}
                                    </PaginationLink>
                            </PaginationItem>
                    );

                    })};

                    </Pagination>
                </Form>
            </React.Fragment>

        );
    }
}

export default PaginationBar;

                 //         <PaginationItem disabled>
                //             <PaginationLink previous tag="button" />
                //         </PaginationItem>

                //         <PaginationItem active>
                //             <PaginationLink tag="button">
                //                 1
                // </PaginationLink>
                //         </PaginationItem>
                //         <PaginationItem>
                //             <PaginationLink tag="button">
                //                 2
                // </PaginationLink>
                //         </PaginationItem>
                //         <PaginationItem>
                //             <PaginationLink tag="button">
                //                 3
                // </PaginationLink>
                //         </PaginationItem>
                //         <PaginationItem>
                //             <PaginationLink tag="button">
                //                 4
                // </PaginationLink>
                //         </PaginationItem>
                //         <PaginationItem>
                //             <PaginationLink tag="button">
                //                 5
                // </PaginationLink>
                //         </PaginationItem>
                //         <PaginationItem>
                //             <PaginationLink next tag="button" />
                //         </PaginationItem>