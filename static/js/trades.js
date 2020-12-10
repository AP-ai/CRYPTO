let btc_price = 0.0;
let eth_price = 0.0;
let ltc_price = 0.0;

function roundPrice(Price, decimals) {
    let d = Math.pow(10, decimals);
    return (Math.round(Price * d) / d);
}

function get_coin_prices() {
    $.ajax({
        url: 'https://api.coingecko.com/api/v3/coins/bitcoin',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            btc_price = data.market_data.current_price.usd
            update_prices();
        }
    });
    $.ajax({
        url: 'https://api.coingecko.com/api/v3/coins/ethereum',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            eth_price = data.market_data.current_price.usd
            update_prices();
        }
    });
    $.ajax({
        url: 'https://api.coingecko.com/api/v3/coins/litecoin',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            ltc_price = data.market_data.current_price.usd
            update_prices();
        }
    });
}

let btc_count = 0.0;
let eth_count = 0.0;
let ltc_count = 0.0;
let cash_count = 0.0;

function load_portfolio(cash, btc, eth, ltc) {
    let total;

    btc_count = btc
    eth_count = eth
    ltc_count = ltc
    cash_count = cash

    get_coin_prices();

    $('#btc_value').text("$" + roundPrice((btc * btc_price), 2))
    $('#eth_value').text("$" + roundPrice((eth * eth_price), 2))
    $('#ltc_value').text("$" + roundPrice((ltc * ltc_price), 2))
    total = btc * btc_price + eth * eth_price + ltc * ltc_price + cash;
    $('#total_value').text("$" + roundPrice(total, 2))
}


function update_prices() {

    if (window.location.href.toString().includes("trade")){
        $('#btc_count').text(btc_count)
        $('#eth_count').text(eth_count)
        $('#ltc_count').text(ltc_count)

        document.getElementById("btc_count_hidden").value = btc_count;
        document.getElementById("eth_count_hidden").value = eth_count;
        document.getElementById("ltc_count_hidden").value = ltc_count;
        document.getElementById("cash_value_hidden").value = roundPrice((cash_count), 2);
    }

    $('#btc_value').text("$" + roundPrice((btc_count * btc_price), 2))
    $('#eth_value').text("$" + roundPrice((eth_count * eth_price), 2))
    $('#ltc_value').text("$" + roundPrice((ltc_count * ltc_price), 2))
    $('#cash_value').text("$" + roundPrice((cash_count), 2))

    let total = btc_count * btc_price + eth_count * eth_price + ltc_count * ltc_price + cash_count;
    $('#total_value').text("$" + roundPrice(total, 2))
}

function load_trades(cash, btc, eth, ltc) {
    get_coin_prices();

    btc_count = btc;
    eth_count = eth;
    ltc_count = ltc;
    cash_count = cash;

    update_prices();
}

function trade_coin_btc(value, plus) {
    if (plus) {
        if (cash_count >= btc_price * value) {
            btc_count = btc_count + value;
            btc_count = roundPrice(btc_count, 2);
            cash_count = cash_count - btc_price * value;
            update_prices();
        }
    } else {
        if (btc_count >= value) {
            btc_count = btc_count - value;
            btc_count = roundPrice(btc_count, 2);
            cash_count = cash_count + btc_price * value;
            update_prices();
        }
    }
}
function trade_coin_eth(value, plus) {
    if (plus) {
        if (cash_count >= eth_price * value) {
            eth_count = eth_count + value;
            eth_count = roundPrice(eth_count, 2);
            cash_count = cash_count - eth_price * value;
            update_prices();
        }
    } else {
        if (eth_count >= value) {
            eth_count = eth_count - value;
            eth_count = roundPrice(eth_count, 2);
            cash_count = cash_count + eth_price * value;
            update_prices();
        }
    }
}
function trade_coin_ltc(value, plus) {
    if (plus) {
        if (cash_count >= ltc_price * value) {
            ltc_count = ltc_count + value;
            ltc_count = roundPrice(ltc_count, 2);
            cash_count = cash_count - ltc_price * value;
            update_prices();
        }
    } else {
        if (ltc_count >= value) {
            ltc_count = ltc_count - value;
            ltc_count = roundPrice(ltc_count, 2);
            cash_count = cash_count + ltc_price * value;
            update_prices();
        }
    }
}