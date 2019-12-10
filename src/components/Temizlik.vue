<template>

<div>
        <header><headers/></header>
        <a href="#"><img alt="Yukarı Çık" class="yukarikaydir" src="../img/yc.png" style="display: block;"></a>
    <div class="grid-row">
    <div class="section listing-toprow">
        <div class="grid-col toprow-col toprow-mobile">
            <p>454 ürün bulundu</p>
            <button class="btn heavy small mobile-filterbtn listing-mobiletrigger-filters">Filtre</button>
            <button class="btn heavy small mobile-filterbtn listing-mobiletrigger-order">Sırala</button>
        </div>
        <div class="grid-col toprow-title">
            <div class="toprow-content">
                454 ürün bulundu
            </div>
        </div>
        <div class="grid-col toprow-col toprow-order">
            <div class="toprow-content"><span class="order-title">Sıralama:</span>
                <nav class="order-opts" id="degisiklikicin">
                    <button v-on:click="focusx($event)" id="coksatan" class="order-opt active">
                      <router-link to="/temizlik">  Çok satanlar</router-link>
                    </button>
                    <button v-on:click="focusx($event)" id="endusuk" class="order-opt">
                        <router-link to="/temizlik/order/opa/">En düşük fiyat</router-link>
                    </button>
                    <button v-on:click="focusx($event)" id="enyeni" class="order-opt">
                        <router-link to="/temizlik/order/ocd/"> En yeniler</router-link>
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
                <h3 class="group-title">Temizlik</h3>
                    <ul class="group-list">
                        <li class="list-item"><a href="bulasik">Bulaşık (83)</a></li>
                        <li class="list-item"><a href="mutfak-yardimcilari">Mutfak Yardımcıları (25)</a></li>
                        <li class="list-item"><a href="camasir">Çamaşır (142)</a></li>
                        <li class="list-item"><a href="ev-temizleyicileri">Ev Temizleyicileri (149)</a></li>
                        <li class="list-item"><a href="sabun">Sabun (32)</a></li>
                        <li class="list-item"><a href="kagit-pecete-mendil">Kağıt &amp; Peçete &amp; Mendil (51)</a></li>
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
                    <li class="list-item">
                        <div class="checkwrap">
                            <input type="checkbox" id="price_filter_2" value="50-100">
                            <label for="price_filter_2"><span></span>50 - 100 <span class="currency"></span></label>
                        </div>
                    </li>
                    <li class="list-item">
                        <div class="checkwrap">
                            <input type="checkbox" id="price_filter_3" value="100-200">
                            <label for="price_filter_3"><span></span>100 - 200 <span class="currency"></span></label>
                        </div>
                    </li>
                    <li class="list-item">
                        <div class="checkwrap">
                            <input type="checkbox" id="price_filter_4" value="200-500">
                            <label for="price_filter_4"><span></span>200 - 500 <span class="currency"></span></label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </aside>
    <main class="grid-col section listing-results">
        <div class="results-list-wrap">
            <ul class="results-list">
                <router-view/>
            </ul>
        </div>
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

