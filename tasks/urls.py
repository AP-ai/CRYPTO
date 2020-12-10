from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('btc', views.btc, name="btc"),
    path('eth', views.eth, name="eth"),
    path('ltc', views.ltc, name="ltc"),
    path('login_user', views.login_user, name="login_user"),
    path('logout_user', views.logout_user, name="logout_user"),
    path('new_user', views.new_user, name="new_user"),
    path('portfolio', views.portfolio, name="portfolio"),
    path('trade', views.trade, name="trade")
]
