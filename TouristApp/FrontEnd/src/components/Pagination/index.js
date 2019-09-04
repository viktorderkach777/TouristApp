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
        // const { totalPage = null, currentPage = 1, pageNeighbours = 0  } = this.props;
    }

    state = {
         currentPage: 1,
         totalPage:null   
        };

    gotoPage = page => {
       const { currentPage, totalPage, onPageChanged = f => f } = this.props;
       var pages = this.getPager(currentPage, totalPage);
       console.log('state pagination',this.state);
       this.setState({ currentPage:page }, () => onPageChanged(page));
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

    getPager = (currentPage, totalPages)=> {
        currentPage = currentPage || 1;
    
        // var totalItems=2;
        //if (totalPages <= 10) {
            // less than 10 total pages so show all
          //  startPage = 1;
         //   endPage = totalPages;
       // }
        // else
        // {
            // more than 10 total pages so calculate start and end pages
            // if (currentPage <= 6) {
            //     startPage = 1;
            //     endPage = 10;
            // } else if (currentPage + 4 >= totalPages) {
            //     startPage = totalPages - 9;
            //     endPage = totalPages;
            // } else {
            //     startPage = currentPage - 5;
            //     endPage = currentPage + 4;
            // }
      //   }

         const pages = [];
            if (totalPages !== null) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        }
        // calculate start and end item indexes
        // var startIndex = (currentPage - 1) * pageSize;
        // var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
       // var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return pages;
    }


    handleClick = (page, evt) => {
        evt.preventDefault();
        console.log('---gotopage---',page)
        this.gotoPage(page);
    };


    



    render() {
        const { currentPage, totalPage, onPageChanged = f => f } = this.props;
        const pages = this.getPager(currentPage,totalPage);
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