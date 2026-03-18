import {
  ColDef,
  ColumnApi,
  GridApi,
  GridSizeChangedEvent,
  GridReadyEvent,
  RowSelectedEvent,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useState } from "react";

interface Props {
  list: any[];
  colDefs: ColDef[];
  loading: boolean;
  setSelected?: React.Dispatch<React.SetStateAction<string[]>>;
  setGridApiParent?: React.Dispatch<React.SetStateAction<GridApi | undefined>>;
  setGridColApiParent?: React.Dispatch<
    React.SetStateAction<ColumnApi | undefined>
  >;
  fitColumns?: boolean;
}

export const GridWrapper: React.FC<Props> = ({
  colDefs,
  fitColumns = false,
  list,
  loading,
  setGridApiParent,
  setGridColApiParent,
  setSelected,
}) => {
  const [gridApi, setGridApi] = useState<GridApi>();
  const [columnApi, setColumnApi] = useState<ColumnApi>();

  const syncColumnWidths = useCallback(
    (currentGridApi?: GridApi, currentColumnApi?: ColumnApi) => {
      if (!currentGridApi || !currentColumnApi) {
        return;
      }

      if (fitColumns) {
        currentGridApi.sizeColumnsToFit();
        return;
      }

      const allColumnIds: string[] = [];
      currentColumnApi.getAllColumns()?.forEach((column) => {
        allColumnIds.push(column.getColId());
      });
      currentColumnApi.autoSizeColumns(allColumnIds, false);
    },
    [fitColumns]
  );

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
    setColumnApi(params.columnApi);
    setGridApiParent && setGridApiParent(params.api);
    setGridColApiParent && setGridColApiParent(params.columnApi);
    syncColumnWidths(params.api, params.columnApi);
  };

  const onGridSizeChanged = (params: GridSizeChangedEvent) => {
    syncColumnWidths(params.api, params.columnApi);
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

  useEffect(() => {
    syncColumnWidths(gridApi, columnApi);
  }, [columnApi, gridApi, list.length, syncColumnWidths]);

  return (
    <div
      className="ag-theme-alpine flex flex-1 items-center justify-center min-w-0"
      style={{ height: "85vh", width: "100%" }}
    >
      <AgGridReact
        containerStyle={{
          width: "100%",
        }}
        onGridReady={onGridReady}
        onGridSizeChanged={onGridSizeChanged}
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
