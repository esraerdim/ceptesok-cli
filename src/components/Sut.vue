<template>
<div>
      <header><headers/></header>
       <a href="#"><img alt="Yukarı Çık" class="yukarikaydir" src="../img/yc.png" style="display: block;"></a>
    <div class="grid-row">
    <div class="section listing-toprow">
        <div class="grid-col toprow-col toprow-mobile">
            <p>229 ürün bulundu</p>
            <button class="btn heavy small mobile-filterbtn listing-mobiletrigger-filters">Filtre</button>
            <button class="btn heavy small mobile-filterbtn listing-mobiletrigger-order">Sırala</button>
        </div>
        <div class="grid-col toprow-title">
            <div class="toprow-content">
                229 ürün bulundu
            </div>
        </div>
        <div id="focus" class="grid-col toprow-col toprow-order">
            <div class="toprow-content"><span class="order-title">Sıralama:</span>
                <nav class="order-opts" id="degisiklikicin">
                    <button v-on:click="focusx($event)" id="coksatan" class="order-opt active">
                      <router-link to="/sut">  Çok satanlar</router-link>
                    </button>
                    <button v-on:click="focusx($event)" id="endusuk" class="order-opt">
                        <router-link to="/sut/order/opa/">En düşük fiyat</router-link>
                    </button>
                    <button v-on:click="focusx($event)" id="enyeni" class="order-opt">
                        <router-link to="/sut/order/ocd/"> En yeniler</router-link>
                    </button>
                </nav>
            </div>
        </div>
    </div>
    <div class="bar">
        <a v-bind:class="{active:this.$store.getters.getGridState}" class="list-icon" @click="changeGstyle($event)"></a>
        <a v-bind:class="{active:!this.$store.getters.getGridState}" class="grid-icon" @click="changeGstyle($event)"></a>
    </div>
    <aside class="grid-col section listing-filters">
        <div class="filters-wrapper">
            <button class="filters-close"><i class="icon-close"></i></button>
            <div class="filters-group">
                <h3 class="group-title">Süt</h3>
                <ul class="group-list">
                     <li class="list-item"><a href="sut">Süt (33)</a></li>
                                    <li class="list-item"><a href="yogurtlar">Yoğurtlar (35)</a></li>
                                    <li class="list-item"><a href="peynirler">Peynirler (66)</a></li>
                                    <li class="list-item"><a href="tereyag-margarin">Tereyağ &amp; Margarin (14)</a></li>
                                    <li class="list-item"><a href="kaymak-krema">Kaymak &amp; Krema (3)</a></li>
                                    <li class="list-item"><a href="ayran-kefir">Ayran &amp; Kefir (15)</a></li>
                                    <li class="list-item"><a href="dondurma">Dondurma (82)</a></li>
                                    <li class="list-item"><a href="sut-tozu-ve-krema">Süt Tozu ve Krema (2)</a></li>
                                    <li class="list-item"><a href="sutlu-tatlilar">Sütlü Tatlılar (8)</a></li>
                </ul>
            </div>
            <div class="filters-group">
                <h3 class="group-title">Markalar</h3>
                <ul class="group-list">
                    <markalar></markalar>
                </ul>
            </div>
            <div class="filters-group">
                <h3 class="group-title">Fiyat Aralığı</h3>
                <ul class="group-list">
                    <li class="list-item">
                        <div class="checkwrap">
                            <input type="checkbox" id="price_filter_0" value="0-10">
                            <label for="price_filter_0"><span></span>0 - 10 <span class="currency"></span></label>
                        </div>
                    </li>
                    <li class="list-item">
                        <div class="checkwrap">
                            <input type="checkbox" id="price_filter_1" value="10-50">
                            <label for="price_filter_1"><span></span>10 - 50 <span class="currency"></span></label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </aside>
    <main class="grid-col section listing-results">
        <!---->
        <div class="results-list-wrap">
            <ul class="results-list">
                <router-view/>
            </ul>
        </div>
        <sayfalar/>
    </main>
</div>
      <altkisim/>
      </div>

