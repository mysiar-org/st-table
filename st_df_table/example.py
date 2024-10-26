import numpy as np
import pandas as pd
import streamlit as st
import string

from st_df_table import st_table

st.set_page_config(layout="wide", page_title="st_df_table.st_table")

data = {
    "Column A": [1, 2, 3, 4, 5, 6],
    "Column B": ["A", "B", "C", "F", "G", "H"],
    "Column C": [True, False, True, False, True, False],
}

df = pd.DataFrame(data)

st.title("st_df_table.st_table - custom DataFrame display")
st.subheader("Default")
st_table(df)
st.subheader("Align left, head color, head text color, head font weight 'normal'")
st_table(
    df,
    head_align="left",
    data_align="left",
    head_bg_color="red",
    head_color="blue",
    head_font_weight="normal",
    border_color="red",
    border_width=3,
    key="left",
)
st.subheader(
    "Align right, data color, data text color, data font weight 'bold', no border, columns not 'sortable', table width"
)

data = {
    "Column A": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "Column C": [True, False, True, False, True, False, False, True, False, True],
    "Column B": ["A", "B", "C", "F", "G", "H", "I", "J", "K", "L"],
}

df = pd.DataFrame(data)

st_table(
    df,
    head_align="right",
    data_align="right",
    data_bg_color="green",
    data_color="yellow",
    data_font_weight="bold",
    bordered=False,
    sortable=False,
    table_width=500,
    key="right",
)

st.subheader("Align left, head color, head text color, head font weight 'normal'")
st_table(
    df,
    head_align="left",
    data_align="left",
    head_bg_color="red",
    head_color="blue",
    head_font_weight="normal",
    border_color="red",
    border_width=3,
    font="monospace",
    font_size=14,
    key="left2",
)

st.subheader("Pagination")
df = pd.DataFrame(
    {
        "Column A": list(range(1, 101)),
        "Column B": np.random.choice(list(string.ascii_uppercase), size=100),
        "Column C": np.random.rand(100),
    }
)

st_table(
    df,
    border_width=4,
    border_color="red",
    paginated=True,
    pagination_size_per_page=7,
    pagination_bar_size=4,
    pagination_text_color="blue",
    pagination_bg_color="yellow",
    pagination_border_color="green",
    pagination_active_color="yellow",
)
