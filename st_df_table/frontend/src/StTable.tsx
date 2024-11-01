import React, {useEffect, useRef} from "react";
import {Streamlit, withStreamlitConnection} from "streamlit-component-lib";
import BootstrapTable, {ColumnDescription, RowEventHandlerProps} from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

interface Props {
    args: any;
}

const StTable: React.FC<Props> = (props) => {
    const pagination_line_height = 10;
    const padding = 8;
    const pagination_extra_table_height = 54;

    const {args} = props;
    const {
        head_align,
        data_align,
        head_bg_color,
        data_bg_color,
        head_color,
        data_color,
        head_font_weight,
        data_font_weight,
        border_color,
        bordered,
        table_width,
        sortable,
        font,
        font_size,
        paginated,
        pagination_size_per_page,
        pagination_bar_size,
        pagination_text_color,
        pagination_bg_color,
        pagination_border_color,
        pagination_active_color,
        pagination_active_border_color,
        pagination_active_bg_color,
        pagination_hover_color,
        pagination_hover_bg_color,
        vertical_alignment,
        data,
    } = args;

    let {
        border_width,
    } = args;

    if (!bordered) {
        border_width = 0
    }

    const tableRef = useRef<HTMLDivElement | null>(null);

    const columns: ColumnDescription[] = args.columns.map((col: ColumnDescription) => ({
        ...col,
        sort: sortable,
        headerStyle: {
            textAlign: head_align,
            backgroundColor: head_bg_color,
            color: head_color,
            fontWeight: head_font_weight,
            fontFamily: font,
            fontSize: font_size,
            verticalAlign: vertical_alignment,
        },
        style: {
            textAlign: col.align || data_align,
            backgroundColor: data_bg_color,
            color: data_color,
            fontWeight: data_font_weight,
            fontFamily: font,
            fontSize: font_size,
            whiteSpace: 'normal',  // Allows wrapping of content
            wordWrap: 'break-word',
            verticalAlign: vertical_alignment,
        }
    }));

    useEffect(() => {
        if (tableRef.current) {
            const headerHeight = tableRef.current.querySelector('thead')?.offsetHeight || 0;
            const paginationHeight = paginated ? pagination_extra_table_height : 0;

            const rowHeights = Array.from(
                tableRef.current.querySelectorAll("tbody tr")
            ).map(row => (row as HTMLTableRowElement).offsetHeight);

            const totalRowHeight = rowHeights
                .slice(0, pagination_size_per_page)
                .reduce((acc: number, height: number) => acc + height, 0);

            const totalHeight = totalRowHeight + headerHeight + paginationHeight + padding;
            Streamlit.setFrameHeight(totalHeight);
        }
    }, [data, pagination_size_per_page, paginated]);

    const rowStyle = (_: any, rowIndex: number): React.CSSProperties => ({
        backgroundColor: rowIndex % 2 === 0 ? data_bg_color : "",
        textAlign: data_align,
    });

    const rowEvents: RowEventHandlerProps<any> = {
        onMouseEnter: (e, row, rowIndex) => {
            if (rowIndex !== undefined) {
                const target = e.currentTarget as HTMLTableRowElement;
                target.style.backgroundColor = "#f0f0f0"; // Optional: example on-hover styling
            }
        }
    };

    return (
        <div ref={tableRef} style={table_width ? {width: table_width} : {}}>
            <style>{`
                .custom-border.react-bootstrap-table th,
                .custom-border.react-bootstrap-table td {
                    border: ${border_width}px ${border_color} solid !important;
                }
                react-bootstrap-table td,
                react-bootstrap-table th {
                    font-family: ${font} !important;
                    font-size: ${font_size}px !important;
                }
                .pagination {
                     margin-top: 5px;
                     line-height: ${pagination_line_height}px !important;
                     justify-content: left !important;
                     --bs-pagination-color: ${pagination_text_color} !important; 
                     --bs-pagination-bg: ${pagination_bg_color} !important; 
                     --bs-pagination-border-color: ${pagination_border_color} !important;
                     --bs-pagination-border-radius: 0 !important;
                     font-family: ${font} !important;
                     font-size: ${font_size}px !important;
                }
                .pagination .page-item.active .page-link {
                    background-color: ${pagination_active_bg_color} !important;
                    border-color: ${pagination_active_border_color} !important;
                    color: ${pagination_active_color} !important;
                }
                .pagination .page-item .page-link {
                    color: ${pagination_text_color} !important;
                     box-shadow: none !important;                     
                     outline: none !important;
                     font-family: ${font} !important;
                    font-size: ${font_size}px !important;                     

                }
                .pagination .page-item .page-link:hover {
                    background-color: ${pagination_hover_bg_color} !important;
                    color: ${pagination_hover_color} !important;
                    border-color: ${pagination_active_border_color} !important;
                    font-family: ${font} !important;
                    font-size: ${font_size}px !important;
                }
                .pagination {
                    margin-top: 5px;
                    line-height: ${pagination_line_height}px !important;
                }
            `}</style>
            <BootstrapTable
                keyField="id"
                data={data}
                columns={columns}
                wrapperClasses="custom-border"
                bordered={bordered}
                rowStyle={rowStyle}
                rowEvents={rowEvents}
                pagination={paginated ? paginationFactory({
                    page: 1,
                    sizePerPage: pagination_size_per_page,
                    paginationSize: pagination_bar_size,
                    hideSizePerPage: true,
                }) : undefined}
            />
        </div>
    );
};

export default withStreamlitConnection(StTable);
