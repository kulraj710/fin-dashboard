from werkzeug.exceptions import HTTPException

class NoTickerFoundException(HTTPException):
    def handle_507():
        code = 507
        description = 'Incorrect ticker symbol.'

