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
        const { totalPages = null, currentPage = 1, pageNeighbours = 0 } = this.props;


    }

    state = {
        currentPage: 1,
        totalPages: null
    };

    gotoPage = page => {
        const { currentPage, totalPages, onPageChanged = f => f } = this.props;
        var pages = this.getPager(currentPage, totalPages);
        console.log('state pagination', this.state);
        this.setState({ currentPage: page }, () => onPageChanged(page));
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

    getPager = (currentPage, totalPages) => {
        currentPage = currentPage || 1;


        const pages = [];
        if (totalPages !== null) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        }
        return pages;
    }

    getPagerV2 = () => {
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
        console.log('---gotopage---', page)
        this.gotoPage(page);
    };






    render() {
        const { currentPage, totalPages } = this.props;
        const pages = this.getPager(currentPage, totalPages);
        const pageList = (

            pages.map(page => (
                <PaginationItem key={page} className={`page-item${currentPage === page ? " active" : ""}`} >
                    <PaginationLink tag="button" onClick={e => this.handleClick(page, e)}>
                        {page}
                    </PaginationLink>
                </PaginationItem>
            )));


        return (
            <React.Fragment>
                <Form>
                    <Pagination>
                        {pageList}
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

                //{pages.map(page => {
                    // if (page === LEFT_PAGE)
                    // return (
                    //     <PaginationItem  key={page}>
                    //         <PaginationLink previous tag="button" onClick={this.handleMoveLeft} />
                    //     </PaginationItem>
                    // );
                    // if (page === RIGHT_PAGE)
                    // return (
                    //     <PaginationItem  key={page}>
                    //         <PaginationLink previous tag="button" onClick={this.handleMoveRight} />
                    //     </PaginationItem>
                    // );

                    //         <PaginationItem key={page}
                    //         className={`page-item${currentPage === page ? " active" : ""}`}
                    //         >
                    //                 <PaginationLink tag="button" onClick={e => this.handleClick(page, e)}>
                    //                     {page}
                    //                 </PaginationLink>
                    //         </PaginationItem>


                    // })};