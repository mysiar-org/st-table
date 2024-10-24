# Streamlit dataframe display
alternative to `st.table` with configuration



## Installation instructions

```sh
pip install st-table
```

## Usage instructions

```python

import pandas as pd
from st_table import st_table

data = {
    "Column A": [1, 2, 3, 4, 5, 6],
    "Column C": [True, False, True, False, True, False],
    "Column B": ["A", "B", "C", "F", "G", "H"],
}

df = pd.DataFrame(data)
st_table(df)

```
![table-1](doc/table1.png)

```python
st_table(
    df,
    head_align="left",
    data_align="left",
    head_bg_color="red",
    head_color="blue",
    head_font_weight="normal",
    border_color="red",
    border_width="3",
)
```
![table-3](doc/table2.png)

```python
st_table(
    df,
    head_align="right",
    data_align="right",
    data_bg_color="green",
    data_color="yellow",
    data_font_weight="bold",
    bordered=False,
    sortable=False,
)
```
![table-3](doc/table3.png)
