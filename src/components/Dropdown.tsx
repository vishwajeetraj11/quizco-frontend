import {
  alpha,
  Button,
  Menu,
  MenuItem,
  MenuProps,
  styled,
} from "@material-ui/core";
import { Column, ColumnApi, GridApi } from "ag-grid-community";
import { Buffer } from "buffer";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import * as React from "react";
import { GoChevronDown } from "react-icons/go";
import { GrDocumentCsv } from "react-icons/gr";
import { SiMicrosoftexcel } from "react-icons/si";
import { VscFilePdf } from "react-icons/vsc";
import * as xlsx from "xlsx";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface Props {
  selected: string[];
  gridApi: GridApi | undefined;
  gridColumnApi?: ColumnApi;
  excludedColumns?: string[];
  quizId?: string;
}

export const DownloadButton: React.FC<Props> = ({
  selected,
  gridApi,
  gridColumnApi,
  excludedColumns,
  quizId,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const downloadCSV = () => {
    const columnDefinitions = gridApi?.getColumnDefs();

    const columnKeys: string[] = [];

    columnDefinitions?.forEach((el: any) => {
      if (excludedColumns?.includes(el.field)) return;
      columnKeys.push(el.field);
    });

    gridApi?.exportDataAsCsv({
      onlySelected: !!selected.length,
      columnKeys,
      fileName: `quiz_csv_${quizId}`,
    });
  };

  const getDocDefinition = (
    printParams: any,
    agGridApi: GridApi | undefined,
    agGridColumnApi: ColumnApi | undefined,
    excludedColumns?: string[]
  ) => {
    const {
      PDF_HEADER_COLOR,
      PDF_INNER_BORDER_COLOR,
      PDF_OUTER_BORDER_COLOR,
      PDF_ODD_BKG_COLOR,
      PDF_EVEN_BKG_COLOR,
      PDF_HEADER_HEIGHT,
      PDF_ROW_HEIGHT,
      PDF_PAGE_ORITENTATION,
      PDF_WITH_CELL_FORMATTING,
      PDF_SELECTED_ROWS_ONLY,
    } = printParams;

    return (function () {
      const columnGroupsToExport = getColumnGroupsToExport();

      const columnsToExport = getColumnsToExport();

      const widths = getExportedColumnsWidths(columnsToExport);

      const rowsToExport = getRowsToExport(columnsToExport);

      const body = columnGroupsToExport
        ? [columnGroupsToExport, columnsToExport, ...rowsToExport]
        : [columnsToExport, ...rowsToExport];

      const headerRows = columnGroupsToExport ? 2 : 1;

      // const header = PDF_WITH_HEADER_IMAGE
      //     ? {
      //         image: 'ag-grid-logo',
      //         width: 150,
      //         alignment: 'center',
      //         margin: [0, 10, 0, 10],
      //     }
      //     : undefined;

      /* const footer = PDF_WITH_FOOTER_PAGE_COUNT
             ? function (currentPage: any, pageCount: any) {
                 return {
                     text: currentPage.toString() + ' of ' + pageCount,
                     margin: [20],
                 };
             }
             : null;*/

      // const pageMargins = [
      //     10, 20,
      //     // PDF_WITH_HEADER_IMAGE ? 70 : 20,
      //     10, 20
      //     // PDF_WITH_FOOTER_PAGE_COUNT ? 40 : 10,
      // ];

      const pageMargins: [number, number, number, number] = [10, 20, 10, 20];

      const heights = (rowIndex: number) =>
        rowIndex < headerRows ? PDF_HEADER_HEIGHT : PDF_ROW_HEIGHT;

      const fillColor = (rowIndex: number, node: any, columnIndex: number) => {
        if (node?.table?.headerRows && rowIndex < node?.table?.headerRows) {
          return PDF_HEADER_COLOR;
        }
        return rowIndex % 2 === 0 ? PDF_ODD_BKG_COLOR : PDF_EVEN_BKG_COLOR;
      };

      const hLineWidth = (i: number, node: any) => 1;

      const vLineWidth = (i: number, node: any) =>
        i === 0 || i === node?.table?.widths?.length ? 1 : 0;

      const hLineColor = (i: number, node: any) =>
        i === 0 || i === node.table.body.length
          ? PDF_OUTER_BORDER_COLOR
          : PDF_INNER_BORDER_COLOR;

      const vLineColor = (i: number, node: any) =>
        i === 0 || i === node?.table?.widths?.length
          ? PDF_OUTER_BORDER_COLOR
          : PDF_INNER_BORDER_COLOR;

      const docDefintiion: any = {
        pageOrientation: PDF_PAGE_ORITENTATION,
        content: [
          {
            style: "myTable",
            table: {
              headerRows,
              widths,
              body,
              heights,
            },
            layout: {
              fillColor,
              hLineWidth,
              vLineWidth,
              hLineColor,
              vLineColor,
            },
          },
        ],
        styles: {
          myTable: {
            margin: [0, 0, 0, 0],
          },
          tableHeader: {
            bold: true,
            margin: [0, PDF_HEADER_HEIGHT / 3, 0, 0],
          },
          tableCell: {
            // margin: [0, 15, 0, 0]
          },
        },
        pageMargins,
      };

      return docDefintiion;
    })();

    function getColumnGroupsToExport() {
      const displayedColumnGroups: any[] | null | undefined =
        agGridColumnApi?.getAllDisplayedColumnGroups();

      const isColumnGrouping = displayedColumnGroups?.some((col: any) =>
        col.hasOwnProperty("children")
      );

      if (!isColumnGrouping) {
        return null;
      }

      const columnGroupsToExport: any = [];

      displayedColumnGroups?.forEach((colGroup: any) => {
        const isColSpanning = colGroup.children.length > 1;
        let numberOfEmptyHeaderCellsToAdd = 0;

        if (isColSpanning) {
          const headerCell = createHeaderCell(colGroup);
          columnGroupsToExport.push(headerCell);
          // subtract 1 as the column group counts as a header
          numberOfEmptyHeaderCellsToAdd--;
        }

        // add an empty header cell now for every column being spanned
        colGroup.displayedChildren.forEach((childCol: any) => {
          const pdfExportOptions = getPdfExportOptions(childCol.getColId());
          if (!pdfExportOptions || !pdfExportOptions.skipColumn) {
            numberOfEmptyHeaderCellsToAdd++;
          }
        });

        for (let i = 0; i < numberOfEmptyHeaderCellsToAdd; i++) {
          columnGroupsToExport.push({});
        }
      });

      return columnGroupsToExport;
    }

    function getColumnsToExport() {
      const columnsToExport: any = [];

      agGridColumnApi?.getAllDisplayedColumns().forEach((col: Column) => {
        const pdfExportOptions = getPdfExportOptions(col.getColId());
        const colId = col.getColId();
        if (excludedColumns?.includes(colId)) {
          return;
        }
        if (pdfExportOptions && pdfExportOptions.skipColumn) {
          return;
        }
        const headerCell = createHeaderCell(col);
        columnsToExport.push(headerCell);
      });

      return columnsToExport;
    }

    function getRowsToExport(columnsToExport: any) {
      const rowsToExport: any = [];

      agGridApi?.forEachNodeAfterFilterAndSort((node) => {
        if (PDF_SELECTED_ROWS_ONLY && !node.isSelected()) {
          return;
        }
        const rowToExport = columnsToExport.map(({ colId }: any) => {
          const cellValue = agGridApi.getValue(colId, node);
          const tableCell = createTableCell(cellValue, colId);
          return tableCell;
        });
        rowsToExport.push(rowToExport);
      });

      return rowsToExport;
    }

    function getExportedColumnsWidths(columnsToExport: any) {
      return columnsToExport.map(() => 100 / columnsToExport.length + "%");
    }

    function createHeaderCell(col: any) {
      const headerCell: any = {};

      const isColGroup = col.hasOwnProperty("children");

      if (isColGroup) {
        headerCell.text = col.originalColumnGroup.colGroupDef.headerName;
        headerCell.colSpan = col.children.length;
        headerCell.colId = col.groupId;
      } else {
        let headerName = col.colDef.headerName;

        if (col.sort) {
          headerName += ` (${col.sort})`;
        }
        if (col.filterActive) {
          headerName += ` [FILTERING]`;
        }

        headerCell.text = headerName;
        headerCell.colId = col.getColId();
      }

      headerCell["style"] = "tableHeader";

      return headerCell;
    }

    function createTableCell(cellValue: any, colId: any) {
      const tableCell: any = {
        text: cellValue !== undefined ? cellValue : "",
        style: "tableCell",
      };

      const pdfExportOptions = getPdfExportOptions(colId);

      if (pdfExportOptions) {
        const { styles } = pdfExportOptions;

        if (PDF_WITH_CELL_FORMATTING && styles) {
          Object.entries(styles).forEach(
            ([key, value]: any) => (tableCell[key] = value)
          );
        }
      }

      return tableCell;
    }

    function getPdfExportOptions(colId: any) {
      const col: any = agGridColumnApi?.getColumn(colId);
      return col.colDef.pdfExportOptions;
    }
  };

  const printDoc = (
    printParams: any,
    gridApi: GridApi | undefined,
    columnApi: ColumnApi | undefined,
    excludedColumns?: string[]
  ) => {
    const docDefinition = getDocDefinition(
      printParams,
      gridApi,
      columnApi,
      excludedColumns
    );
    pdfMake.createPdf(docDefinition).download(`quiz_pdf_${quizId}`);
  };

  const downloadPDF = () => {
    const isAnyRowSelected = gridApi?.getSelectedRows();

    const printParams = {
      PDF_HEADER_COLOR: "#f8f8f8",
      PDF_INNER_BORDER_COLOR: "#dde2eb",
      PDF_OUTER_BORDER_COLOR: "#babfc7",
      PDF_PAGE_ORITENTATION: "landscape",
      PDF_HEADER_HEIGHT: 25,
      PDF_ROW_HEIGHT: 15,
      PDF_ODD_BKG_COLOR: "#fcfcfc",
      PDF_EVEN_BKG_COLOR: "#fff",
      PDF_WITH_CELL_FORMATTING: true,
      PDF_SELECTED_ROWS_ONLY: !!isAnyRowSelected?.length,
    };
    printDoc(printParams, gridApi, gridColumnApi, excludedColumns);
  };

  const downloadExcel = () => {
    const columnDefinitions = gridApi?.getColumnDefs();

    // Remove the column having checkboxes
    columnDefinitions?.shift();

    const columnKeys: string[] = [];

    columnDefinitions?.forEach((el: any) => {
      if (excludedColumns?.includes(el.field)) return;
      columnKeys.push(el.field);
    });

    const blob: string | undefined = gridApi?.getDataAsCsv({
      onlySelected: !!selected.length,
      columnKeys,
    });

    if (blob) {
      const arrayOfArrayCsv = blob
        .toString()
        .split("\n")
        .map((row: string) => {
          row = row.replaceAll('"', "");
          row = row.replaceAll("\r", "");
          return row.split(",");
        });

      const wb = xlsx.utils.book_new();
      const newWs = xlsx.utils.aoa_to_sheet(arrayOfArrayCsv);
      xlsx.utils.book_append_sheet(wb, newWs);
      const rawExcel = xlsx.write(wb, { type: "base64" });
      const file = Buffer.from(rawExcel, "base64");

      const excelFile = new Blob([file], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const a = document.createElement("a");
      a.download = `quiz_excel_${quizId}`;
      a.href = window.URL.createObjectURL(excelFile);
      a.click();
    }
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        color="primary"
        disableElevation
        onClick={handleClick}
        endIcon={<GoChevronDown />}
      >
        Download
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={downloadExcel} disableRipple>
          <SiMicrosoftexcel />
          <p className="ml-2 text-sm">Excel</p>
        </MenuItem>
        <MenuItem onClick={downloadCSV} disableRipple>
          <GrDocumentCsv />
          <p className="ml-2 text-sm">CSV</p>
        </MenuItem>
        <MenuItem onClick={downloadPDF} disableRipple>
          <VscFilePdf />
          <p className="ml-2 text-sm">PDF</p>
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(6),
    minWidth: 180,
    boxShadow: "0 5px 20px rgba(0,0,0,0.07)",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
