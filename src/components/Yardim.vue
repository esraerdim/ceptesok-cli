<template>
<div >
<header><headers/></header>
<div id="help_app" class="section account page-whitebg">
    <div v-if="gor">
        <nav class="section breadcrumbs bg-white">
            <div class="wrapper breadcrumbs-wrap">
                <div class="breadcrumbs-container">
                    <ul class="breadcrumbs-list">
                        <li><a href="https://www.ceptesok.com">Ana Sayfa</a></li>
                        <li><a href="/yardim#/yardim">Yardım</a></li>
                        <li><span>Üyelik İşlemleri</span></li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="section account">
            <div class="wrapper clear">
                <div class="section account-mobilemenu inputwrap type-selectbox">
                    <select class="mobilemenu-select yellow has-icons" style="display: none;">
                        <option data-href="/uye#/siparislerim" data-icon="icon-cart" value="/siparislerim">
                            Alışverişlerim
                        </option>
                        <option data-href="/uye#/alisveris-listelerim" data-icon="icon-list" value="/alisveris-listelerim">
                            ALışveriş Listelerim
                        </option>
                        <option data-href="/uye#/promosyonlarim" data-icon="icon-promotion" value="/promosyonlarim">
                            Promosyonlarım
                        </option>
                        <option data-href="/uye#/bilgilerim" data-icon="icon-user" value="/bilgilerim">
                            Kişisel Bilgilerim
                        </option>
                        <option data-href="/uye#/fatura-bilgilerim" data-icon="icon-list" value="/fatura-bilgilerim">
                            Fatura Bilgilerim
                        </option>
                        <option data-href="/uye#/mesajlarim" data-icon="icon-message" value="/mesajlarim">
                            Mesajlarım
                        </option>
                        <option data-href="/uye#/sifre-degistir" data-icon="icon-security" value="/sifre-degistir">
                            Şifremi Değiştir
                        </option>
                        <option data-href="/yardim#/yardim" data-icon="icon-help" value="Yardım">Yardım</option>
                    </select><span id="" class="selectboxit-container selectboxit-container mobilemenu-select yellow has-icons" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false" aria-owns=""><span id="" class="selectboxit  selectboxit-enabled selectboxit-btn" name="" tabindex="0" unselectable="on"><span class="selectboxit-option-icon-container"><i id="" class="selectboxit-default-icon selectboxit-option-icon icon-cart selectboxit-container" unselectable="on"></i></span><span id="" class="selectboxit-text" unselectable="on" data-val="" style="max-width: 72px;" aria-live="polite">
            Alışverişlerim
        </span><span id="" class="selectboxit-arrow-container" unselectable="on"><i id="" class="selectboxit-arrow selectboxit-default-arrow" unselectable="on"></i></span></span>
                    <ul class="selectboxit-options selectboxit-list" tabindex="-1" role="listbox" aria-hidden="true">
                        <li data-id="0" data-val="/siparislerim" data-disabled="false" class="selectboxit-option  selectboxit-option-first selectboxit-selected" data-href="/uye#/siparislerim" data-icon="icon-cart" role="option"><a class="selectboxit-option-anchor"><span class="selectboxit-option-icon-container"><i class="selectboxit-option-icon icon-cart selectboxit-container"></i></span>
            Alışverişlerim
        </a></li>
                        <li data-id="1" data-val="/alisveris-listelerim" data-disabled="false" class="selectboxit-option" data-href="/uye#/alisveris-listelerim" data-icon="icon-list" role="option"><a class="selectboxit-option-anchor"><span class="selectboxit-option-icon-container"><i class="selectboxit-option-icon icon-list selectboxit-container"></i></span>
            ALışveriş Listelerim
        </a></li>
                        <li data-id="2" data-val="/promosyonlarim" data-disabled="false" class="selectboxit-option" data-href="/uye#/promosyonlarim" data-icon="icon-promotion" role="option"><a class="selectboxit-option-anchor"><span class="selectboxit-option-icon-container"><i class="selectboxit-option-icon icon-promotion selectboxit-container"></i></span>
            Promosyonlarım
        </a></li>
                        <li data-id="3" data-val="/bilgilerim" data-disabled="false" class="selectboxit-option" data-href="/uye#/bilgilerim" data-icon="icon-user" role="option"><a class="selectboxit-option-anchor"><span class="selectboxit-option-icon-container"><i class="selectboxit-option-icon icon-user selectboxit-container"></i></span>
            Kişisel Bilgilerim
        </a></li>
                        <li data-id="4" data-val="/fatura-bilgilerim" data-disabled="false" class="selectboxit-option" data-href="/uye#/fatura-bilgilerim" data-icon="icon-list" role="option"><a class="selectboxit-option-anchor"><span class="selectboxit-option-icon-container"><i class="selectboxit-option-icon icon-list selectboxit-container"></i></span>
            Fatura Bilgilerim
        </a></li>
                        <li data-id="5" data-val="/mesajlarim" data-disabled="false" class="selectboxit-option" data-href="/uye#/mesajlarim" data-icon="icon-message" role="option"><a class="selectboxit-option-anchor"><span class="selectboxit-option-icon-container"><i class="selectboxit-option-icon icon-message selectboxit-container"></i></span>
            Mesajlarım
        </a></li>
                        <li data-id="6" data-val="/sifre-degistir" data-disabled="false" class="selectboxit-option" data-href="/uye#/sifre-degistir" data-icon="icon-security" role="option"><a class="selectboxit-option-anchor"><span class="selectboxit-option-icon-container"><i class="selectboxit-option-icon icon-security selectboxit-container"></i></span>
            Şifremi Değiştir
        </a></li>
                        <li data-id="7" data-val="Yardım" data-disabled="false" class="selectboxit-option  selectboxit-option-last" data-href="/yardim#/yardim" data-icon="icon-help" role="option"><a class="selectboxit-option-anchor"><span class="selectboxit-option-icon-container"><i class="selectboxit-option-icon icon-help selectboxit-container"></i></span>Yardım</a></li>
                    </ul>
                    </span>
                </div>
                <aside class="section account-menu">
                    <ul class="menu-list">
                        <li class="list-item"><a href="/uye#/siparislerim"><i class="item-icon icon-cart"></i> Alışverişlerim</a></li>
                        <li class="list-item"><a href="/uye#/alisveris-listelerim"><i class="item-icon icon-list"></i> Alışveriş Listelerim</a></li>
                        <li class="list-item"><a href="/uye#/promosyonlarim"><i class="item-icon icon-promotion"></i> Promosyonlarım</a></li>
                        <li class="list-item"><a href="/uye#/bilgilerim"><i class="item-icon icon-user"></i> Kişisel Bilgilerim</a></li>
                        <li class="list-item"><a href="/uye#/fatura-bilgilerim"><i class="item-icon icon-list"></i> Fatura Bilgilerim</a></li>
                        <li class="list-item"><a href="/uye#/mesajlarim"><i class="item-icon icon-message"></i> Mesajlarım</a></li>
                        <li class="list-item"><a href="/uye#/sifre-degistir"><i class="item-icon icon-security"></i> Şifremi Değiştir</a></li>
                        <li class="list-item"><a href="/yardim#/yardim"><i class="item-icon icon-help"></i> Yardım</a></li>
                    </ul>
                </aside>
                <main class="section account-content account-help">
                    <badger-accordion class="sectionacc">
                        <badger-accordion-item v-for="d in data.payload.faq.faqs" :key="d.id">
                            <template slot="header">{{d.question | regexbus}}</template>    
                            <template slot="content">{{d.answer | regexbus}}</template>  
                        </badger-accordion-item>
                            </badger-accordion>
                </main>
            </div>
        </div>
    </div>
</div>
    
<altkisim/>
</div>

</template>
<script>
import Altkisim  from './Altkisim.vue'
import headers from './Headers.vue'

export default {
    name:'Yardim',
    components:{
       headers,
       Altkisim,
     },
     data() {
        return {
         data:"",
         gor:false
        }
     },
   created(){

    fetch('https://www.ceptesok.com/api/v1/faqs/'+this.$route.path.split("/").pop())
        .then(response => response.json())
        .then(data => {
            this.data=data
            console.log(this.$route)
            this.gor=true;
          });
   }
}
</script>
<style>
.badger-accordion-toggle{
   margin-top: 15px;
}
.sectionacc{
    cursor: pointer;
    z-index: 10;
    position: relative;
    display: block;
    background-color:
    #fff;
    font-size: 1rem;
    line-height: 1.71428571rem;
    font-weight: 700;
    padding: 1.64285714rem 2.57142857rem 1.64285714rem 0;
    border-bottom: 1px solid
    transparent;
}
</style>