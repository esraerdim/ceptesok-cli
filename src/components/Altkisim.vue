<template>
    <footer>
    <div class="footer-top" v-if="footerstate"><i class="icon-close" v-on:click="closefooter()"></i> 
            <div class="wrapper gird-alanı">
               <nav class="top-nav grid-row">
                  <div class="grid-col nav-menu">
                     <ul class="nav-menus">
                        <li class="menus-menu wide">
                           <h2 class="menu-title">Kategoriler</h2>
                           <ul class="menu-items">
                              <li class="items-item"><a href="https://www.ceptesok.com/et-tavuk-hindi-balik">Et &amp;&nbsp;Tavuk &amp;&nbsp;Hindi &amp;&nbsp;Balık</a></li>
                              <li class="items-item"><a href="https://www.ceptesok.com/sut-yogurt-ve-sut-urunleri">Süt, Yoğurt ve&nbsp;Süt Ürünleri</a></li>
                              <li class="items-item"><a href="https://www.ceptesok.com/yemeklik-malzemeler">Yemeklik Malzemeler</a></li>
                              <li class="items-item"><a href="https://www.ceptesok.com/kahvaltilik">Kahvaltılık</a></li>
                              <li class="items-item"><a href="https://www.ceptesok.com/icecek">İçecek</a></li>
                              <li class="items-item"><a href="https://www.ceptesok.com/dondurulmus-gida">Dondurulmuş Gıda</a></li>
                              <li class="items-item"><a href="https://www.ceptesok.com/biskuvi-cikolata-kuruyemis">Bisküvi &amp;&nbsp;Çikolata &amp;&nbsp;Kuruyemiş</a></li>
                              <li class="items-item"><a href="https://www.ceptesok.com/unlu-mamuller-pastane">Unlu Mamüller &amp;&nbsp;Pastane</a></li>
                              <li class="items-item"><a href="https://www.ceptesok.com/meyve-sebze">Meyve - Sebze</a></li>
                              <li class="items-item"><a href="https://www.ceptesok.com/kisisel-bakim">Kişisel Bakım</a></li>
                              <li class="items-item"><a href="https://www.ceptesok.com/temizlik">Temizlik</a></li>
                              <li class="items-item"><a href="https://www.ceptesok.com/elektronik-giyim-diger">Elektronik &amp;&nbsp;Giyim &amp;&nbsp;Diğer</a></li>
                              <li class="items-item"><a href="https://www.ceptesok.com/bebek-urunleri">Bebek Ürünleri</a></li>
                              <li class="items-item"><a href="https://www.ceptesok.com/light-urunler">Light Ürünler</a></li>
                              <li class="items-item"><a href="https://www.ceptesok.com/evcil-hayvan-urunleri">Evcil Hayvan Ürünleri</a></li>
                           </ul>
                        </li>
                        <li class="menus-menu">
                           <h2 class="menu-title">Yardım</h2>
                           <ul class="menu-items">
                             <router-link to="/yardim/uyelik-islemleri"> <li class="items-item">Üyelik İşlemleri</li></router-link>
                              <li class="items-item"><a href="/yardim/hesabim-menusu">Hesabım Menüsü</a></li>
                              <li class="items-item"><a href="/yardim/siparis-islemleri">Sipariş İşlemleri</a></li>
                              <li class="items-item"><a href="/yardim/yasal-uyarilar">Yasal Uyarılar</a></li>
                              <li class="items-item"><a href="/yardim/guvenlik-politikasi">Güvenlik Politikası</a></li>
                              <li class="items-item"><a href="/yardim/kullanim-kosullari">Kullanım Koşulları</a></li>
                              <li class="items-item"><a href="/yardim/kvkk">Kişisel Verilerin Korunması</a></li>
                              <li class="items-item"><a href="/yardim/hakkimizda">Hakkımızda</a></li>
                           </ul>
                        </li>
                        <!---->
                     </ul>
                  </div>
                  <div class="grid-col nav-additions">
                     <div class="additions-kısım app">
                        <div class="app-text">
                           <h3 class="menu-title">Cepte Şok</h3>
                           <p class="app-description">Mobil Uygulamamız ile Şok Her an Yanınızda</p>
                        </div>
                        <div class="app-controls"><a class="app-link btn narrow hollow"><img src="../img/mobile-logo-appstore.svg"></a> <a class="app-link btn narrow hollow"><img src="../img/mobile-logo-playstore.svg"></a></div>
                     </div>
                     <div class="additions-kısım brochure">
                        <div class="content-brochure">
                           <h3 class="menu-title">Haftalık Katalog</h3>
                           <a href="https://www.sokmarket.com.tr/haftanin-firsatlari/firsatlar" target="_blank" class="brochure-link"><img src="../img/footer-brochure.png"></a>
                        </div>
                     </div>
                  </div>
               </nav>
               <address class="top-contact">
                  <div class="contact-kısım"><strong class="contact-title">Bizi Arayın:</strong> 0 212 576 33 00
                  </div>
                  <div class="contact-kısım"><strong class="contact-title">Bize Yazın:</strong> musterihizmetleri@ceptesok.com
                  </div>
               </address>
            </div>
         </div>
         <i class="icon-close" v-if="!footerstate" v-on:click="closefooter()"></i>
         <div class="footer-bottom">
            <div class="wrapper">
               <div class="bottom-copyright">© 2017 ceptesok.com Tüm Hakları Saklıdır.</div>
               <ul class="bottom-brands">
                  <li class="brands-brand"><img src="../img/mastercard.svg" class="brand-logo"></li>
                  <li class="brands-brand"><img src="../img/visa.svg" class="brand-logo"></li>
               </ul>
            </div>
         </div>
         
         </footer>
         
</template>
<script>
export default {
    name: 'Altkisim',
    data () {
    return {
       footerstate:true,
    };
  },
  methods: {
     closefooter:function(){
      if(this.footerstate==true)
         this.footerstate=false;
         else
         this.footerstate=true;
     }
  },
}
</script>
<style>
.icon-close{
   background-color:white;
   padding: 1rem 1rem 1rem 1rem;
   border: 3px solid #FFB20D;
   border-radius: 2rem;
   font-size: 25px;
   font-weight: 100;
   float: right;
   margin-top: 0px;
   margin-right: 3%;
}
</style>