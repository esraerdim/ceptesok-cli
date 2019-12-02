<template>
<div>
      <header><headers/></header>
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
                      <router-link to="/et">  Çok satanlar</router-link>
                    </button>
                    <button v-on:click="focusx($event)" id="endusuk" class="order-opt">
                        <router-link to="/et/order/opa/">En düşük fiyat</router-link>
                    </button>
                    <button v-on:click="focusx($event)" id="enyeni" class="order-opt">
                        <router-link to="/et/order/ocd/"> En yeniler</router-link>
                    </button>
                </nav>
            </div>
        </div>
    </div>
    <aside class="grid-col section listing-filters">
        <div class="filters-wrapper">
            <button class="filters-close"><i class="icon-close"></i></button>
            <div class="filters-group">
                <h3 class="group-title">Et &amp; Tavuk &amp; Hindi &amp; Balık</h3>
                <ul class="group-list">
                    <li class="list-item"><a href="kirmizi-et">Kırmızı Et (65)</a></li>
                    <li class="list-item"><a href="tavuk-eti">Tavuk Eti (81)</a></li>
                    <li class="list-item"><a href="hindi-eti">Hindi Eti (13)</a></li>
                    <li class="list-item"><a href="ton-baligi">Ton Balığı (4)</a></li>
                    <li class="list-item"><a href="yumurta">Yumurta (66)</a></li>
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
       }
   }
}
</script>