</template>
<script>
import Altkisim  from './Altkisim.vue'
import headers from './Headers.vue'
import Endusuk from './Endusuk.vue'
import Normalurun from './Normalurun.vue'
import Enyeni from './Enyeni.vue'
import Markalar from './Markalar.vue'
import Sayfalar from './Pagination.vue'

export default {
   
   name:'Home',
   components:{
       headers,
       Altkisim,
       Endusuk,
       Normalurun,
       Enyeni,
       Markalar,
       Sayfalar,
   },
   methods:{
       focusx:function(event){
           
            document.getElementById("focus").scrollIntoView(true);
            document.getElementById('degisiklikicin').childNodes[0].className="order-opt"
            document.getElementById('degisiklikicin').childNodes[2].className="order-opt"
            document.getElementById('degisiklikicin').childNodes[4].className="order-opt"
            document.getElementById(event.currentTarget.id).className="order-opt active"
       },
        changeGstyle:function(e){
            var list = document.querySelectorAll("#app > div > div > div.bar")[0].children
            list[0].className="list-icon";
            list[1].className="grid-icon";
            this.$store.commit('changeGrid',e)
        },
   }
}
</script>

<style>
.bar{
	background-color:#5c9bb7;
	background-image:-webkit-linear-gradient(top, #5c9bb7, #5392ad);
	background-image:-moz-linear-gradient(top, #5c9bb7, #5392ad);
	background-image:linear-gradient(top, #5c9bb7, #5392ad);
	box-shadow: 0 1px 1px #ccc;
	border-radius: 2px;
	padding: 10px;
	float: right;
    margin-top: 12px;
    margin-right: 1%;
    margin-bottom: 45px;
    margin-left: 90%;
	position:absolute;
	text-align:right;
	line-height: 1;
}

.bar a{
	background:#4987a1 center center no-repeat;
	width:32px;
	height:32px;
	display:inline-block;
	text-decoration:none !important;
	margin-right:5px;
	border-radius:2px;
	cursor:pointer;
}
.bar a.active{
    background-color: #FFE000;
}
.bar a.list-icon{
	background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBEQkMyQzE0MTBCRjExRTNBMDlGRTYyOTlBNDdCN0I4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBEQkMyQzE1MTBCRjExRTNBMDlGRTYyOTlBNDdCN0I4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MERCQzJDMTIxMEJGMTFFM0EwOUZFNjI5OUE0N0I3QjgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MERCQzJDMTMxMEJGMTFFM0EwOUZFNjI5OUE0N0I3QjgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4MjPshAAAAXklEQVR42mL4////h/8I8B6IGaCYKHFGEMnAwCDIAAHvgZgRyiZKnImBQsACxB+hNoDAQyQ5osQZIT4gH1DsBZABH6AB8x/JaQzEig++WPiII7Rxio/GwmCIBYAAAwAwVIzMp1R0aQAAAABJRU5ErkJggg==);
}
.bar a.grid-icon{
	background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkYzNkFCQ0ZBMTBCRTExRTM5NDk4RDFEM0E5RkQ1NEZCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkYzNkFCQ0ZCMTBCRTExRTM5NDk4RDFEM0E5RkQ1NEZCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjM2QUJDRjgxMEJFMTFFMzk0OThEMUQzQTlGRDU0RkIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjM2QUJDRjkxMEJFMTFFMzk0OThEMUQzQTlGRDU0RkIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7h1bLqAAAAWUlEQVR42mL8////BwYGBn4GCACxBRlIAIxAA/4jaXoPEkMyjJ+A/g9MDJQBRhYg8RFqMwg8RJIUINYLFDmBUi+ADQAF1n8ofk9yIAy6WPg4GgtDMRYAAgwAdLYwLAoIwPgAAAAASUVORK5CYII=);
}
.bar input{
	background:#fff no-repeat 13px 13px;

	border: none;
	width: 100%;
	line-height: 19px;
	padding: 11px 0;

	border-radius: 2px;
	box-shadow: 0 2px 8px #c4c4c4 inset;
	text-align: left;
	font-size: 14px;
	font-family: inherit;
	color: #738289;
	font-weight: bold;
	outline: none;
	text-indent: 40px;
}

</style>