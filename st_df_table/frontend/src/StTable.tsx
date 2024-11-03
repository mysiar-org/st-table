import React, {useEffect, useRef} from "react";
import {Streamlit, withStreamlitConnection} from "streamlit-component-lib";
import BootstrapTable, {ColumnDescription,} from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

interface Props {
    args: any;
}


const StTable: React.FC<Props> = (props) => {

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
        pagination_bar_height,
        pagination_text_color,
        pagination_bg_color,
        pagination_border_color,
        pagination_active_color,
        pagination_active_border_color,
        pagination_active_bg_color,
        pagination_hover_color,
        pagination_hover_bg_color,
        pagination_show_total,
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
        const adjustHeight = () => {
            if (tableRef.current) {
                const height = tableRef.current.offsetHeight;
                Streamlit.setFrameHeight(height);
            }
        };

        adjustHeight();
        window.addEventListener('resize', adjustHeight);

        return () => window.removeEventListener('resize', adjustHeight);
    }, []);


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
                     line-height: ${pagination_bar_height}px !important;
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
                    line-height: ${pagination_bar_height}px !important;
                }
            `}</style>
            <BootstrapTable
                bootstrap4
                keyField="id"
                data={data}
                columns={columns}
                wrapperClasses="custom-border"
                bordered={bordered}
                pagination={paginated ? paginationFactory({
                    page: 1,
                    sizePerPage: pagination_size_per_page,
                    paginationSize: pagination_bar_size,
                    hideSizePerPage: true,
                    withFirstAndLast: true,
                    showTotal: pagination_show_total,
                }) : undefined}
            />
        </div>
    );
};

export default withStreamlitConnection(StTable);


