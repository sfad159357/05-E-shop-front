import {useState, useEffect} from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

export default function Table(props) {
  
  const [isLarge, setLarge] = useState(true)

  const adjust = () => {
    if (window.innerWidth < 568 && isLarge) {
      setLarge(false);
      console.log('setLarge(false)', window.innerWidth, isLarge)
    }
    if (window.innerWidth > 568 && !isLarge)
    {
      setLarge(true);
      console.log('setLarge(true)', window.innerWidth, isLarge)
    }
  }

  useEffect(() => {
    if (window.innerWidth < 568) {
      setLarge(false)
      console.log('useEffect',window.innerWidth)
    }
  }, [])
    console.log('isLarge', window.innerWidth ,isLarge)

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
