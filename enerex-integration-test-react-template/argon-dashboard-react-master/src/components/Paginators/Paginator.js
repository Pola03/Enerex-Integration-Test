
import {
    Pagination,
    PaginationItem,
    PaginationLink
  } from "reactstrap";


const LeftPaginatorItem=({currentPage,setCurrentPage})=>{
  return (
    <PaginationItem className={(currentPage == 0)?"disabled":""}>
      <PaginationLink
        href="#pablo"
        onClick={(e) => {
          e.preventDefault();
          setCurrentPage(currentPage-1)}
        }
        tabIndex="-1"
      >
        <i className="fas fa-angle-left" />
        <span className="sr-only">Previous</span>
      </PaginationLink>
    </PaginationItem>
  )
  

}

const RightPaginatorItem=({currentPage,setCurrentPage,numberOfPages})=>{
  return (
    <PaginationItem className={(currentPage == numberOfPages-1)?"disabled":""}>
      <PaginationLink
        href="#pablo"
        onClick={(e) => {
          e.preventDefault();
          setCurrentPage(currentPage+1,numberOfPages-1)}
        }
      >
        <i className="fas fa-angle-right" />
        <span className="sr-only">Next</span>
      </PaginationLink>
    </PaginationItem>
  )
}

const EllipsisPaginatorItem = ({pageNumber,setCurrentPage})=> {
  return (
    <PaginationItem key={pageNumber}>
      <PaginationLink
        href="#pablo"
        onClick={(e) => {
          e.preventDefault();
          setCurrentPage(pageNumber); // Llama a la función de cambio de página
        }}
      >
        {"..."}
      </PaginationLink>
    </PaginationItem>
  )
}

const CustomPaginatorItem = ({pageNumber,currentPage,setCurrentPage})=> {
  const isActive = pageNumber === currentPage;
  return (
    <PaginationItem key={pageNumber} className={isActive ? "active" : ""}>
      <PaginationLink
        href="#pablo"
        onClick={(e) => {
          e.preventDefault();
          setCurrentPage(pageNumber); // Llama a la función de cambio de página
        }}
      >
        {pageNumber+1}
      </PaginationLink>
    </PaginationItem>
  )
}




const Paginator = ({currentPage,setCurrentPage,numberOfPages}) => {

  let paginationContent;

  if(numberOfPages<=5)
  {
    paginationContent = (
      <>
        {Array.from({ length: numberOfPages }, (_, i) => (
          <CustomPaginatorItem pageNumber={i} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        ))}
      </>
    );    
  }

  else if (currentPage < 4) {

    paginationContent = (
      <>
        {Array.from({ length: 5 }, (_, i) => (
          <CustomPaginatorItem pageNumber={i} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        ))}
        
        <EllipsisPaginatorItem pageNumber={currentPage+5} setCurrentPage={setCurrentPage}
        />
  
        <CustomPaginatorItem pageNumber={numberOfPages - 1} currentPage={currentPage} setCurrentPage={setCurrentPage}
        />
      </>
    );
  } else if (currentPage >= numberOfPages - 4) {

    paginationContent = (
      <>
        <CustomPaginatorItem pageNumber={0} currentPage={currentPage} setCurrentPage={setCurrentPage}
        />
  
        <EllipsisPaginatorItem pageNumber={currentPage-5} setCurrentPage={setCurrentPage}
        />
  
        {Array.from({ length: 5 }, (_, i) => (
          <CustomPaginatorItem pageNumber={numberOfPages - 5 + i} currentPage={currentPage} setCurrentPage={setCurrentPage}
          />
        ))}
      </>
    );
  } else {
    // Caso 3: estás en el medio
    paginationContent = (
      <>
        <CustomPaginatorItem pageNumber={0} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
  
        <EllipsisPaginatorItem pageNumber={currentPage-5} setCurrentPage={setCurrentPage}/>
  
        {Array.from({ length: 5 }, (_, i) => (
          <CustomPaginatorItem pageNumber={currentPage-2+i} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        ))}
  
        <EllipsisPaginatorItem pageNumber={currentPage+5} setCurrentPage={setCurrentPage}/>
  
        <CustomPaginatorItem pageNumber={numberOfPages - 1} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      </>
    );
  }

    return (
      <Pagination
      className="pagination justify-content-end mb-0"
      listClassName="justify-content-end mb-0"
      >
        <LeftPaginatorItem currentPage={currentPage} setCurrentPage={setCurrentPage}/>

        {paginationContent}
    
      <RightPaginatorItem currentPage={currentPage} setCurrentPage={setCurrentPage} numberOfPages={numberOfPages}/>
    </Pagination>
  
    )
  
  }

export default Paginator;

