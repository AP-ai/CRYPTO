from django.core.validators import RegexValidator
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import UserTable
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib.auth import logout
import re


# Create your views here.
def index(request):
    return render(request, 'Crypto/index.html')


def btc(request):
    return render(request, 'Crypto/btc.html')


def eth(request):
    return render(request, 'Crypto/eth.html')


def ltc(request):
    return render(request, 'Crypto/ltc.html')


def login_user(request):
    if request.method == 'POST':
        username = request.POST['login']
        password = request.POST['password']
        if not UserTable.objects.filter(user_name=username).exists():
            return render(request, 'crypto/login_user.html', {"errorMessage": "Information is incorrect."})
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
        return redirect(index)
    else:
        if request.user.is_authenticated:
            return redirect(index)
        else:
            return render(request, 'crypto/login_user.html')


@login_required(login_url=login_user)
def logout_user(request):
    logout(request)
    return redirect(index)


def new_user(request):
    if request.method == 'POST':
        user_name = request.POST.get('login')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        password = request.POST.get('password')
        password2 = request.POST.get('password2')
        if password != password2:
            return render(request, 'crypto/new_user.html', {"errorMessage": "Passwords do not match."})
        if UserTable.objects.filter(user_name=user_name).exists():
            return render(request, 'crypto/new_user.html', {"errorMessage": "Login already exist."})
        UserTable.objects.create(user_name=user_name, first_name=first_name, last_name=last_name)
        User.objects.create_user(username=user_name,
                                 email='jlennon@beatles.com',
                                 password=password)
        return redirect(index)
    else:
        if request.user.is_authenticated:
            return redirect(index)
        else:
            return render(request, 'crypto/new_user.html')


@login_required(login_url=login_user)
def portfolio(request):
    user = request.user
    user_data = UserTable.objects.filter(user_name=user)
    context = {'user_data': user_data[0]}
    return render(request, 'crypto/portfolio.html', context)


@login_required(login_url=login_user)
def trade(request):
    if request.method == 'POST':
        user = request.user
        cash_value = request.POST.get('cash_value_hidden')
        btc_count = request.POST.get('btc_count_hidden')
        eth_count = request.POST.get('eth_count_hidden')
        ltc_count = request.POST.get('ltc_count_hidden')
        test = re.match("([0-9])+\.?([0-9])*", cash_value)
        if re.match("([0-9])+\.?([0-9])*", cash_value) and re.match("([0-9])+\.?([0-9])*", btc_count) \
                and re.match("([0-9])+\.?([0-9])*", eth_count) and re.match("([0-9])+\.?([0-9])*", ltc_count):
            UserTable.objects.filter(user_name=user).update(cash=cash_value, btc=btc_count, eth=eth_count, ltc=ltc_count)
            return redirect(portfolio)
        else:
            return redirect(index)
    else:
        user = request.user
        user_data = UserTable.objects.filter(user_name=user)
        context = {'user_data': user_data[0]}
        return render(request, 'crypto/trade.html', context)
