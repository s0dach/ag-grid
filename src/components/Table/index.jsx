import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { useState, useRef, useCallback } from "react";
import { createCars } from "../createCars";
import classes from "./Table.module.css";

export const Table = () => {
  let cars = createCars;
  const gridRef = useRef();
  const [rowData, setRowData] = useState(createCars);
  const [columnDefs] = useState([
    {
      maxWidth: 50,
      rowDrag: (params) => (params.data.id !== 1 ? true : false),
    },
    {
      headerName: "Название",
      field: "type",
      checkboxSelection: true,
    },
    { headerName: "Год выпуска", field: "year" },
    { headerName: "Цвет", field: "color" },
    {
      headerName: "Цена",
      field: "price",
    },
  ]);

  const getRowId = useCallback((params) => {
    return params.data.id;
  });
  const onRemove = useCallback(() => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedIds = selectedNodes.map((node) => node.data.id);
    cars = cars.filter((car) => selectedIds.indexOf(car.id) < 0);
    setRowData(cars);
  });

  const defaultColDef = {
    sortable: true,
    editable: true,
    filter: true,
    flex: 1,
    floatingFilter: true,
    columnGroupShow: "open",
  };
  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
      <div>
        <button className={classes.mybtn}>Добавить</button>
        <button className={classes.mybtn} onClick={onRemove}>
          Удалить выбранное
        </button>
      </div>
      <AgGridReact
        ref={gridRef}
        asyncTransactionWaitMillis={5000}
        getRowId={getRowId}
        rowSelection={"multiple"}
        rowData={rowData}
        animateRows={true}
        rowDragMultiRow={true}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowDragManaged={true}
      />
    </div>
  );
};
