SECRET_KEY = '990003'

SQLALCHEMY_DATABASE_URI = \
    '{SGBD}://{usuario}:{clave}@{servidor}/{database}'.format(
        SGBD = 'mysql+mysqlconnector',
        usuario = 'doctortomatto',
        clave = 'mysqlroot',
        servidor = 'doctortomatto.mysql.pythonanywhere-services.com',
        database = 'doctortomatto$plataformaDT'
    )


#PayPal API Mode
# Values: sandbox or live (Default: live)


#PayPal Setting & API Credentials - sandbox
PAYPAL_SANDBOX_CLIENT_ID='AcMCJCUhCIO43BHSRCleHBIoYlS06dsWbLw9yoNP2NC0JErWqzBpp82nDTYmeKnT3O5sUuY4QrOY_V3p'
PAYPAL_SANDBOX_CLIENT_SECRET='EJYQ8NzQJvPlZzZTH2szCey2P-ktZ8w8h85KakPJR8bhJ02Cw1mK61iOFEsViUxcrjSOJ-NTGEludExR'

#PayPal Setting & API Credentials - live
##PAYPAL_LIVE_CLIENT_ID=xxx
##PAYPAL_LIVE_CLIENT_SECRET=xxx