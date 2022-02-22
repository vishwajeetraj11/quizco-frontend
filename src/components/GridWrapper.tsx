import {
  ColDef,
  ColumnApi,
  GridApi,
  GridReadyEvent,
  RowSelectedEvent,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";

interface Props {
  list: any[];
  colDefs: ColDef[];
  loading: boolean;
  setSelected?: React.Dispatch<React.SetStateAction<string[]>>;
  setGridApiParent?: React.Dispatch<React.SetStateAction<GridApi | undefined>>;
  setGridColApiParent?: React.Dispatch<
    React.SetStateAction<ColumnApi | undefined>
  >;
}

export const GridWrapper: React.FC<Props> = ({
  colDefs,
  list,
  loading,
  setGridApiParent,
  setGridColApiParent,
  setSelected,
}) => {
  const [gridApi, setGridApi] = useState<GridApi>();
  const onRowSelection = (event: RowSelectedEvent) => {
    const node = event.node;
    const rowData = event.data;
    const status = node.isSelected();
    if (status) {
      setSelected && setSelected((p) => p.concat(rowData.id));
    } else {
      setSelected &&
        setSelected((p) =>
          p.filter((id: string) => {
            return id !== rowData.id;
          })
        );
    }
  };

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    // setGridColumnApi(params.columnApi);
    setGridApiParent && setGridApiParent(params.api);
    setGridColApiParent && setGridColApiParent(params.columnApi);

    const allColumnIds: any = [];
    params.columnApi.getAllColumns()?.forEach((column: any) => {
      allColumnIds.push(column.colId);
    });
    params.columnApi.autoSizeColumns(allColumnIds, false);
  };

  useEffect(() => {
    if (loading) {
      gridApi?.showLoadingOverlay();
    } else if (!list.length) {
      gridApi?.showNoRowsOverlay();
    } else {
      gridApi?.hideOverlay();
    }
  }, [loading, gridApi, list.length]);
  return (
    <div
      className={`ag-theme-alpine flex items-center justify-center flex-1`}
      style={{ height: "85vh", width: "100%" }}
    >
      <AgGridReact
        containerStyle={{
          width: "100%",
        }}
        onGridReady={onGridReady}
        onRowSelected={onRowSelection}
        columnDefs={colDefs}
        rowData={list}
        suppressColumnVirtualisation
        defaultColDef={{ resizable: true }}
        rowSelection={"multiple"}
      />
    </div>
  );
};
