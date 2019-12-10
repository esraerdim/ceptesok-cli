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
                      <router-link to="/kahvaltilik">  Çok satanlar</router-link>
                    </button>
                    <button v-on:click="focusx($event)" id="endusuk" class="order-opt">
                        <router-link to="/kahvaltilik/order/opa/">En düşük fiyat</router-link>
                    </button>
                    <button v-on:click="focusx($event)" id="enyeni" class="order-opt">
                        <router-link to="/kahvaltilik/order/ocd/"> En yeniler</router-link>
                    </button>
                </nav>
            </div>
        </div>
    </div>
    <div class="bar">
        <a class="list-icon active" @click="changeGstyle($event)"></a>
        <a class="grid-icon" @click="changeGstyle($event)"></a>
    </div>
    <aside class="grid-col section listing-filters">
        <div class="filters-wrapper">
            <button class="filters-close"><i class="icon-close"></i></button>
            <div class="filters-group">
                <h3 class="group-title">Kahvaltılık</h3>
                <ul class="group-list">
                   <li class="list-item"><a href="sut">Süt (22)</a></li>
                                    <li class="list-item"><a href="peynir">Peynir (63)</a></li>
                                    <li class="list-item"><a href="yumurta">Yumurta (18)</a></li>
                                    <li class="list-item"><a href="ekmek">Ekmek (39)</a></li>
                                    <li class="list-item"><a href="zeytin">Zeytin (32)</a></li>
                                    <li class="list-item"><a href="tereyag-margarin">Tereyağ &amp; Margarin (16)</a></li>
                                    <li class="list-item"><a href="bal-recel">Bal &amp; Reçel (16)</a></li>
                                    <li class="list-item"><a href="kaymak-krema-sos">Kaymak &amp; Krema &amp; Sos (5)</a></li>
                                    <li class="list-item"><a href="cay-kahve">Çay &amp; Kahve (101)</a></li>
                                    <li class="list-item"><a href="sarkuteri">Şarküteri (47)</a></li>
                                    <li class="list-item"><a href="krem-cikolata-ve-ezmeler">Krem Çikolata ve Ezmeler (21)</a></li>
                                    <li class="list-item"><a href="helva-tahin-pekmez">Helva Tahin Pekmez (20)</a></li>
                                    <li class="list-item"><a href="misir-gevregi-yulaf">Mısır Gevreği &amp; Yulaf (13)</a></li>
                                    <li class="list-item"><a href="pastane-ve-firin-urunleri">Pastane ve Fırın Ürünleri (26)</a></li>
                                    <li class="list-item"><a href="icecekler">İçecekler (29)</a></li>
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
   },
}
</script>