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

  state = {
    currentPage: 1,
    totalPages: null,
    pageNeighbours: null
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
   // console.log('---gotopage---', page)
    this.gotoPage(page);
  };


  handleMoveLeft = evt => {
    evt.preventDefault();
    const { pageNeighbours } = this.props;
    //console.log('---LEFT to GO---', this.state.currentPage - pageNeighbours * 2 - 1);
    this.gotoPage(this.state.currentPage - pageNeighbours * 2 - 1);
  };

  handleMoveRight = evt => {
    evt.preventDefault();
    const { pageNeighbours } = this.props;
   // console.log('---RIGHT to GO---', this.state.currentPage + pageNeighbours * 2 + 1);
    this.gotoPage(this.state.currentPage + pageNeighbours * 2 + 1);
  };

  getPager = () => {
    const { totalPages, currentPage, pageNeighbours } = this.props;

    const totalNumbers = pageNeighbours * 2 + 3;
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

  render() {
    const { currentPage } = this.props;
   // console.log('---Pagination props---', this.props);
    const pages = this.getPager();
    console.log('pages', pages);

    const pageList = (
      (pages.length>0)?
      (pages.map(page => (
        (page === LEFT_PAGE) ? (
          <PaginationItem key={page}>
            <PaginationLink previous tag="button" onClick={e => this.handleMoveLeft(e)} />
          </PaginationItem>) :
          ((page === RIGHT_PAGE) ?
            (
              <PaginationItem key={page}>
                <PaginationLink next tag="button" onClick={e => this.handleMoveRight(e)} />
              </PaginationItem>
            ) :
            <PaginationItem key={page} className={`page-item${currentPage === page ? " active" : ""}`} >
              <PaginationLink tag="button" onClick={e => this.handleClick(page, e)}>
                {page}
              </PaginationLink>
            </PaginationItem>)
      ))):(<h4 > Результат пошуку відсутній</h4>)
      );
    return (
      <React.Fragment>
        <Form >
          <Pagination>
            {pageList}
          </Pagination>
        </Form>
      </React.Fragment>

    );
  }
}

export default PaginationBar;
