def identify_column_types(df):
    column_types = {}
    
    for column in df.columns:
        unique_values = df[column].dropna().unique()
        num_unique_values = len(unique_values)
        num_total_values = len(df[column])
        dtype = df[column].dtype
        
        if dtype == 'object':
            if num_unique_values == 2:
                column_types[column] = 'Binary'
            elif pd.to_datetime(df[column], errors='coerce', format='%Y-%m-%d %H:%M:%S').notnull().all():
                column_types[column] = 'Time Series'
            else:
              if is_categorical(df[column]):
                column_types[column] = 'Categorical'
              else:
                  column_types[column] = 'Text'
        elif pd.api.types.is_numeric_dtype(dtype):
            column_types[column] = 'Numerical'
        elif pd.api.types.is_datetime64_any_dtype(dtype):
            column_types[column] = 'Time Series'
            
        else:
            column_types[column] = 'Mixed'

    return column_types

def main(file_path):
    df = pd.read_csv(file_path)
    column_types = identify_column_types(df)
    
    for column, col_type in column_types.items():
        print(f"Column '{column}' is of type '{col_type}'.")

# Replace 'your_file.csv' with the path to your CSV file
main('timeseries.csv')
