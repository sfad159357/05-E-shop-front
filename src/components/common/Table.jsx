import {useState, useEffect} from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

export default function Table(props) {
  
  const [isLarge, setLarge] = useState(true)

  const adjust = () => {
    if (window.innerWidth < 568 && isLarge) {
      setLarge(false);
    }
    if (window.innerWidth > 568 && !isLarge)
    {
      setLarge(true);
    }
  }

  useEffect(() => {
    if (window.innerWidth < 568) {
      setLarge(false)
    }
  }, [])

  window.addEventListener('resize', adjust)

  return (
    <div className="table-responsive-sm">
      <table className="ptable">
        <TableHeader
          isLarge={isLarge}
          className={props.ptableClass}
          isSimpleHeader={props.isSimpleHeader}
          columns={props.columns}
          onSort={props.onSort}
          sortedColumn={props.sortedColumn}
          thNumber={props.items.length}
        />
        <TableBody
          isLarge={isLarge}
          items={props.items}
          columns={props.columns} />
      
        </table>
     </div>
  );
}

// table table-striped  mt-4 md-4
