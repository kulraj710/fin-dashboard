import datetime as dt

from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

def convert_timeframe_to_datetime(time_str):
    current_date = datetime.now()

    value = int(time_str[:-1])
    unit = time_str[-1]

    if unit == 'd':
        # Subtract days
        result_date = current_date - timedelta(days=value)
    elif unit == 'm':
        # Subtract months
        result_date = current_date - relativedelta(months=value)
    elif unit == 'y':
        # Subtract years
        result_date = current_date - relativedelta(years=value)
    else:
        raise ValueError("Invalid time unit. Use 'd' for days, 'm' for months, or 'y' for years.")
    
    return result_date    