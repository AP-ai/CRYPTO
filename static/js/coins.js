function load_coin_prices() {
    $.ajax({
        url: 'https://api.coingecko.com/api/v3/coins/bitcoin',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            $('#coin1').text("$" + data.market_data.current_price.usd)
            if (Math.sign(data.market_data.price_change_24h) == -1) {
                $('#coin1').text("▼ " + $('#coin1').text())
                document.getElementById("coin1").style.color = "red";
            }
            else{
                $('#coin1').text("▲ " + $('#coin1').text())
                 document.getElementById("coin1").style.color = "green";
            }
        }
    });
    $.ajax({
        url: 'https://api.coingecko.com/api/v3/coins/ethereum',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            $('#coin2').text("$" + data.market_data.current_price.usd)
            if (Math.sign(data.market_data.price_change_24h) == -1) {
                $('#coin2').text("▼ " + $('#coin2').text())
                document.getElementById("coin2").style.color = "red";
            }
            else{
                $('#coin2').text("▲ " + $('#coin2').text())
                 document.getElementById("coin2").style.color = "green";
            }
        }
    });
    $.ajax({
        url: 'https://api.coingecko.com/api/v3/coins/litecoin',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            $('#coin3').text("$" + data.market_data.current_price.usd)
            if (Math.sign(data.market_data.price_change_24h) == -1) {
                $('#coin3').text("▼ " + $('#coin3').text())
                document.getElementById("coin3").style.color = "red";
            }
            else{
                $('#coin3').text("▲ " + $('#coin3').text())
                 document.getElementById("coin3").style.color = "green";
            }
        }
    });
}

function roundPrice(Price, decimals) {
    let d = Math.pow(10, decimals);
    return (parseInt(Price * d) / d).toFixed(decimals);
};

function load_coin_info(url) {
    $.ajax({
        url: url,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            $('#current_price').text("$" + data.market_data.current_price.usd)

            $('#ath').text("$" + data.market_data.ath.usd)
            $('#ath_date').text(data.market_data.ath_date.usd.split('T')[0])
            $('#atl').text("$" + data.market_data.atl.usd)
            $('#atl_date').text(data.market_data.atl_date.usd.split('T')[0])

            $('#circulating_supply').text(roundPrice(data.market_data.circulating_supply,0))
            $('#last_updated').text("As of: " + data.market_data.last_updated.split('T')[0])

            $('#high24').text("$" + data.market_data.high_24h.usd)
            $('#low24').text("$" + data.market_data.low_24h.usd)

            $('#price_change_24h').text("$" + roundPrice(data.market_data.price_change_24h, 2))
            $('#price_change_percentage_24h').text(roundPrice(data.market_data.price_change_percentage_24h, 2) + "%")
            $('#change30d').text(roundPrice(data.market_data.price_change_percentage_30d, 2) + "%")
            $('#change60d').text(roundPrice(data.market_data.price_change_percentage_60d, 2) + "%")

            if (Math.sign(data.market_data.price_change_24h) == -1) {
                document.getElementById("current_price").style.color = "red";
                document.getElementById("price_change_24h").style.color = "red";
                document.getElementById("price_change_percentage_24h").style.color = "red";

                $('#price_change_24h').text("▼ " + $('#price_change_24h').text())
                $('#price_change_percentage_24h').text("▼ " + $('#price_change_percentage_24h').text())
            } else {
                document.getElementById("current_price").style.color = "green";
                document.getElementById("price_change_24h").style.color = "green";
                document.getElementById("price_change_percentage_24h").style.color = "green";

                $('#price_change_24h').text("▲ " + $('#price_change_24h').text())
                $('#price_change_percentage_24h').text("▲ " + $('#price_change_percentage_24h').text())
            }
            if (Math.sign(data.market_data.price_change_percentage_30d) == -1) {
                document.getElementById("change30d").style.color = "red";
                $('#change30d').text("▼ " + $('#change30d').text())
            }
            else {
                document.getElementById("change30d").style.color = "green";
                $('#change30d').text("▲ " + $('#change30d').text())
            }
            if (Math.sign(data.market_data.price_change_percentage_60d) == -1) {
                document.getElementById("change60d").style.color = "red";
                $('#change60d').text("▼ " + $('#change60d').text())
            }
            else {
                document.getElementById("change60d").style.color = "green";
                $('#change60d').text("▲ " + $('#change60d').text())
            }
        }
    });
}