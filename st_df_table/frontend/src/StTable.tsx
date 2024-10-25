import React, {useEffect} from "react";
import {Streamlit, withStreamlitConnection} from "streamlit-component-lib";
import BootstrapTable, {ColumnDescription} from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

interface Props {
    args: any;
}

const StTable: React.FC<Props> = (props) => {
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
        const tableHeight = (data.length + 1) * (font_size * 1.5 + border_width + 2 * 8) + 2 * border_width
        Streamlit.setFrameHeight(tableHeight);
    }, [data, border_width, font_size]);

    return (
        <div style={table_width ? {width: table_width} : {}}>
            <style>{`
                .custom-border.react-bootstrap-table,
                .custom-border.react-bootstrap-table table {
                border: ${border_width}px ${border_color} solid !important;
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
        `}</style>

            <BootstrapTable
                keyField='id'
                data={data}
                columns={columns}
                wrapperClasses="custom-border"
                bordered={bordered}
            />
        </div>
    );
};

export default withStreamlitConnection(StTable);
