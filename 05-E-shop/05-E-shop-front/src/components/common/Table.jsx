import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

export default function Table(props) {
  return (
    <table className="table table-striped mt-4 md-4">
      <TableHeader
        isSimpleHeader={props.isSimpleHeader}
        columns={props.columns}
        onSort={props.onSort}
        sortedColumn={props.sortedColumn}
      />
      <TableBody items={props.items} columns={props.columns} />
    
    </table>
  );
}
