import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from jinja2 import Environment, FileSystemLoader
from datetime import datetime
import base64
import os

GMAIL_APP_PASSWORD = os.getenv("GMAIL_APP_PASSWORD")
MENTUCA_EMAIL_RESET = os.getenv("MENTUCA_EMAIL_RESET")


def send_reset_email(to_email: str, reset_link: str):

    with open("assets/logo.png", "rb") as image_file:
        logo_base64 = base64.b64encode(image_file.read()).decode("utf-8")

    # Renderiza o template
    env = Environment(loader=FileSystemLoader("."))
    template = env.get_template("assets/template_email_redefinicao.html")
    html_content = template.render(
        reset_link=reset_link,
        year=datetime.now().year,
        logo_base64=logo_base64,
    )

    # Monta o e-mail
    msg = MIMEMultipart("alternative")
    msg["Subject"] = "Redefinição de Senha"
    msg["From"] = MENTUCA_EMAIL_RESET
    msg["To"] = to_email

    msg.attach(MIMEText(html_content, "html"))

    # Envia o e-mail via servidor SMTP do Gmail
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(MENTUCA_EMAIL_RESET, GMAIL_APP_PASSWORD)
        server.sendmail(MENTUCA_EMAIL_RESET, to_email, msg.as_string())
