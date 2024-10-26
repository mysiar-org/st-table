import React, {useEffect} from "react";
import {Streamlit, withStreamlitConnection} from "streamlit-component-lib";
import BootstrapTable, {ColumnDescription} from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

interface Props {
    args: any;
}

const StTable: React.FC<Props> = (props) => {
    const pagination_line_height: number = 10
    const padding: number = 8;
    const pagination_extra_table_height: number = 54


    const {args} = props;
    const head_align = args.head_align
    const data_align = args.data_align
    const head_bg_color = args.head_bg_color
    const data_bg_color = args.data_bg_color
    const head_color = args.head_color
    const data_color = args.data_color
    const head_font_weight = args.head_font_weight
    const data_font_weight = args.data_font_weight
    const bordered = args.bordered
    const border_color = args.border_color
    let border_width = args.border_width
    const table_width = args.table_width
    const sortable = args.sortable
    const font = args.font
    const font_size = args.font_size
    const paginated = args.paginated
    const pagination_size_per_page = args.pagination_size_per_page
    const pagination_bar_size = args.pagination_bar_size
    const pagination_text_color = args.pagination_text_color
    const pagination_bg_color = args.pagination_bg_color
    const pagination_border_color = args.pagination_border_color
    const pagination_active_color = args.pagination_active_color
    const pagination_active_border_color = args.pagination_active_border_color
    const pagination_active_bg_color = args.pagination_active_bg_color
    const pagination_hover_color = args.pagination_hover_color
    const pagination_hover_bg_color = args.pagination_hover_bg_color


    if (!bordered) {
        border_width = 0
    }

    const columns = args.columns.map((col: ColumnDescription) => ({
        ...col,
        sort: sortable,
        headerStyle: {
            textAlign: head_align,
            backgroundColor: head_bg_color,
            color: head_color,
            fontWeight: head_font_weight,
            fontFamily: font,
            fontSize: font_size,
        },
        style: {
            textAlign: col.align || data_align,
            backgroundColor: data_bg_color,
            color: data_color,
            fontWeight: data_font_weight,
            fontFamily: font,
            fontSize: font_size,
        }
    }));
    const data = args.data;


    useEffect(() => {
        let tableHeight;
        if (paginated) {
            tableHeight = pagination_extra_table_height
                + (pagination_size_per_page + 1) * (font_size * 1.5 + border_width + 2 * padding)
                + 2 * border_width
        } else {
            tableHeight = (data.length + 1) * (font_size * 1.5 + border_width + 2 * padding) + 3 * border_width

        }
        Streamlit.setFrameHeight(tableHeight);
    }, [data, border_width, font_size, padding, paginated, pagination_size_per_page, pagination_extra_table_height]);


    return (
        <div style={table_width ? {width: table_width} : {}}>
            <style>{`
                .custom-border.react-bootstrap-table,
                .custom-border.react-bootstrap-table table {
                    border: ${border_width}px ${border_color} solid !important;
                    margin-bottom: 0 !important;
                }
                .custom-border.react-bootstrap-table th,
                .custom-border.react-bootstrap-table td {
                    border: ${border_width}px ${border_color} solid !important;
                }
                .custom-font-family.react-bootstrap-table td,
                .custom-font-family.react-bootstrap-table th {
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

                }
                .pagination .page-item .page-link:hover {
                    background-color: ${pagination_hover_bg_color} !important;
                    color: ${pagination_hover_color} !important;
                    border-color: ${pagination_active_border_color} !important;
                }

        `}</style>
            <BootstrapTable
                keyField='id'
                data={data}
                columns={columns}
                wrapperClasses="custom-border"
                bordered={bordered}
                pagination={paginated ? paginationFactory(
                    {
                        page: 1,
                        sizePerPage: pagination_size_per_page,
                        paginationSize: pagination_bar_size,
                        hideSizePerPage: true,
                    }
                ) : undefined}
            />
        </div>
    );
};

export default withStreamlitConnection(StTable);
