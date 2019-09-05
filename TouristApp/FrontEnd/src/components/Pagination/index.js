import React, { Component } from 'react';
import { Form, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import PropTypes from 'prop-types';


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
  
    state = {
        currentPage: 1,
        totalPages: null,
        pageNeighbours:null
    };

    gotoPage = page => {
        const { onPageChanged = f => f } = this.props;
        this.setState({ currentPage: page }, () => onPageChanged(page));
    };

    componentDidMount() {
        this.gotoPage(1);
    }


    handleClick = (page, evt) => {
        evt.preventDefault();
        console.log('---gotopage---', page)
        this.gotoPage(page);
    };


    handleMoveLeft = evt => {
        evt.preventDefault();
        const {pageNeighbours}=this.props;
        console.log('---LEFT to GO---',this.state.currentPage - pageNeighbours * 2 - 1);
        this.gotoPage(this.state.currentPage - pageNeighbours * 2 - 1);
    };

    handleMoveRight = evt => {
        evt.preventDefault();
        const {pageNeighbours}=this.props;
        console.log('---RIGHT to GO---',this.state.currentPage + pageNeighbours * 2 + 1);
        this.gotoPage(this.state.currentPage + pageNeighbours * 2 + 1);
    };

    getPager = () => {
        const{totalPages,currentPage,pageNeighbours}=this.props;
       
        const totalNumbers = pageNeighbours * 2 + 3;
        const totalBlocks = totalNumbers + 2;

       
        if (totalPages > totalBlocks) {
            let pages = [];

        // create an array of pages to ng-repeat in the pager control
       // var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

            return [1, ...pages, totalPages];
        }
        return range(1, totalPages);
    };



    handleClick = (page, evt) => {
        evt.preventDefault();
        console.log('---gotopage---', page)
        this.gotoPage(page);
    };


            return [1, ...pages, totalPages];
        }
        return range(1, totalPages);
    };

    render() {
        const { currentPage} = this.props;
        console.log('---Pagination props---', this.props);
           const pages = this.getPager();
        console.log('pages', pages);

        const pageList = (
            pages.map(page => (
                   (page === LEFT_PAGE) ?  (
                                <PaginationItem  key={page}>
                                    <PaginationLink previous tag="button" onClick={e => this.handleMoveLeft(e)} />
                                </PaginationItem> ):
                   ( (page === RIGHT_PAGE) ?                 
                            (
                                <PaginationItem  key={page}>
                                    <PaginationLink next tag="button" onClick={e => this.handleMoveRight(e)} />
                                </PaginationItem>
                        ):
                             <PaginationItem key={page} className={`page-item${currentPage === page ? " active" : ""}`} >
                                <PaginationLink tag="button" onClick={e => this.handleClick(page, e)}>
                                    {page}
                                </PaginationLink>
                            </PaginationItem>)
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

PaginationBar.propTypes =
  {
    currentPage: PropTypes.number.isRequired,
    pageNeighbours: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired
  }


export default PaginationBar;
