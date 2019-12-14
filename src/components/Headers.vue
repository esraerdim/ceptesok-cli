<template>
<div>
    <div id="namer" v-if="!hideBar">
        <div id="namer-input">
                <input type="text" name="namername" placeholder="Kategori, ürün, marka ara" v-on:click="hideOne($event)">
            <div class="namer-controls active">
                <div><span>Arama</span></div>
                <div><span>Bilgi</span></div>
                <div name="namername" v-on:click="hideOne($event)"><span>Vazgeç</span></div>
            </div>
    </div>
        
    </div>
    <div class="header-inner" v-if="hideBar">
            <div class="wrapper">
                <div class="header-top"><router-link to="/"><img src="../img/logo.svg" class="header-logo"></router-link></div>
                <div class="header-mid">
                    <div class="mid-left">
                        <div class="left-button not-selected">
                            <i class="button-icon icon-store-location"></i> 
                            <div data-modal="modal_stores" class="button-content modaltrigger">Sepete Ekle</div>
                        </div>
                    </div>
                    <form id="searcharea" class="mid-search inputform">
                        <div class="inputwrap type-text"><button type="button" id="search-submit" class="input-icon icon-search"></button> <input type="text" id="search-input" name="search" autocomplete="off" placeholder="Kategori, ürün, marka ara" v-on:click="hideOne($event)"></div>
                        <div id="search-results"></div>
                    </form>
                    <div class="mid-right">
                        <!-- <button class="right-cartinfo basketbar-trigger">
                            <div class="cartinfo-basket icon-cart-2"><i class="cartinfo-quantity">0</i></div>
                            <div class="cartinfo-total">
                                <div class="pricebox plain">
                                    <div class="pricebox-content"><span class="currency pricebox-currency"></span><span class="pricebox-main">0</span><span class="pricebox-decimal">00</span></div>
                                </div>
                            </div>
                            <span class="cartinfo-text">Sepet</span>
                        </button> -->
                        <!---->
                        <Sepet/> 
                        <div class="right-usercontrols not-logged">
                            <div class="usercontrols-desktop"><i class="icon-user-2 usercontrols-icon"></i> <button data-modal="modal_login" data-clickshow-group="loginform-sections" data-subject="member-login" class="usercontrols-button top modaltrigger clickshow notoggle">
                                Giriş Yap
                                </button> <button data-modal="modal_login" data-clickshow-group="loginform-sections" data-subject="member-register" class="usercontrols-button sub clickshow notoggle modaltrigger">
                                Üye Ol
                                </button>
                            </div>
                            <button data-modal="modal_login" data-clickshow-group="loginform-sections" data-subject="member-login" class="usercontrols-mobile modaltrigger clickshow notoggle"><i class="icon-user-2 usercontrols-icon"></i></button>
                        </div>
                    </div>
                </div>
                <div class="header-bottom">
                    <ul class="bottom-menu">
                        <li class="menu-item"><router-link to="/et">Et, Tavuk,<br>Hindi</router-link></li>
                        <li class="menu-item"><router-link to="/sut">Süt, Yoğurt,<br>Süt Ürünleri</router-link></li>
                        <li class="menu-item"><router-link to="/kahvaltilik">Kahvaltılık</router-link></li>
                        <li class="menu-item"><router-link to="/temizlik">Temizlik</router-link></li>
                        <li class="menu-item"><a href="https://www.ceptesok.com/yemeklik-malzemeler" data-menu="top-menu4" class="topmenu-trigger">Yemeklik<br>Malzemeler</a></li>
                        <li class="menu-item"><a href="https://www.ceptesok.com/icecek" data-menu="top-menu5" class="topmenu-trigger">İçecek</a></li>
                        <li class="menu-item"><a href="https://www.ceptesok.com/biskuvi-cikolata-kuruyemis" data-menu="top-menu6" class="topmenu-trigger">Bisküvi, Çikolata,<br>Kuruyemiş</a></li>
                        <li class="menu-item"><a href="https://www.ceptesok.com/unlu-mamuller-pastane" data-menu="top-menu7" class="topmenu-trigger">Unlu<br>Mamüller</a></li>
                        <li class="menu-item"><a href="https://www.ceptesok.com/meyve-sebze" data-menu="top-menu8" class="topmenu-trigger">Meyve,<br>Sebze</a></li>
                        <li class="menu-item"><a href="https://www.ceptesok.com/kisisel-bakim" data-menu="top-menu10" class="topmenu-trigger">Kişisel<br>Bakım</a></li>
                        <li class="menu-item"><a href="https://www.ceptesok.com/elektronik-giyim-diger" data-menu="top-menu11" class="topmenu-trigger">Gıda<br>Dışı</a></li>
                        <li class="menu-item"><a href="https://www.ceptesok.com/bebek-urunleri" data-menu="top-menu12" class="topmenu-trigger">Bebek<br>Ürünleri</a></li>
                    </ul>
                </div>
                                                                                    <!-- bottom-mobile-menutrigger bottom-mobile-button topmenu-trigger click hover -->
                <div class="header-bottom-mobile"><button data-menu="menu-mobile" v-bind:class="{'hover':active}" class="bottom-mobile-menutrigger bottom-mobile-button topmenu-trigger click" @click="activeChange($event)"><i class="icon-menu"></i> Kategoriler
                    </button>
                </div>
            </div>
        </div> 
        <div class="topmenu"  v-bind:class="{'active show':active}">
            <div class="menu-banners"><a href="https://www.ceptesok.com/kampanyalar#/" class="banners-banner imagefit"><img src="../img/55b1299dbab692fb2c8a3881fdf9d912.jpg" class="imagefit-img abs"></a><a href="https://www.ceptesok.com/taze-meyve-sebze#/" class="banners-banner imagefit"><img src="../img/36adde3b21ae3d9aedf0d4694742dbef.jpg" class="imagefit-img abs"></a></div>
            <div class="menu-wrap wrapper">
                <div id="menu-mobile" class="menu-content active">
                    <ul class="menu-items">
                        <li class="items-item">
                            <button class="item-button"><router-link to="/et">Et &amp;&nbsp;Tavuk &amp;&nbsp;Hindi &amp;&nbsp;Balık</router-link></button> 
                            <ul class="item-submenu">
                                <li class="submenu-item">
                                    <button class="submenu-button"> </button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kirmizi-et/dana-salam" class="submenu-button">Dana Salam</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kirmizi-et/dana-sucuk" class="submenu-button">Dana Sucuk</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kirmizi-et/dana-paket" class="submenu-button">Dana Paket</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kirmizi-et/kiyma" class="submenu-button">Kıyma</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kirmizi-et/dana-sosis" class="submenu-button">Dana Sosis</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kirmizi-et/doner-dana-et" class="submenu-button">Döner Dana Et</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kirmizi-et/kiymalik-dana-et" class="submenu-button">Kıymalık Dana Et</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kirmizi-et/et-kofte" class="submenu-button">Et Köfte</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kirmizi-et/kusbasilik-dana-et" class="submenu-button">Kuşbaşılık Dana Et</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kirmizi-et/dana-kavurma" class="submenu-button">Dana Kavurma</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kirmizi-et/sakatat" class="submenu-button">Sakatat</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kirmizi-et/dana-pastirma" class="submenu-button">Dana Pastırma</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kirmizi-et/dondurulmus-kofte" class="submenu-button">Dondurulmuş Köfte</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button"> </button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/tavuk-eti/pilic-sosis" class="submenu-button">Piliç Sosis</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/tavuk-eti/pilic-salam" class="submenu-button">Piliç Salam</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/tavuk-eti/pilic-sucuk" class="submenu-button">Piliç Sucuk</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/tavuk-eti/parca-pilic-kanat-but-gogus-ciger" class="submenu-button">Parça Piliç - Kanat, But, Göğüs, Ciğer</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/tavuk-eti/hazir-schnitzel-nugget-doner-kofte" class="submenu-button">Hazır - Schnitzel, Nugget, Döner, Köfte</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/tavuk-eti/pilic-jambon" class="submenu-button">Piliç Jambon</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/tavuk-eti/butun-pilic" class="submenu-button">Bütün Piliç</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Hindi Eti</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hindi-eti/hindi-salam" class="submenu-button">Hindi Salam</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hindi-eti/hindi-fume" class="submenu-button">Hindi Füme</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hindi-eti/hindi-sosis" class="submenu-button">Hindi Sosis</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hindi-eti/butun-hindi" class="submenu-button">Bütün Hindi</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Ton Balığı</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ton-baligi" class="submenu-button">Ton Balığı (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Yumurta</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/yumurta" class="submenu-button">Yumurta (Tümü)</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button"><router-link to="/sut">Süt, Yoğurt ve&nbsp;Süt Ürünleri</router-link></button> 
                            <ul class="item-submenu">
                                <li class="submenu-item">
                                    <button class="submenu-button">Süt</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sut" class="submenu-button">Süt (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Yoğurtlar</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/yogurtlar/light-biotik-yogurt" class="submenu-button">Light &amp; Biotik Yoğurt</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/yogurtlar/yogurt" class="submenu-button">Yoğurt</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/yogurtlar/meyveli-yogurt" class="submenu-button">Meyveli Yoğurt</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Peynirler</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/peynirler/diger-peynirler" class="submenu-button">Diğer Peynirler</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/peynirler/ucgen-peynir" class="submenu-button">Üçgen Peynir</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/peynirler/kasar-peynir" class="submenu-button">Kaşar Peynir</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/peynirler/krem-peynir" class="submenu-button">Krem Peynir</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/peynirler/tulum-peynir" class="submenu-button">Tulum Peynir</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/peynirler/beyaz-peynir" class="submenu-button">Beyaz Peynir</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Tereyağ &amp; Margarin</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/tereyag-margarin/tereyag" class="submenu-button">Tereyağ</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/tereyag-margarin/margarin" class="submenu-button">Margarin</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Kaymak &amp; Krema</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kaymak-krema/krema" class="submenu-button">Krema</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kaymak-krema/kaymak" class="submenu-button">Kaymak</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Ayran &amp; Kefir</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ayran-kefir/kefir" class="submenu-button">Kefir</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ayran-kefir/ayran" class="submenu-button">Ayran</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Dondurma</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/dondurma" class="submenu-button">Dondurma (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Süt Tozu ve Krema</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sut-tozu-ve-krema" class="submenu-button">Süt Tozu ve Krema (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Sütlü Tatlılar</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sutlu-tatlilar" class="submenu-button">Sütlü Tatlılar (Tümü)</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Yemeklik Malzemeler</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item">
                                    <button class="submenu-button">Tuz, Baharat, Harç</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/tuz-baharat-harc/harc" class="submenu-button">Harç</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/tuz-baharat-harc/baharat" class="submenu-button">Baharat</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/tuz-baharat-harc/tuz" class="submenu-button">Tuz</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/tuz-baharat-harc/bulyon" class="submenu-button">Bulyon</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Hazır Tatlılar</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hazir-tatlilar/serbetli-tatlilar" class="submenu-button">Şerbetli Tatlılar</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hazir-tatlilar/pastane-tatlilari" class="submenu-button">Pastane Tatlıları</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Sıvı Yağlar</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sivi-yaglar/kizartma-yagi" class="submenu-button">Kızartma Yağı</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sivi-yaglar/misirozu-yagi" class="submenu-button">Mısırözü Yağı</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sivi-yaglar/susuz-yag" class="submenu-button">Susuz Yağ</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sivi-yaglar/aycicek-yagi" class="submenu-button">Ayçiçek Yağı</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sivi-yaglar/kanola-yag" class="submenu-button">Kanola Yağ</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sivi-yaglar/zeytinyagi" class="submenu-button">Zeytinyağı</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Tereyağ &amp; Margarin</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/tereyag-margarin/margarin" class="submenu-button">Margarin</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/tereyag-margarin/tereyag" class="submenu-button">Tereyağ</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Makarna</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/makarna/makarna" class="submenu-button">Makarna</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/makarna/kuskus" class="submenu-button">Kuskus</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/makarna/eriste" class="submenu-button">Erişte</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Un</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/un" class="submenu-button">Un (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Şeker</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/seker/kup-seker" class="submenu-button">Küp Şeker</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/seker/toz-seker" class="submenu-button">Toz Şeker</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Bakliyat - Bulgur - Pirinç</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/sari-mercimek" class="submenu-button">Sarı Mercimek</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/pilavlik-bulgur" class="submenu-button">Pilavlık Bulgur</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/pirinc" class="submenu-button">Pirinç</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/kirmizi-mercimek" class="submenu-button">Kırmızı Mercimek</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/muhtelif" class="submenu-button">Muhtelif</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/yesil-mercimek" class="submenu-button">Yeşil Mercimek</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/koftelik-bulgur" class="submenu-button">Köftelik Bulgur</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/nohut" class="submenu-button">Nohut</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/fasulye" class="submenu-button">Fasulye</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/borulce" class="submenu-button">Börülce</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/misir" class="submenu-button">Mısır</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/bugday" class="submenu-button">Buğday</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/barbunya" class="submenu-button">Barbunya</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Hazır Yemek &amp; Çorba &amp; Meze</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hazir-yemek-corba-meze/dolma" class="submenu-button">Dolma</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hazir-yemek-corba-meze/sandvic" class="submenu-button">Sandviç</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hazir-yemek-corba-meze/bulyon" class="submenu-button">Bulyon</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hazir-yemek-corba-meze/pogaca-borek-unlu-mamuller" class="submenu-button">Poğaça / Börek / Unlu Mamüller</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hazir-yemek-corba-meze/meze" class="submenu-button">Meze</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hazir-yemek-corba-meze/corba" class="submenu-button">Çorba</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hazir-yemek-corba-meze/cig-kofte" class="submenu-button">Çiğ Köfte</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hazir-yemek-corba-meze/manti" class="submenu-button">Mantı</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hazir-yemek-corba-meze/dondurulmus-pizza" class="submenu-button">Dondurulmuş Pizza</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Hamur ve Pasta Malzemeleri</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/maya" class="submenu-button">Maya</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/pirinc-unu" class="submenu-button">Pirinç Unu</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/kabartma-tozu" class="submenu-button">Kabartma Tozu</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/krema-ve-sos" class="submenu-button">Krema ve Sos</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/yufka" class="submenu-button">Yufka</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/toz-tatli" class="submenu-button">Toz Tatlı</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/krem-santi" class="submenu-button">Krem Şanti</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/kakao" class="submenu-button">Kakao</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/nisasta" class="submenu-button">Nişasta</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/pasta-yardimcilari" class="submenu-button">Pasta Yardımcıları</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/kek-ve-pasta-un-karisimlari" class="submenu-button">Kek ve Pasta Un Karışımları</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/pudra-sekeri" class="submenu-button">Pudra Şekeri</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Konserve - Salça</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/konserve-salca/konserve" class="submenu-button">Konserve</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/konserve-salca/salca" class="submenu-button">Salça</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/konserve-salca/tursu" class="submenu-button">Turşu</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Ketçap - Mayonez - Soslar</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/sirke" class="submenu-button">Sirke</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/diger-salata-soslari" class="submenu-button">Diğer Salata Sosları</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/hardal" class="submenu-button">Hardal</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/kahvaltilik-sos" class="submenu-button">Kahvaltılık Sos</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/ketcap" class="submenu-button">Ketçap</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/soya-sosu" class="submenu-button">Soya Sosu</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/ton-baligi" class="submenu-button">Ton Balığı</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/limon-sosu" class="submenu-button">Limon sosu</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/nar-eksisi" class="submenu-button">Nar Ekşisi</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/mayonez" class="submenu-button">Mayonez</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button"><router-link to="/kahvaltilik">Kahvaltılık</router-link></button> 
                            <ul class="item-submenu">
                                <li class="submenu-item">
                                    <button class="submenu-button">Süt</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sut" class="submenu-button">Süt (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Peynir</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/peynir/krem-peynir" class="submenu-button">Krem Peynir</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/peynir/kasar-peynir" class="submenu-button">Kaşar Peynir</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/peynir/ucgen-peynir" class="submenu-button">Üçgen Peynir</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/peynir/diger-peynirler" class="submenu-button">Diğer Peynirler</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/peynir/beyaz-peynir" class="submenu-button">Beyaz Peynir</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/peynir/tulum-peynir" class="submenu-button">Tulum Peynir</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Yumurta</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/yumurta" class="submenu-button">Yumurta (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Ekmek</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ekmek/paket-ekmek-kapali-ekmek" class="submenu-button">Paket Ekmek / Kapalı Ekmek</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ekmek/galeta-grissini" class="submenu-button">Galeta Grissini</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ekmek/lavas-ekmek" class="submenu-button">Lavaş Ekmek</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ekmek/gunluk-ekmek" class="submenu-button">Günlük Ekmek</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Zeytin</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/zeytin/zeytin-ezmesi" class="submenu-button">Zeytin Ezmesi</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/zeytin/yesil-zeytin" class="submenu-button">Yeşil Zeytin</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/zeytin/siyah-zeytin" class="submenu-button">Siyah Zeytin</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Tereyağ &amp; Margarin</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/tereyag-margarin/margarin" class="submenu-button">Margarin</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/tereyag-margarin/tereyag" class="submenu-button">Tereyağ</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Bal &amp; Reçel</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bal-recel/recel" class="submenu-button">Reçel</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bal-recel/bal" class="submenu-button">Bal</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Kaymak &amp; Krema &amp; Sos</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kaymak-krema-sos/kahvaltilik-sos" class="submenu-button">Kahvaltılık Sos</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kaymak-krema-sos/krema" class="submenu-button">Krema</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kaymak-krema-sos/kaymak" class="submenu-button">Kaymak</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Çay &amp; Kahve</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/cay-kahve/seker" class="submenu-button">Şeker</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/cay-kahve/cay" class="submenu-button">Çay</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/cay-kahve/kahve" class="submenu-button">Kahve</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Şarküteri</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sarkuteri/dana-salam" class="submenu-button">Dana Salam</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sarkuteri/pilic-jambon" class="submenu-button">Piliç Jambon</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sarkuteri/dana-sosis" class="submenu-button">Dana Sosis</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sarkuteri/pilic-sosis" class="submenu-button">Piliç Sosis</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sarkuteri/hindi-salam" class="submenu-button">Hindi Salam</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sarkuteri/dana-kavurma" class="submenu-button">Dana Kavurma</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sarkuteri/hindi-sosis" class="submenu-button">Hindi Sosis</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sarkuteri/dana-pastirma" class="submenu-button">Dana Pastırma</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sarkuteri/dana-sucuk" class="submenu-button">Dana Sucuk</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sarkuteri/pilic-sucuk" class="submenu-button">Piliç Sucuk</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sarkuteri/pilic-salam" class="submenu-button">Piliç Salam</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Krem Çikolata ve Ezmeler</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/krem-cikolata-ve-ezmeler" class="submenu-button">Krem Çikolata ve Ezmeler (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Helva Tahin Pekmez</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/helva-tahin-pekmez/tahin" class="submenu-button">Tahin</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/helva-tahin-pekmez/helva" class="submenu-button">Helva</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/helva-tahin-pekmez/pekmez" class="submenu-button">Pekmez</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Mısır Gevreği &amp; Yulaf</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/misir-gevregi-yulaf/yulaf-ezmesi" class="submenu-button">Yulaf Ezmesi</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/misir-gevregi-yulaf/misir-gevregi" class="submenu-button">Mısır Gevreği</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Pastane ve Fırın Ürünleri</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/pastane-ve-firin-urunleri/pogaca-borek-unlu-mamuller" class="submenu-button">Poğaca / Börek / Unlu Mamüller</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/pastane-ve-firin-urunleri/kurabiye" class="submenu-button">Kurabiye</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">İçecekler</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/icecekler/meyve-suyu" class="submenu-button">Meyve Suyu</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/icecekler/toz-icecekler" class="submenu-button">Toz İçecekler</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">İçecek</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item">
                                    <button class="submenu-button">Gazlı İçecekler</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/gazli-icecekler/enerji-icecekleri" class="submenu-button">Enerji İçecekleri</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/gazli-icecekler/gazoz" class="submenu-button">Gazoz</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/gazli-icecekler/kola" class="submenu-button">Kola</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/gazli-icecekler/malt-icecekler" class="submenu-button">Malt İçecekler</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Gazsız İçecekler</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/gazsiz-icecekler/serbetler" class="submenu-button">Şerbetler</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/gazsiz-icecekler/buzlu-cay-buzlu-kahve" class="submenu-button">Buzlu Çay &amp; Buzlu Kahve</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/gazsiz-icecekler/meyve-suyu" class="submenu-button">Meyve Suyu</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/gazsiz-icecekler/salgam" class="submenu-button">Şalgam</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/gazsiz-icecekler/limonata" class="submenu-button">Limonata</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Su ve Maden Suları</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/su-ve-maden-sulari/maden-suyu" class="submenu-button">Maden Suyu</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/su-ve-maden-sulari/su" class="submenu-button">Su</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Çay &amp; Kahve</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/cay-kahve/cay" class="submenu-button">Çay</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/cay-kahve/sut-tozu-ve-krema" class="submenu-button">Süt Tozu ve Krema</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/cay-kahve/kahve" class="submenu-button">Kahve</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Süt ve Süt Ürünleri</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sut-ve-sut-urunleri/salep" class="submenu-button">Salep</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sut-ve-sut-urunleri/kefir" class="submenu-button">Kefir</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sut-ve-sut-urunleri/sut" class="submenu-button">Süt</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sut-ve-sut-urunleri/boza" class="submenu-button">Boza</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sut-ve-sut-urunleri/ayran" class="submenu-button">Ayran</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Toz İçecekler</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/toz-icecekler" class="submenu-button">Toz İçecekler (Tümü)</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Dondurulmuş Gıda</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item">
                                    <button class="submenu-button">Dondurulmuş Börek</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/dondurulmus-borek" class="submenu-button">Dondurulmuş Börek (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Dondurulmuş Pizza</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/dondurulmus-pizza" class="submenu-button">Dondurulmuş Pizza (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Dondurulmuş Tatlı</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/dondurulmus-tatli" class="submenu-button">Dondurulmuş Tatlı (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Dondurulmuş Köfte</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/dondurulmus-kofte" class="submenu-button">Dondurulmuş Köfte (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Dondurma</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/dondurma" class="submenu-button">Dondurma (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Dondurulmuş Kroket</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/dondurulmus-kroket" class="submenu-button">Dondurulmuş Kroket (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Dondurulmuş Patates Kızartması</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/dondurulmus-patates-kizartmasi" class="submenu-button">Dondurulmuş Patates Kızartması (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Dondurulmuş Mısır</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/dondurulmus-misir" class="submenu-button">Dondurulmuş Mısır (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Dondurulmuş Milföy</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/dondurulmus-milfoy" class="submenu-button">Dondurulmuş Milföy (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Dondurulmuş Bezelye</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/dondurulmus-bezelye" class="submenu-button">Dondurulmuş Bezelye (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Dondurulmuş Pide</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/dondurulmus-pide" class="submenu-button">Dondurulmuş Pide (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Dondurulmuş Mantı</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/dondurulmus-manti" class="submenu-button">Dondurulmuş Mantı (Tümü)</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li class="items-item ">
                            <button class="item-button">Bisküvi &amp;&nbsp;Çikolata &amp;&nbsp;Kuruyemiş</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item">
                                    <button class="submenu-button">Bisküvi - Çikolata</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/biskuvi-cikolata/cikolata" class="submenu-button">Çikolata</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/biskuvi-cikolata/biskuvi" class="submenu-button">Bisküvi</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/biskuvi-cikolata/kek" class="submenu-button">Kek</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/biskuvi-cikolata/draje" class="submenu-button">Draje</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/biskuvi-cikolata/gofret" class="submenu-button">Gofret</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/biskuvi-cikolata/krem-cikolata-ve-ezmeler" class="submenu-button">Krem Çikolata ve Ezmeler</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/biskuvi-cikolata/kraker" class="submenu-button">Kraker</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Kuruyemiş ve Cips</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kuruyemis-ve-cips/kuruyemis" class="submenu-button">Kuruyemiş</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kuruyemis-ve-cips/cips" class="submenu-button">Cips</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kuruyemis-ve-cips/patlamis-misir" class="submenu-button">Patlamış Mısır</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kuruyemis-ve-cips/kuru-meyve" class="submenu-button">Kuru Meyve</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Sakız &amp; Şekerleme</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sakiz-sekerleme/sakiz" class="submenu-button">Sakız</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sakiz-sekerleme/seker" class="submenu-button">Şeker</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sakiz-sekerleme/sekerleme" class="submenu-button">Şekerleme</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Unlu Mamüller &amp;&nbsp;Pastane</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item">
                                    <button class="submenu-button">Ekmek</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ekmek/bazlama-lavas-ekmek" class="submenu-button">Bazlama &amp; Lavaş Ekmek</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ekmek/galeta-ve-grissini" class="submenu-button">Galeta ve Grissini</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ekmek/paket-ekmek-kapali-ekmek" class="submenu-button">Paket Ekmek / Kapalı ekmek</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ekmek/gunluk-ekmek" class="submenu-button">Günlük Ekmek</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Pastane ve Fırın Ürünleri</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/pastane-ve-firin-urunleri/pogaca-borek-unlu-mamul" class="submenu-button">Poğaça / Börek / Unlu Mamül</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/pastane-ve-firin-urunleri/kurabiye" class="submenu-button">Kurabiye</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Hamur &amp; Kek &amp; Pasta Malzemeleri</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/kabartma-tozu" class="submenu-button">Kabartma Tozu</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/kakao" class="submenu-button">Kakao</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/un" class="submenu-button">Un</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/toz-tatli" class="submenu-button">Toz Tatlı</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/krema-ve-sos" class="submenu-button">Krema ve Sos</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/yufka" class="submenu-button">Yufka</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/kek-ve-pasta-un-karisimlari" class="submenu-button">Kek ve Pasta Un Karışımları</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/pasta-yardimcilari" class="submenu-button">Pasta Yardımcıları</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/nisasta" class="submenu-button">Nişasta</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/krem-santi" class="submenu-button">Krem Şanti</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/maya" class="submenu-button">Maya</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/pirinc-unu" class="submenu-button">Pirinç Unu</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Tatlılar</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/tatlilar/toz-tatlilar" class="submenu-button">Toz Tatlılar</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/tatlilar/puding" class="submenu-button">Puding</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/tatlilar/hazir-tatli" class="submenu-button">Hazır Tatlı</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Meyve - Sebze</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item">
                                    <button class="submenu-button">Sebze</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sebze/yesillik-ve-ot" class="submenu-button">Yeşillik ve Ot</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sebze/mevsim-sebzeleri" class="submenu-button">Mevsim Sebzeleri</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sebze/salata-malzemeleri" class="submenu-button">Salata Malzemeleri</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sebze/patates-sogan-sarimsak" class="submenu-button">Patates, Soğan, Sarımsak</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sebze/paket-sebze" class="submenu-button">Paket Sebze</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Meyve</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/meyve/paket-meyve" class="submenu-button">Paket Meyve</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/meyve/kuru-meyve" class="submenu-button">Kuru Meyve</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/meyve/narenciye" class="submenu-button">Narenciye</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/meyve/mevsim-meyveleri" class="submenu-button">Mevsim Meyveleri</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/meyve/egzotik-meyve" class="submenu-button">Egzotik Meyve</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Kişisel Bakım</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item">
                                    <button class="submenu-button">Kadın Bakım &amp; Kozmetik</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/sac-boyalari" class="submenu-button">Saç Boyaları</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/makyaj-pamuk-ve-pedleri" class="submenu-button">Makyaj Pamuk ve Pedleri</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/oje" class="submenu-button">Oje</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/tuy-dokucu" class="submenu-button">Tüy Dökücü</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/bb-kremler" class="submenu-button">BB Kremler</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/maskara" class="submenu-button">Maskara</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/ruj" class="submenu-button">Ruj</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/goz-kalemi-eyeliner" class="submenu-button">Göz Kalemi / Eyeliner</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/agda" class="submenu-button">Ağda</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/hijyenik-ped" class="submenu-button">Hijyenik Ped</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/kadin-roll-on-deodorant" class="submenu-button">Kadın Roll On Deodorant</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/kadin-parfum" class="submenu-button">Kadın Parfüm</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/yuz-temizleme" class="submenu-button">Yüz Temizleme</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/aseton" class="submenu-button">Aseton</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/kadin-sprey-deodorant" class="submenu-button">Kadın Sprey Deodorant</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/kadin-tiras-bicagi" class="submenu-button">Kadın Tıraş Bıçağı</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/aksesuar" class="submenu-button">Aksesuar</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Erkek Bakım &amp; Kozmetik</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/erkek-bakim-kozmetik/tiras-kopugu" class="submenu-button">Tıraş Köpüğü</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/erkek-bakim-kozmetik/erkek-sprey-deodorant" class="submenu-button">Erkek Sprey Deodorant</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/erkek-bakim-kozmetik/tiras-kolonyasi" class="submenu-button">Tıraş Kolonyası</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/erkek-bakim-kozmetik/parfum" class="submenu-button">Parfüm</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/erkek-bakim-kozmetik/tiras-bicagi" class="submenu-button">Tıraş Bıçağı</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/erkek-bakim-kozmetik/erkek-roll-on-deodorant" class="submenu-button">Erkek Roll On Deodorant</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Banyo &amp; Duş &amp; Şampuan</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/banyo-dus-sampuan/sabun" class="submenu-button">Sabun</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/banyo-dus-sampuan/vucut-sampuani" class="submenu-button">Vücut Şampuanı</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/banyo-dus-sampuan/sac-kremi" class="submenu-button">Saç Kremi</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/banyo-dus-sampuan/kulak-cubugu" class="submenu-button">Kulak Çubuğu</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/banyo-dus-sampuan/sampuan" class="submenu-button">Şampuan</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/banyo-dus-sampuan/lif-sungerler" class="submenu-button">Lif &amp; Süngerler</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Ağız Bakım Ürünleri</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/agiz-bakim-urunleri/agiz-bakim" class="submenu-button">Ağız Bakım</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/agiz-bakim-urunleri/kurdan" class="submenu-button">Kürdan</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/agiz-bakim-urunleri/dis-ipi" class="submenu-button">Diş İpi</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/agiz-bakim-urunleri/dis-fircasi" class="submenu-button">Diş Fırçası</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/agiz-bakim-urunleri/dis-macunu" class="submenu-button">Diş Macunu</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Yüz Bakım</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/yuz-bakim/temizleme-urunleri" class="submenu-button">Temizleme Ürünleri</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/yuz-bakim/ozel-kremler-kirisiklik" class="submenu-button">Özel Kremler (Kırışıklık)</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/yuz-bakim/dudak-koruyucular" class="submenu-button">Dudak Koruyucular</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/yuz-bakim/yuz-maskeleri" class="submenu-button">Yüz Maskeleri</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/yuz-bakim/gunluk-bakim-kremleri" class="submenu-button">Günlük Bakım Kremleri </a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Vücut &amp; El &amp; Ayak Bakım</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/vucut-el-ayak-bakim/vucut-yagi" class="submenu-button">Vücut Yağı</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/vucut-el-ayak-bakim/vucut-el-kremi" class="submenu-button">Vücut El Kremi</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/vucut-el-ayak-bakim/ayak-bakim-kremi" class="submenu-button">Ayak Bakım Kremi</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/vucut-el-ayak-bakim/pedikur-manikur" class="submenu-button">Pedikür &amp; Manikür</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Saç Bakım</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sac-bakim/sac-kremi" class="submenu-button">Saç Kremi</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sac-bakim/tarak-toka" class="submenu-button">Tarak &amp; Toka</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sac-bakim/sac-bakimi" class="submenu-button">Saç Bakımı</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sac-bakim/sac-sekillendirici" class="submenu-button">Saç Şekillendirici</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sac-bakim/sac-boyasi" class="submenu-button">Saç Boyası</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Kağıt &amp; Peçete &amp; Mendil &amp; Pamuk &amp; Ped</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil-pamuk-ped/hijyenik-ped" class="submenu-button">Hijyenik Ped</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil-pamuk-ped/islak-mendil-havlu" class="submenu-button">Islak Mendil &amp; Havlu</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil-pamuk-ped/kagit-havlu" class="submenu-button">Kağıt Havlu</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil-pamuk-ped/pamukkulak-cubugu" class="submenu-button">Pamuk&amp;Kulak Çubuğu</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil-pamuk-ped/tuvalet-kagidi" class="submenu-button">Tuvalet Kağıdı</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil-pamuk-ped/kagit-mendil" class="submenu-button">Kağıt Mendil</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil-pamuk-ped/kagit-pecete" class="submenu-button">Kağıt Peçete</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Sağlık &amp; Hasta Bakım</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/saglik-hasta-bakim/yara-bandi" class="submenu-button">Yara Bandı</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/saglik-hasta-bakim/prezervatif" class="submenu-button">Prezervatif</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/saglik-hasta-bakim/medikal-urunler" class="submenu-button">Medikal Ürünler </a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/saglik-hasta-bakim/hasta-bezi" class="submenu-button">Hasta Bezi</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/saglik-hasta-bakim/agri-bandi" class="submenu-button">Ağrı Bandı</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Güneş Bakım Ürünleri</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/gunes-bakim-urunleri/gunes-yaglari-losyonlar-sut" class="submenu-button">Güneş Yağları &amp; Losyonlar &amp; Süt</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/gunes-bakim-urunleri/bakim-sutu" class="submenu-button">Bakım Sütü</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Kolonya</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kolonya/kolonyalar" class="submenu-button">Kolonyalar</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button"><router-link to="/temizlik">Temizlik</router-link></button> 
                            <ul class="item-submenu">
                                <li class="submenu-item">
                                    <button class="submenu-button">Bulaşık</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bulasik/makine-temizleyicisi" class="submenu-button">Makine Temizleyicisi</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bulasik/makine-tuzu" class="submenu-button">Makine Tuzu</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bulasik/parlatici" class="submenu-button">Parlatıcı</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bulasik/eldiven" class="submenu-button">Eldiven</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bulasik/makine-kokusu" class="submenu-button">Makine Kokusu</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bulasik/bulasik-tabletdeterjani" class="submenu-button">Bulaşık Tablet/Deterjanı</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bulasik/bulasik-bezi" class="submenu-button">Bulaşık Bezi</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bulasik/bulasik-sungeri-ve-teli" class="submenu-button">Bulaşık Süngeri ve Teli</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Mutfak Yardımcıları</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/mutfak-yardimcilari/aluminyum-folyo" class="submenu-button">Alüminyum Folyo</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/mutfak-yardimcilari/buzdolabi-poseti" class="submenu-button">Buzdolabı Poşeti</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/mutfak-yardimcilari/firin-torbasi" class="submenu-button">Fırın Torbası</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/mutfak-yardimcilari/cop-torbalari" class="submenu-button">Çöp Torbaları</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/mutfak-yardimcilari/strec-film" class="submenu-button">Streç Film</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/mutfak-yardimcilari/pisirme-kagidi" class="submenu-button">Pişirme Kağıdı</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Çamaşır</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/camasir/camasir-deterjani" class="submenu-button">Çamaşır Deterjanı</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/camasir/renk-koruyucu" class="submenu-button">Renk Koruyucu</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/camasir/camasir-yumusaticisi" class="submenu-button">Çamaşır Yumuşatıcısı</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/camasir/camasir-suyu" class="submenu-button">Çamaşır Suyu</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/camasir/leke-cikarici" class="submenu-button">Leke Çıkarıcı</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/camasir/kirec-onleyici" class="submenu-button">Kireç Önleyici</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/camasir/bebek-deterjani" class="submenu-button">Bebek Deterjanı</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Ev Temizleyicileri</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/tuvalet-kokusu-giderici" class="submenu-button">Tuvalet Kokusu Giderici</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/kirec-sokucu" class="submenu-button">Kireç Sökücü</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/cop-torbasi" class="submenu-button">Çöp Torbası</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/lavabo-acici" class="submenu-button">Lavabo Açıcı</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/camasir-suyu" class="submenu-button">Çamaşır Suyu</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/oda-kokusu" class="submenu-button">Oda Kokusu</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/cam-temizleyici" class="submenu-button">Cam Temizleyici</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/firca-ve-paspaslar" class="submenu-button">Fırça ve Paspaslar</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/fiber-bezler" class="submenu-button">Fiber Bezler</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/banyo-mutfak-yuzey-temizleyici" class="submenu-button">Banyo / Mutfak / Yüzey Temizleyici</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/bulasik-sungeri" class="submenu-button">Bulaşık Süngeri</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/ahsap-temizleyici" class="submenu-button">Ahşap Temizleyici</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/eldiven" class="submenu-button">Eldiven</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/temizlik-setleri" class="submenu-button">Temizlik Setleri</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/hali-sampuani" class="submenu-button">Halı Şampuanı</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/temizlik-bezleri" class="submenu-button">Temizlik Bezleri</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Sabun</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/sabun" class="submenu-button">Sabun (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Kağıt &amp; Peçete &amp; Mendil</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil/kagit-mendil" class="submenu-button">Kağıt Mendil</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil/islak-mendil-havlu" class="submenu-button">Islak Mendil &amp; Havlu</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil/kagit-pecete" class="submenu-button">Kağıt Peçete</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil/kagit-havlu" class="submenu-button">Kağıt Havlu</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil/tuvalet-kagidi" class="submenu-button">Tuvalet Kağıdı</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Elektronik &amp;&nbsp;Giyim &amp;&nbsp;Diğer</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item">
                                    <button class="submenu-button">Elektrikli ve Elektronik Ev Aletleri</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/telefonlar" class="submenu-button">Telefonlar </a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/goruntu-ve-ses-sistemleri" class="submenu-button">Görüntü ve Ses Sistemleri</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/pil" class="submenu-button">Pil</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/fotograf-makinalari-ve-kamera" class="submenu-button">Fotoğraf Makinaları ve Kamera</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/aydinlatma-cihazlar" class="submenu-button">Aydınlatma Cihazlar</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/kablo-priz-adaptor" class="submenu-button">Kablo &amp; Priz &amp; Adaptör</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/monitor" class="submenu-button">Monitör</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/ampul" class="submenu-button">Ampul</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/bilgisayar-tablet-ve-aksesuarlari" class="submenu-button">Bilgisayar &amp; Tablet ve Aksesuarları</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/telefon-aksesuarlari" class="submenu-button">Telefon Aksesuarları</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/televizyonlar" class="submenu-button">Televizyonlar</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/elektrikli-kisisel-bakim-saglik" class="submenu-button">Elektrikli Kişisel Bakım &amp; Sağlık</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/kucuk-ev-aletleri" class="submenu-button">Küçük Ev Aletleri</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/beyaz-esyalar" class="submenu-button">Beyaz Eşyalar</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/isitma-sogutma-sistemleri" class="submenu-button">Isıtma &amp; Soğutma Sistemleri</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Giyim &amp; Ayakkabı &amp; Aksesuar</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/ic-camasiri" class="submenu-button">İç Çamaşırı</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/dis-giyim" class="submenu-button">Dış Giyim</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/canta" class="submenu-button">Çanta</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/ayakkabi-bot-sandalet" class="submenu-button">Ayakkabı &amp; Bot &amp; Sandalet</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/pijama" class="submenu-button">Pijama</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/semsiye" class="submenu-button">Şemsiye</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/ayakkabi-boyasi" class="submenu-button">Ayakkabı Boyası</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/aksesuar" class="submenu-button">Aksesuar</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/terlik" class="submenu-button">Terlik</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/plaj-kiyafetleri" class="submenu-button">Plaj Kıyafetleri</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/corap" class="submenu-button">Çorap</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/ayakkabi-sungeri" class="submenu-button">Ayakkabı Süngeri</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Züccaciye ve Ev Eşyaları</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/camasir-kurutma" class="submenu-button">Çamaşır Kurutma</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/aski" class="submenu-button">Askı</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/mangal-aksesuar" class="submenu-button">Mangal &amp; Aksesuar</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/kullan-at-mutfak-esyalari" class="submenu-button">Kullan At Mutfak Eşyaları</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/ev-mobilyalari" class="submenu-button">Ev Mobilyaları</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/mutfak-saklama-gerecleri" class="submenu-button">Mutfak Saklama Gereçleri</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/mutfak-pisirici-gerecler" class="submenu-button">Mutfak Pişirici Gereçler</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/bardaklar" class="submenu-button">Bardaklar</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/sofra-servis" class="submenu-button">Sofra-Servis</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/dekoratif-urunler" class="submenu-button">Dekoratif Ürünler</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/tabak-kase" class="submenu-button">Tabak / Kase</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/mutfak-plastik-urunleri" class="submenu-button">Mutfak Plastik Ürünleri</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/cay-bardagi" class="submenu-button">Çay Bardağı</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/mutfak-el-aletleri" class="submenu-button">Mutfak El Aletleri</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/banyo-mutfak-oda-duzenleme" class="submenu-button">Banyo &amp; Mutfak &amp; Oda Düzenleme</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/banyo-setleri" class="submenu-button">Banyo Setleri</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/surahiler" class="submenu-button">Sürahiler</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/porselen-seramik-urunler" class="submenu-button">Porselen Seramik Ürünler</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/cakmak-kibrit" class="submenu-button">Çakmak / Kibrit</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Haşare Öldürücüleri</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hasare-olduruculeri/yemler" class="submenu-button">Yemler</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hasare-olduruculeri/spreyler" class="submenu-button">Spreyler</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hasare-olduruculeri/makineler" class="submenu-button">Makineler</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hasare-olduruculeri/matlar" class="submenu-button">Matlar</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/hasare-olduruculeri/likitler" class="submenu-button">Likitler</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Ev Tekstili</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ev-tekstili/ev-tekstili" class="submenu-button">Ev Tekstili</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ev-tekstili/yatak-urunleri" class="submenu-button">Yatak Ürünleri</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ev-tekstili/duzenleme" class="submenu-button">Düzenleme</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/ev-tekstili/havlu-urunleri" class="submenu-button">Havlu Ürünleri</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Fırsat Ürünleri</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/firsat-urunleri/seyahat-gerecleri" class="submenu-button">Seyahat Gereçleri</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/firsat-urunleri/bahce-urunleri" class="submenu-button">Bahçe Ürünleri</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/firsat-urunleri/hobi" class="submenu-button">Hobi</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/firsat-urunleri/parti-ve-sus-urunleri" class="submenu-button">Parti ve Süs Ürünleri</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/firsat-urunleri/deniz-tatili-urunleri" class="submenu-button">Deniz Tatili Ürünleri</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/firsat-urunleri/spor-urunleri" class="submenu-button">Spor Ürünleri</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/firsat-urunleri/oto-bakim-ve-aksesuarlari" class="submenu-button">Oto Bakım ve Aksesuarları</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/firsat-urunleri/nalburiye-hirdavat-urunleri" class="submenu-button">Nalburiye - Hırdavat Ürünleri</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/firsat-urunleri/bebek-bakim-araclari" class="submenu-button">Bebek Bakım Araçları</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/firsat-urunleri/muzik" class="submenu-button">Müzik</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/firsat-urunleri/tekne-ve-balikcilik-urunleri" class="submenu-button">Tekne ve Balıkçılık Ürünleri</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/firsat-urunleri/kamp-urunleri" class="submenu-button">Kamp Ürünleri</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Oyuncaklar</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/oyuncaklar/oyuncaklar" class="submenu-button">Oyuncaklar</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Medya &amp; Kırtasiye</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/medya-kirtasiye/kirtasiye-urunleri" class="submenu-button">Kırtasiye Ürünleri</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/medya-kirtasiye/defterler" class="submenu-button">Defterler</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/medya-kirtasiye/kitaplar" class="submenu-button">Kitaplar</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/medya-kirtasiye/gazeteler" class="submenu-button">Gazeteler</a></li>
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/medya-kirtasiye/dergiler" class="submenu-button">Dergiler</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Bebek Ürünleri</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item">
                                    <button class="submenu-button">Bebek Maması</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bebek-mamasi" class="submenu-button">Bebek Maması (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Bebek Eşyaları</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bebek-esyalari" class="submenu-button">Bebek Eşyaları (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Bebek Bezi</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bebek-bezi" class="submenu-button">Bebek Bezi (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Islak Havlu &amp; Mendil</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/islak-havlu-mendil" class="submenu-button">Islak Havlu &amp; Mendil (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Bebek Saç Şampuanı</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bebek-sac-sampuani" class="submenu-button">Bebek Saç Şampuanı (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Bebek Kolonyaları</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bebek-kolonyalari" class="submenu-button">Bebek Kolonyaları (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Bebek Yağları</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bebek-yaglari" class="submenu-button">Bebek Yağları (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Bebek Deterjanı</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bebek-deterjani" class="submenu-button">Bebek Deterjanı (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Bebek Yumuşatıcısı</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bebek-yumusaticisi" class="submenu-button">Bebek Yumuşatıcısı (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Bebek Bakım Setleri</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bebek-bakim-setleri" class="submenu-button">Bebek Bakım Setleri (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Bebek Kremleri</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/bebek-kremleri" class="submenu-button">Bebek Kremleri (Tümü)</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Light Ürünler</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item">
                                    <button class="submenu-button">Light Ürünler</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/light-urunler" class="submenu-button">Light Ürünler (Tümü)</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Evcil Hayvan Ürünleri</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item">
                                    <button class="submenu-button">Kuş Yemi</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kus-yemi" class="submenu-button">Kuş Yemi (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Evcil Hayvan Ürünleri</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/evcil-hayvan-urunleri" class="submenu-button">Evcil Hayvan Ürünleri (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Köpek Maması</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kopek-mamasi" class="submenu-button">Köpek Maması (Tümü)</a></li>
                                    </ul>
                                </li>
                                <li class="submenu-item">
                                    <button class="submenu-button">Kedi Maması</button> 
                                    <ul class="item-submenu">
                                        <li class="submenu-item"><a href="https://www.ceptesok.com/kedi-mamasi" class="submenu-button">Kedi Maması (Tümü)</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div id="top-menu1" class="menu-content" v-if="gor">
                    <ul class="menu-items">
                        <li class="items-item" v-for="item in getCategories(1242)" :key="item.data">
                            <button class="item-button" >{{item.name}}</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kirmizi-et/dana-salam" class="submenu-button" v-for="sub in  getSubCategories(1252)" :key="sub.data">{{sub.name}}</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div id="top-menu2" class="menu-content">
                    <ul class="menu-items">
                        <li class="items-item">
                            <button class="item-button">Süt</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sut" class="submenu-button">Süt (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Yoğurtlar</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/yogurtlar/light-biotik-yogurt" class="submenu-button">Light &amp; Biotik Yoğurt</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/yogurtlar/yogurt" class="submenu-button">Yoğurt</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/yogurtlar/meyveli-yogurt" class="submenu-button">Meyveli Yoğurt</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Peynirler</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/peynirler/diger-peynirler" class="submenu-button">Diğer Peynirler</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/peynirler/ucgen-peynir" class="submenu-button">Üçgen Peynir</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/peynirler/kasar-peynir" class="submenu-button">Kaşar Peynir</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/peynirler/krem-peynir" class="submenu-button">Krem Peynir</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/peynirler/tulum-peynir" class="submenu-button">Tulum Peynir</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/peynirler/beyaz-peynir" class="submenu-button">Beyaz Peynir</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Tereyağ &amp; Margarin</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/tereyag-margarin/tereyag" class="submenu-button">Tereyağ</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/tereyag-margarin/margarin" class="submenu-button">Margarin</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Kaymak &amp; Krema</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kaymak-krema/krema" class="submenu-button">Krema</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kaymak-krema/kaymak" class="submenu-button">Kaymak</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Ayran &amp; Kefir</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ayran-kefir/kefir" class="submenu-button">Kefir</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ayran-kefir/ayran" class="submenu-button">Ayran</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Dondurma</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/dondurma" class="submenu-button">Dondurma (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Süt Tozu ve Krema</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sut-tozu-ve-krema" class="submenu-button">Süt Tozu ve Krema (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Sütlü Tatlılar</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sutlu-tatlilar" class="submenu-button">Sütlü Tatlılar (Tümü)</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div id="top-menu4" class="menu-content">
                    <ul class="menu-items">
                        <li class="items-item">
                            <button class="item-button">Tuz, Baharat, Harç</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/tuz-baharat-harc/harc" class="submenu-button">Harç</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/tuz-baharat-harc/baharat" class="submenu-button">Baharat</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/tuz-baharat-harc/tuz" class="submenu-button">Tuz</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/tuz-baharat-harc/bulyon" class="submenu-button">Bulyon</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Hazır Tatlılar</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hazir-tatlilar/serbetli-tatlilar" class="submenu-button">Şerbetli Tatlılar</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hazir-tatlilar/pastane-tatlilari" class="submenu-button">Pastane Tatlıları</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Sıvı Yağlar</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sivi-yaglar/kizartma-yagi" class="submenu-button">Kızartma Yağı</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sivi-yaglar/misirozu-yagi" class="submenu-button">Mısırözü Yağı</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sivi-yaglar/susuz-yag" class="submenu-button">Susuz Yağ</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sivi-yaglar/aycicek-yagi" class="submenu-button">Ayçiçek Yağı</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sivi-yaglar/kanola-yag" class="submenu-button">Kanola Yağ</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sivi-yaglar/zeytinyagi" class="submenu-button">Zeytinyağı</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Tereyağ &amp; Margarin</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/tereyag-margarin/margarin" class="submenu-button">Margarin</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/tereyag-margarin/tereyag" class="submenu-button">Tereyağ</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Makarna</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/makarna/makarna" class="submenu-button">Makarna</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/makarna/kuskus" class="submenu-button">Kuskus</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/makarna/eriste" class="submenu-button">Erişte</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Un</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/un" class="submenu-button">Un (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Şeker</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/seker/kup-seker" class="submenu-button">Küp Şeker</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/seker/toz-seker" class="submenu-button">Toz Şeker</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Bakliyat - Bulgur - Pirinç</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/sari-mercimek" class="submenu-button">Sarı Mercimek</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/pilavlik-bulgur" class="submenu-button">Pilavlık Bulgur</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/pirinc" class="submenu-button">Pirinç</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/kirmizi-mercimek" class="submenu-button">Kırmızı Mercimek</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/muhtelif" class="submenu-button">Muhtelif</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/yesil-mercimek" class="submenu-button">Yeşil Mercimek</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/koftelik-bulgur" class="submenu-button">Köftelik Bulgur</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/nohut" class="submenu-button">Nohut</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/fasulye" class="submenu-button">Fasulye</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/borulce" class="submenu-button">Börülce</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/misir" class="submenu-button">Mısır</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/bugday" class="submenu-button">Buğday</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/barbunya" class="submenu-button">Barbunya</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Hazır Yemek &amp; Çorba &amp; Meze</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hazir-yemek-corba-meze/dolma" class="submenu-button">Dolma</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hazir-yemek-corba-meze/sandvic" class="submenu-button">Sandviç</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hazir-yemek-corba-meze/bulyon" class="submenu-button">Bulyon</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hazir-yemek-corba-meze/pogaca-borek-unlu-mamuller" class="submenu-button">Poğaça / Börek / Unlu Mamüller</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hazir-yemek-corba-meze/meze" class="submenu-button">Meze</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hazir-yemek-corba-meze/corba" class="submenu-button">Çorba</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hazir-yemek-corba-meze/cig-kofte" class="submenu-button">Çiğ Köfte</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hazir-yemek-corba-meze/manti" class="submenu-button">Mantı</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hazir-yemek-corba-meze/dondurulmus-pizza" class="submenu-button">Dondurulmuş Pizza</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Hamur ve Pasta Malzemeleri</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/maya" class="submenu-button">Maya</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/pirinc-unu" class="submenu-button">Pirinç Unu</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/kabartma-tozu" class="submenu-button">Kabartma Tozu</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/krema-ve-sos" class="submenu-button">Krema ve Sos</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/yufka" class="submenu-button">Yufka</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/toz-tatli" class="submenu-button">Toz Tatlı</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/krem-santi" class="submenu-button">Krem Şanti</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/kakao" class="submenu-button">Kakao</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/nisasta" class="submenu-button">Nişasta</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/pasta-yardimcilari" class="submenu-button">Pasta Yardımcıları</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/kek-ve-pasta-un-karisimlari" class="submenu-button">Kek ve Pasta Un Karışımları</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/pudra-sekeri" class="submenu-button">Pudra Şekeri</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Konserve - Salça</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/konserve-salca/konserve" class="submenu-button">Konserve</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/konserve-salca/salca" class="submenu-button">Salça</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/konserve-salca/tursu" class="submenu-button">Turşu</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Ketçap - Mayonez - Soslar</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/sirke" class="submenu-button">Sirke</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/diger-salata-soslari" class="submenu-button">Diğer Salata Sosları</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/hardal" class="submenu-button">Hardal</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/kahvaltilik-sos" class="submenu-button">Kahvaltılık Sos</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/ketcap" class="submenu-button">Ketçap</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/soya-sosu" class="submenu-button">Soya Sosu</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/ton-baligi" class="submenu-button">Ton Balığı</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/limon-sosu" class="submenu-button">Limon sosu</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/nar-eksisi" class="submenu-button">Nar Ekşisi</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/mayonez" class="submenu-button">Mayonez</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div id="top-menu3" class="menu-content">
                    <ul class="menu-items">
                        <li class="items-item">
                            <button class="item-button">Süt</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sut" class="submenu-button">Süt (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Peynir</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/peynir/krem-peynir" class="submenu-button">Krem Peynir</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/peynir/kasar-peynir" class="submenu-button">Kaşar Peynir</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/peynir/ucgen-peynir" class="submenu-button">Üçgen Peynir</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/peynir/diger-peynirler" class="submenu-button">Diğer Peynirler</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/peynir/beyaz-peynir" class="submenu-button">Beyaz Peynir</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/peynir/tulum-peynir" class="submenu-button">Tulum Peynir</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Yumurta</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/yumurta" class="submenu-button">Yumurta (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Ekmek</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ekmek/paket-ekmek-kapali-ekmek" class="submenu-button">Paket Ekmek / Kapalı Ekmek</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ekmek/galeta-grissini" class="submenu-button">Galeta Grissini</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ekmek/lavas-ekmek" class="submenu-button">Lavaş Ekmek</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ekmek/gunluk-ekmek" class="submenu-button">Günlük Ekmek</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Zeytin</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/zeytin/zeytin-ezmesi" class="submenu-button">Zeytin Ezmesi</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/zeytin/yesil-zeytin" class="submenu-button">Yeşil Zeytin</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/zeytin/siyah-zeytin" class="submenu-button">Siyah Zeytin</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Tereyağ &amp; Margarin</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/tereyag-margarin/margarin" class="submenu-button">Margarin</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/tereyag-margarin/tereyag" class="submenu-button">Tereyağ</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Bal &amp; Reçel</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bal-recel/recel" class="submenu-button">Reçel</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bal-recel/bal" class="submenu-button">Bal</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Kaymak &amp; Krema &amp; Sos</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kaymak-krema-sos/kahvaltilik-sos" class="submenu-button">Kahvaltılık Sos</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kaymak-krema-sos/krema" class="submenu-button">Krema</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kaymak-krema-sos/kaymak" class="submenu-button">Kaymak</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Çay &amp; Kahve</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/cay-kahve/seker" class="submenu-button">Şeker</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/cay-kahve/cay" class="submenu-button">Çay</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/cay-kahve/kahve" class="submenu-button">Kahve</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Şarküteri</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sarkuteri/dana-salam" class="submenu-button">Dana Salam</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sarkuteri/pilic-jambon" class="submenu-button">Piliç Jambon</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sarkuteri/dana-sosis" class="submenu-button">Dana Sosis</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sarkuteri/pilic-sosis" class="submenu-button">Piliç Sosis</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sarkuteri/hindi-salam" class="submenu-button">Hindi Salam</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sarkuteri/dana-kavurma" class="submenu-button">Dana Kavurma</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sarkuteri/hindi-sosis" class="submenu-button">Hindi Sosis</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sarkuteri/dana-pastirma" class="submenu-button">Dana Pastırma</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sarkuteri/dana-sucuk" class="submenu-button">Dana Sucuk</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sarkuteri/pilic-sucuk" class="submenu-button">Piliç Sucuk</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sarkuteri/pilic-salam" class="submenu-button">Piliç Salam</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Krem Çikolata ve Ezmeler</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/krem-cikolata-ve-ezmeler" class="submenu-button">Krem Çikolata ve Ezmeler (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Helva Tahin Pekmez</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/helva-tahin-pekmez/tahin" class="submenu-button">Tahin</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/helva-tahin-pekmez/helva" class="submenu-button">Helva</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/helva-tahin-pekmez/pekmez" class="submenu-button">Pekmez</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Mısır Gevreği &amp; Yulaf</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/misir-gevregi-yulaf/yulaf-ezmesi" class="submenu-button">Yulaf Ezmesi</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/misir-gevregi-yulaf/misir-gevregi" class="submenu-button">Mısır Gevreği</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Pastane ve Fırın Ürünleri</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/pastane-ve-firin-urunleri/pogaca-borek-unlu-mamuller" class="submenu-button">Poğaca / Börek / Unlu Mamüller</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/pastane-ve-firin-urunleri/kurabiye" class="submenu-button">Kurabiye</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">İçecekler</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/icecekler/meyve-suyu" class="submenu-button">Meyve Suyu</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/icecekler/toz-icecekler" class="submenu-button">Toz İçecekler</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div id="top-menu5" class="menu-content">
                    <ul class="menu-items">
                        <li class="items-item">
                            <button class="item-button">Gazlı İçecekler</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/gazli-icecekler/enerji-icecekleri" class="submenu-button">Enerji İçecekleri</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/gazli-icecekler/gazoz" class="submenu-button">Gazoz</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/gazli-icecekler/kola" class="submenu-button">Kola</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/gazli-icecekler/malt-icecekler" class="submenu-button">Malt İçecekler</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Gazsız İçecekler</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/gazsiz-icecekler/serbetler" class="submenu-button">Şerbetler</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/gazsiz-icecekler/buzlu-cay-buzlu-kahve" class="submenu-button">Buzlu Çay &amp; Buzlu Kahve</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/gazsiz-icecekler/meyve-suyu" class="submenu-button">Meyve Suyu</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/gazsiz-icecekler/salgam" class="submenu-button">Şalgam</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/gazsiz-icecekler/limonata" class="submenu-button">Limonata</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Su ve Maden Suları</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/su-ve-maden-sulari/maden-suyu" class="submenu-button">Maden Suyu</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/su-ve-maden-sulari/su" class="submenu-button">Su</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Çay &amp; Kahve</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/cay-kahve/cay" class="submenu-button">Çay</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/cay-kahve/sut-tozu-ve-krema" class="submenu-button">Süt Tozu ve Krema</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/cay-kahve/kahve" class="submenu-button">Kahve</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Süt ve Süt Ürünleri</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sut-ve-sut-urunleri/salep" class="submenu-button">Salep</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sut-ve-sut-urunleri/kefir" class="submenu-button">Kefir</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sut-ve-sut-urunleri/sut" class="submenu-button">Süt</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sut-ve-sut-urunleri/boza" class="submenu-button">Boza</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sut-ve-sut-urunleri/ayran" class="submenu-button">Ayran</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Toz İçecekler</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/toz-icecekler" class="submenu-button">Toz İçecekler (Tümü)</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div id="top-menu1279" class="menu-content">
                    <ul class="menu-items">
                        <li class="items-item">
                            <button class="item-button">Dondurulmuş Börek</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/dondurulmus-borek" class="submenu-button">Dondurulmuş Börek (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Dondurulmuş Pizza</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/dondurulmus-pizza" class="submenu-button">Dondurulmuş Pizza (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Dondurulmuş Tatlı</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/dondurulmus-tatli" class="submenu-button">Dondurulmuş Tatlı (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Dondurulmuş Köfte</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/dondurulmus-kofte" class="submenu-button">Dondurulmuş Köfte (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Dondurma</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/dondurma" class="submenu-button">Dondurma (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Dondurulmuş Kroket</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/dondurulmus-kroket" class="submenu-button">Dondurulmuş Kroket (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Dondurulmuş Patates Kızartması</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/dondurulmus-patates-kizartmasi" class="submenu-button">Dondurulmuş Patates Kızartması (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Dondurulmuş Mısır</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/dondurulmus-misir" class="submenu-button">Dondurulmuş Mısır (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Dondurulmuş Milföy</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/dondurulmus-milfoy" class="submenu-button">Dondurulmuş Milföy (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Dondurulmuş Bezelye</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/dondurulmus-bezelye" class="submenu-button">Dondurulmuş Bezelye (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Dondurulmuş Pide</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/dondurulmus-pide" class="submenu-button">Dondurulmuş Pide (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Dondurulmuş Mantı</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/dondurulmus-manti" class="submenu-button">Dondurulmuş Mantı (Tümü)</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div id="top-menu6" class="menu-content">
                    <ul class="menu-items">
                        <li class="items-item">
                            <button class="item-button">Bisküvi - Çikolata</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/biskuvi-cikolata/cikolata" class="submenu-button">Çikolata</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/biskuvi-cikolata/biskuvi" class="submenu-button">Bisküvi</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/biskuvi-cikolata/kek" class="submenu-button">Kek</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/biskuvi-cikolata/draje" class="submenu-button">Draje</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/biskuvi-cikolata/gofret" class="submenu-button">Gofret</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/biskuvi-cikolata/krem-cikolata-ve-ezmeler" class="submenu-button">Krem Çikolata ve Ezmeler</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/biskuvi-cikolata/kraker" class="submenu-button">Kraker</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Kuruyemiş ve Cips</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kuruyemis-ve-cips/kuruyemis" class="submenu-button">Kuruyemiş</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kuruyemis-ve-cips/cips" class="submenu-button">Cips</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kuruyemis-ve-cips/patlamis-misir" class="submenu-button">Patlamış Mısır</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kuruyemis-ve-cips/kuru-meyve" class="submenu-button">Kuru Meyve</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Sakız &amp; Şekerleme</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sakiz-sekerleme/sakiz" class="submenu-button">Sakız</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sakiz-sekerleme/seker" class="submenu-button">Şeker</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sakiz-sekerleme/sekerleme" class="submenu-button">Şekerleme</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div id="top-menu7" class="menu-content">
                    <ul class="menu-items">
                        <li class="items-item">
                            <button class="item-button">Ekmek</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ekmek/bazlama-lavas-ekmek" class="submenu-button">Bazlama &amp; Lavaş Ekmek</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ekmek/galeta-ve-grissini" class="submenu-button">Galeta ve Grissini</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ekmek/paket-ekmek-kapali-ekmek" class="submenu-button">Paket Ekmek / Kapalı ekmek</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ekmek/gunluk-ekmek" class="submenu-button">Günlük Ekmek</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Pastane ve Fırın Ürünleri</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/pastane-ve-firin-urunleri/pogaca-borek-unlu-mamul" class="submenu-button">Poğaça / Börek / Unlu Mamül</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/pastane-ve-firin-urunleri/kurabiye" class="submenu-button">Kurabiye</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Hamur &amp; Kek &amp; Pasta Malzemeleri</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/kabartma-tozu" class="submenu-button">Kabartma Tozu</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/kakao" class="submenu-button">Kakao</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/un" class="submenu-button">Un</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/toz-tatli" class="submenu-button">Toz Tatlı</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/krema-ve-sos" class="submenu-button">Krema ve Sos</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/yufka" class="submenu-button">Yufka</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/kek-ve-pasta-un-karisimlari" class="submenu-button">Kek ve Pasta Un Karışımları</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/pasta-yardimcilari" class="submenu-button">Pasta Yardımcıları</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/nisasta" class="submenu-button">Nişasta</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/krem-santi" class="submenu-button">Krem Şanti</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/maya" class="submenu-button">Maya</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/pirinc-unu" class="submenu-button">Pirinç Unu</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Tatlılar</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/tatlilar/toz-tatlilar" class="submenu-button">Toz Tatlılar</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/tatlilar/puding" class="submenu-button">Puding</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/tatlilar/hazir-tatli" class="submenu-button">Hazır Tatlı</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div id="top-menu8" class="menu-content">
                    <ul class="menu-items">
                        <li class="items-item">
                            <button class="item-button">Sebze</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sebze/yesillik-ve-ot" class="submenu-button">Yeşillik ve Ot</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sebze/mevsim-sebzeleri" class="submenu-button">Mevsim Sebzeleri</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sebze/salata-malzemeleri" class="submenu-button">Salata Malzemeleri</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sebze/patates-sogan-sarimsak" class="submenu-button">Patates, Soğan, Sarımsak</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sebze/paket-sebze" class="submenu-button">Paket Sebze</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Meyve</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/meyve/paket-meyve" class="submenu-button">Paket Meyve</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/meyve/kuru-meyve" class="submenu-button">Kuru Meyve</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/meyve/narenciye" class="submenu-button">Narenciye</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/meyve/mevsim-meyveleri" class="submenu-button">Mevsim Meyveleri</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/meyve/egzotik-meyve" class="submenu-button">Egzotik Meyve</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div id="top-menu10" class="menu-content">
                    <ul class="menu-items">
                        <li class="items-item">
                            <button class="item-button">Kadın Bakım &amp; Kozmetik</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/sac-boyalari" class="submenu-button">Saç Boyaları</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/makyaj-pamuk-ve-pedleri" class="submenu-button">Makyaj Pamuk ve Pedleri</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/oje" class="submenu-button">Oje</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/tuy-dokucu" class="submenu-button">Tüy Dökücü</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/bb-kremler" class="submenu-button">BB Kremler</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/maskara" class="submenu-button">Maskara</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/ruj" class="submenu-button">Ruj</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/goz-kalemi-eyeliner" class="submenu-button">Göz Kalemi / Eyeliner</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/agda" class="submenu-button">Ağda</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/hijyenik-ped" class="submenu-button">Hijyenik Ped</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/kadin-roll-on-deodorant" class="submenu-button">Kadın Roll On Deodorant</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/kadin-parfum" class="submenu-button">Kadın Parfüm</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/yuz-temizleme" class="submenu-button">Yüz Temizleme</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/aseton" class="submenu-button">Aseton</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/kadin-sprey-deodorant" class="submenu-button">Kadın Sprey Deodorant</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/kadin-tiras-bicagi" class="submenu-button">Kadın Tıraş Bıçağı</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/aksesuar" class="submenu-button">Aksesuar</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Erkek Bakım &amp; Kozmetik</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/erkek-bakim-kozmetik/tiras-kopugu" class="submenu-button">Tıraş Köpüğü</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/erkek-bakim-kozmetik/erkek-sprey-deodorant" class="submenu-button">Erkek Sprey Deodorant</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/erkek-bakim-kozmetik/tiras-kolonyasi" class="submenu-button">Tıraş Kolonyası</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/erkek-bakim-kozmetik/parfum" class="submenu-button">Parfüm</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/erkek-bakim-kozmetik/tiras-bicagi" class="submenu-button">Tıraş Bıçağı</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/erkek-bakim-kozmetik/erkek-roll-on-deodorant" class="submenu-button">Erkek Roll On Deodorant</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Banyo &amp; Duş &amp; Şampuan</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/banyo-dus-sampuan/sabun" class="submenu-button">Sabun</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/banyo-dus-sampuan/vucut-sampuani" class="submenu-button">Vücut Şampuanı</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/banyo-dus-sampuan/sac-kremi" class="submenu-button">Saç Kremi</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/banyo-dus-sampuan/kulak-cubugu" class="submenu-button">Kulak Çubuğu</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/banyo-dus-sampuan/sampuan" class="submenu-button">Şampuan</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/banyo-dus-sampuan/lif-sungerler" class="submenu-button">Lif &amp; Süngerler</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Ağız Bakım Ürünleri</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/agiz-bakim-urunleri/agiz-bakim" class="submenu-button">Ağız Bakım</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/agiz-bakim-urunleri/kurdan" class="submenu-button">Kürdan</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/agiz-bakim-urunleri/dis-ipi" class="submenu-button">Diş İpi</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/agiz-bakim-urunleri/dis-fircasi" class="submenu-button">Diş Fırçası</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/agiz-bakim-urunleri/dis-macunu" class="submenu-button">Diş Macunu</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Yüz Bakım</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/yuz-bakim/temizleme-urunleri" class="submenu-button">Temizleme Ürünleri</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/yuz-bakim/ozel-kremler-kirisiklik" class="submenu-button">Özel Kremler (Kırışıklık)</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/yuz-bakim/dudak-koruyucular" class="submenu-button">Dudak Koruyucular</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/yuz-bakim/yuz-maskeleri" class="submenu-button">Yüz Maskeleri</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/yuz-bakim/gunluk-bakim-kremleri" class="submenu-button">Günlük Bakım Kremleri </a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Vücut &amp; El &amp; Ayak Bakım</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/vucut-el-ayak-bakim/vucut-yagi" class="submenu-button">Vücut Yağı</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/vucut-el-ayak-bakim/vucut-el-kremi" class="submenu-button">Vücut El Kremi</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/vucut-el-ayak-bakim/ayak-bakim-kremi" class="submenu-button">Ayak Bakım Kremi</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/vucut-el-ayak-bakim/pedikur-manikur" class="submenu-button">Pedikür &amp; Manikür</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Saç Bakım</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sac-bakim/sac-kremi" class="submenu-button">Saç Kremi</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sac-bakim/tarak-toka" class="submenu-button">Tarak &amp; Toka</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sac-bakim/sac-bakimi" class="submenu-button">Saç Bakımı</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sac-bakim/sac-sekillendirici" class="submenu-button">Saç Şekillendirici</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sac-bakim/sac-boyasi" class="submenu-button">Saç Boyası</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Kağıt &amp; Peçete &amp; Mendil &amp; Pamuk &amp; Ped</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil-pamuk-ped/hijyenik-ped" class="submenu-button">Hijyenik Ped</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil-pamuk-ped/islak-mendil-havlu" class="submenu-button">Islak Mendil &amp; Havlu</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil-pamuk-ped/kagit-havlu" class="submenu-button">Kağıt Havlu</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil-pamuk-ped/pamukkulak-cubugu" class="submenu-button">Pamuk&amp;Kulak Çubuğu</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil-pamuk-ped/tuvalet-kagidi" class="submenu-button">Tuvalet Kağıdı</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil-pamuk-ped/kagit-mendil" class="submenu-button">Kağıt Mendil</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil-pamuk-ped/kagit-pecete" class="submenu-button">Kağıt Peçete</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Sağlık &amp; Hasta Bakım</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/saglik-hasta-bakim/yara-bandi" class="submenu-button">Yara Bandı</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/saglik-hasta-bakim/prezervatif" class="submenu-button">Prezervatif</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/saglik-hasta-bakim/medikal-urunler" class="submenu-button">Medikal Ürünler </a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/saglik-hasta-bakim/hasta-bezi" class="submenu-button">Hasta Bezi</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/saglik-hasta-bakim/agri-bandi" class="submenu-button">Ağrı Bandı</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Güneş Bakım Ürünleri</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/gunes-bakim-urunleri/gunes-yaglari-losyonlar-sut" class="submenu-button">Güneş Yağları &amp; Losyonlar &amp; Süt</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/gunes-bakim-urunleri/bakim-sutu" class="submenu-button">Bakım Sütü</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Kolonya</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kolonya/kolonyalar" class="submenu-button">Kolonyalar</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div id="top-menu9" class="menu-content">
                    <ul class="menu-items">
                        <li class="items-item">
                            <button class="item-button">Bulaşık</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bulasik/makine-temizleyicisi" class="submenu-button">Makine Temizleyicisi</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bulasik/makine-tuzu" class="submenu-button">Makine Tuzu</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bulasik/parlatici" class="submenu-button">Parlatıcı</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bulasik/eldiven" class="submenu-button">Eldiven</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bulasik/makine-kokusu" class="submenu-button">Makine Kokusu</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bulasik/bulasik-tabletdeterjani" class="submenu-button">Bulaşık Tablet/Deterjanı</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bulasik/bulasik-bezi" class="submenu-button">Bulaşık Bezi</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bulasik/bulasik-sungeri-ve-teli" class="submenu-button">Bulaşık Süngeri ve Teli</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Mutfak Yardımcıları</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/mutfak-yardimcilari/aluminyum-folyo" class="submenu-button">Alüminyum Folyo</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/mutfak-yardimcilari/buzdolabi-poseti" class="submenu-button">Buzdolabı Poşeti</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/mutfak-yardimcilari/firin-torbasi" class="submenu-button">Fırın Torbası</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/mutfak-yardimcilari/cop-torbalari" class="submenu-button">Çöp Torbaları</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/mutfak-yardimcilari/strec-film" class="submenu-button">Streç Film</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/mutfak-yardimcilari/pisirme-kagidi" class="submenu-button">Pişirme Kağıdı</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Çamaşır</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/camasir/camasir-deterjani" class="submenu-button">Çamaşır Deterjanı</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/camasir/renk-koruyucu" class="submenu-button">Renk Koruyucu</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/camasir/camasir-yumusaticisi" class="submenu-button">Çamaşır Yumuşatıcısı</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/camasir/camasir-suyu" class="submenu-button">Çamaşır Suyu</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/camasir/leke-cikarici" class="submenu-button">Leke Çıkarıcı</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/camasir/kirec-onleyici" class="submenu-button">Kireç Önleyici</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/camasir/bebek-deterjani" class="submenu-button">Bebek Deterjanı</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Ev Temizleyicileri</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/tuvalet-kokusu-giderici" class="submenu-button">Tuvalet Kokusu Giderici</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/kirec-sokucu" class="submenu-button">Kireç Sökücü</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/cop-torbasi" class="submenu-button">Çöp Torbası</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/lavabo-acici" class="submenu-button">Lavabo Açıcı</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/camasir-suyu" class="submenu-button">Çamaşır Suyu</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/oda-kokusu" class="submenu-button">Oda Kokusu</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/cam-temizleyici" class="submenu-button">Cam Temizleyici</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/firca-ve-paspaslar" class="submenu-button">Fırça ve Paspaslar</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/fiber-bezler" class="submenu-button">Fiber Bezler</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/banyo-mutfak-yuzey-temizleyici" class="submenu-button">Banyo / Mutfak / Yüzey Temizleyici</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/bulasik-sungeri" class="submenu-button">Bulaşık Süngeri</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/ahsap-temizleyici" class="submenu-button">Ahşap Temizleyici</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/eldiven" class="submenu-button">Eldiven</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/temizlik-setleri" class="submenu-button">Temizlik Setleri</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/hali-sampuani" class="submenu-button">Halı Şampuanı</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/temizlik-bezleri" class="submenu-button">Temizlik Bezleri</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Sabun</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/sabun" class="submenu-button">Sabun (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Kağıt &amp; Peçete &amp; Mendil</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil/kagit-mendil" class="submenu-button">Kağıt Mendil</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil/islak-mendil-havlu" class="submenu-button">Islak Mendil &amp; Havlu</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil/kagit-pecete" class="submenu-button">Kağıt Peçete</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil/kagit-havlu" class="submenu-button">Kağıt Havlu</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil/tuvalet-kagidi" class="submenu-button">Tuvalet Kağıdı</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div id="top-menu11" class="menu-content">
                    <ul class="menu-items">
                        <li class="items-item">
                            <button class="item-button">Elektrikli ve Elektronik Ev Aletleri</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/telefonlar" class="submenu-button">Telefonlar </a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/goruntu-ve-ses-sistemleri" class="submenu-button">Görüntü ve Ses Sistemleri</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/pil" class="submenu-button">Pil</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/fotograf-makinalari-ve-kamera" class="submenu-button">Fotoğraf Makinaları ve Kamera</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/aydinlatma-cihazlar" class="submenu-button">Aydınlatma Cihazlar</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/kablo-priz-adaptor" class="submenu-button">Kablo &amp; Priz &amp; Adaptör</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/monitor" class="submenu-button">Monitör</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/ampul" class="submenu-button">Ampul</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/bilgisayar-tablet-ve-aksesuarlari" class="submenu-button">Bilgisayar &amp; Tablet ve Aksesuarları</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/telefon-aksesuarlari" class="submenu-button">Telefon Aksesuarları</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/televizyonlar" class="submenu-button">Televizyonlar</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/elektrikli-kisisel-bakim-saglik" class="submenu-button">Elektrikli Kişisel Bakım &amp; Sağlık</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/kucuk-ev-aletleri" class="submenu-button">Küçük Ev Aletleri</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/beyaz-esyalar" class="submenu-button">Beyaz Eşyalar</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/isitma-sogutma-sistemleri" class="submenu-button">Isıtma &amp; Soğutma Sistemleri</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Giyim &amp; Ayakkabı &amp; Aksesuar</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/ic-camasiri" class="submenu-button">İç Çamaşırı</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/dis-giyim" class="submenu-button">Dış Giyim</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/canta" class="submenu-button">Çanta</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/ayakkabi-bot-sandalet" class="submenu-button">Ayakkabı &amp; Bot &amp; Sandalet</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/pijama" class="submenu-button">Pijama</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/semsiye" class="submenu-button">Şemsiye</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/ayakkabi-boyasi" class="submenu-button">Ayakkabı Boyası</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/aksesuar" class="submenu-button">Aksesuar</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/terlik" class="submenu-button">Terlik</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/plaj-kiyafetleri" class="submenu-button">Plaj Kıyafetleri</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/corap" class="submenu-button">Çorap</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/ayakkabi-sungeri" class="submenu-button">Ayakkabı Süngeri</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Züccaciye ve Ev Eşyaları</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/camasir-kurutma" class="submenu-button">Çamaşır Kurutma</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/aski" class="submenu-button">Askı</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/mangal-aksesuar" class="submenu-button">Mangal &amp; Aksesuar</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/kullan-at-mutfak-esyalari" class="submenu-button">Kullan At Mutfak Eşyaları</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/ev-mobilyalari" class="submenu-button">Ev Mobilyaları</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/mutfak-saklama-gerecleri" class="submenu-button">Mutfak Saklama Gereçleri</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/mutfak-pisirici-gerecler" class="submenu-button">Mutfak Pişirici Gereçler</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/bardaklar" class="submenu-button">Bardaklar</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/sofra-servis" class="submenu-button">Sofra-Servis</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/dekoratif-urunler" class="submenu-button">Dekoratif Ürünler</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/tabak-kase" class="submenu-button">Tabak / Kase</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/mutfak-plastik-urunleri" class="submenu-button">Mutfak Plastik Ürünleri</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/cay-bardagi" class="submenu-button">Çay Bardağı</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/mutfak-el-aletleri" class="submenu-button">Mutfak El Aletleri</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/banyo-mutfak-oda-duzenleme" class="submenu-button">Banyo &amp; Mutfak &amp; Oda Düzenleme</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/banyo-setleri" class="submenu-button">Banyo Setleri</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/surahiler" class="submenu-button">Sürahiler</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/porselen-seramik-urunler" class="submenu-button">Porselen Seramik Ürünler</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/cakmak-kibrit" class="submenu-button">Çakmak / Kibrit</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Haşare Öldürücüleri</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hasare-olduruculeri/yemler" class="submenu-button">Yemler</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hasare-olduruculeri/spreyler" class="submenu-button">Spreyler</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hasare-olduruculeri/makineler" class="submenu-button">Makineler</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hasare-olduruculeri/matlar" class="submenu-button">Matlar</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/hasare-olduruculeri/likitler" class="submenu-button">Likitler</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Ev Tekstili</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ev-tekstili/ev-tekstili" class="submenu-button">Ev Tekstili</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ev-tekstili/yatak-urunleri" class="submenu-button">Yatak Ürünleri</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ev-tekstili/duzenleme" class="submenu-button">Düzenleme</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/ev-tekstili/havlu-urunleri" class="submenu-button">Havlu Ürünleri</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Fırsat Ürünleri</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/firsat-urunleri/seyahat-gerecleri" class="submenu-button">Seyahat Gereçleri</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/firsat-urunleri/bahce-urunleri" class="submenu-button">Bahçe Ürünleri</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/firsat-urunleri/hobi" class="submenu-button">Hobi</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/firsat-urunleri/parti-ve-sus-urunleri" class="submenu-button">Parti ve Süs Ürünleri</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/firsat-urunleri/deniz-tatili-urunleri" class="submenu-button">Deniz Tatili Ürünleri</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/firsat-urunleri/spor-urunleri" class="submenu-button">Spor Ürünleri</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/firsat-urunleri/oto-bakim-ve-aksesuarlari" class="submenu-button">Oto Bakım ve Aksesuarları</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/firsat-urunleri/nalburiye-hirdavat-urunleri" class="submenu-button">Nalburiye - Hırdavat Ürünleri</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/firsat-urunleri/bebek-bakim-araclari" class="submenu-button">Bebek Bakım Araçları</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/firsat-urunleri/muzik" class="submenu-button">Müzik</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/firsat-urunleri/tekne-ve-balikcilik-urunleri" class="submenu-button">Tekne ve Balıkçılık Ürünleri</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/firsat-urunleri/kamp-urunleri" class="submenu-button">Kamp Ürünleri</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Oyuncaklar</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/oyuncaklar/oyuncaklar" class="submenu-button">Oyuncaklar</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Medya &amp; Kırtasiye</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/medya-kirtasiye/kirtasiye-urunleri" class="submenu-button">Kırtasiye Ürünleri</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/medya-kirtasiye/defterler" class="submenu-button">Defterler</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/medya-kirtasiye/kitaplar" class="submenu-button">Kitaplar</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/medya-kirtasiye/gazeteler" class="submenu-button">Gazeteler</a></li>
                                <li class="submenu-item"><a href="https://www.ceptesok.com/medya-kirtasiye/dergiler" class="submenu-button">Dergiler</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div id="top-menu12" class="menu-content">
                    <ul class="menu-items">
                        <li class="items-item">
                            <button class="item-button">Bebek Maması</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bebek-mamasi" class="submenu-button">Bebek Maması (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Bebek Eşyaları</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bebek-esyalari" class="submenu-button">Bebek Eşyaları (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Bebek Bezi</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bebek-bezi" class="submenu-button">Bebek Bezi (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Islak Havlu &amp; Mendil</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/islak-havlu-mendil" class="submenu-button">Islak Havlu &amp; Mendil (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Bebek Saç Şampuanı</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bebek-sac-sampuani" class="submenu-button">Bebek Saç Şampuanı (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Bebek Kolonyaları</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bebek-kolonyalari" class="submenu-button">Bebek Kolonyaları (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Bebek Yağları</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bebek-yaglari" class="submenu-button">Bebek Yağları (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Bebek Deterjanı</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bebek-deterjani" class="submenu-button">Bebek Deterjanı (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Bebek Yumuşatıcısı</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bebek-yumusaticisi" class="submenu-button">Bebek Yumuşatıcısı (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Bebek Bakım Setleri</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bebek-bakim-setleri" class="submenu-button">Bebek Bakım Setleri (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Bebek Kremleri</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/bebek-kremleri" class="submenu-button">Bebek Kremleri (Tümü)</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div id="top-menu1822" class="menu-content">
                    <ul class="menu-items">
                        <li class="items-item">
                            <button class="item-button">Light Ürünler</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/light-urunler" class="submenu-button">Light Ürünler (Tümü)</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div id="top-menu1801" class="menu-content">
                    <ul class="menu-items">
                        <li class="items-item">
                            <button class="item-button">Kuş Yemi</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kus-yemi" class="submenu-button">Kuş Yemi (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Evcil Hayvan Ürünleri</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/evcil-hayvan-urunleri" class="submenu-button">Evcil Hayvan Ürünleri (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Köpek Maması</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kopek-mamasi" class="submenu-button">Köpek Maması (Tümü)</a></li>
                            </ul>
                        </li>
                        <li class="items-item">
                            <button class="item-button">Kedi Maması</button> 
                            <ul class="item-submenu">
                                <li class="submenu-item"><a href="https://www.ceptesok.com/kedi-mamasi" class="submenu-button">Kedi Maması (Tümü)</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="modal_deliverytime" class="modal deliverytime">
            <div class="modal-element">
                <div class="modal-content">
                    <div class="modal-body">
                        <!----> 
                        <div class="modal-inner">
                            <div class="section checkout-deliverytime">
                                <div class="deliverytime-daypicker">
                                    <div class="daypicker-opt checkbutton hollowgreen fixed narrow"><input type="radio" id="delivery_today" checked="checked" name="dummy_daypicker"> <label for="delivery_today">Bugün<br></label></div>
                                    <div class="daypicker-opt checkbutton hollowgreen fixed narrow"><input type="radio" id="delivery_tomorrow" name="dummy_daypicker"> <label for="delivery_tomorrow">Yarın<br></label></div>
                                </div>
                                <ul class="deliverytime-slots">
                                    <!----> <!----> <!---->
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="modal_login" class="modal login">
            <div class="modal-element">
                <div class="modal-content">
                    <div class="modal-body">
                        <div id="login_terms" class="clickshow-subject login-terms modal-body">
                            <div class="modal-header">
                                <button data-subject="login_terms" class="modal-close no-action clickshow"><i class="icon-close"></i></button> 
                                <h3 class="header-title">
                                    Yeni Kullanıcı Sözleşmesi
                                </h3>
                            </div>
                            <div class="modal-inner">
                                <div class="terms-container white">
                                    <div class="terms-wrap scrollbar mCustomScrollbar _mCS_1 mCS_no_scrollbar scrollbar-initialized">
                                        <div id="mCSB_1" class="mCustomScrollBox mCS-custom mCSB_vertical mCSB_inside" style="max-height: 0px;" tabindex="0">
                                            <div id="mCSB_1_container" class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style="position:relative; top:0; left:0;" dir="ltr">
                                                <div class="textarea">
                                                    <h3>MADDE 2-SÖZLEŞMENİN KONUSU ve KAPSAMI</h3>
                                                    <p>İşbu Mesafeli Satış Sözleşmesi (“Sözleşme”) Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmelere Dair Yönetmelik’e uygun olarak düzenlenmiştir. İşbu Sözleşme’nin tarafları işbu Sözleşme tahtında Tüketicinin
                                                        Korunması Hakkında Kanun ve Mesafeli Sözleşmelere Dair Yönetmelik’ten kaynaklanan yükümlülük ve sorumluluklarını bildiklerini ve anladıklarını kabul ve beyan ederler. İşbu sözleşmenin konusu, Alıcı'nın, Doğuş Planet
                                                        Elektronik Ticaret ve Bilişim Hizmetleri A.Ş (“Doğuş Planet”)’ye ait www.n11.com veya sunulan hizmete bağlı diler alan adları üzerinden (“Websitesi”), Satıcıya ait ürünlerin satın alınmasına yönelik elektronik olarak
                                                        sipariş verdiği, sözleşmede belirtilen niteliklere sahip mal/hizmetin satışı ve teslimi ile ilgili olarak Tüketicinin Korunması Hakkındaki Kanun ve Mesafeli Sözleşmelere Dair Yönetmelik hükümleri gereğince tarafların
                                                        hak ve yükümlülüklerinin saptanması oluşturur.
                                                    </p>
                                                    <p>İşbu sözleşmenin akdedilmesi tarafların ayrı ayrı Doğuş Planet ile akdetmiş oldukları websitesi üyelik sözleşmelerinin hükümlerinin ifasını engellemeyecek olup taraflar işbu Sözleşme konusu ürün satışında Doğuş Planet’in
                                                        herhangi bir şekilde taraf olmadığını ve Sözleşme kapsamında tarafların yükümlülüklerini yerine getirmeleri ile ilgili herhangi bir sorumluluk ve taahhüdü bulunmadığını kabul ve beyan ederler.
                                                    </p>
                                                    <h3>MADDE 3 – SÖZLEŞME KONUSU MALIN TEMEL NİTELİKLERİ VE BEDELİ</h3>
                                                    <p>Ürün/Ürünlerin cinsi ve türü, miktarı, marka/modeli, rengi ve vergiler dahil satış bedeli ve teslimat bilgileri aşağıdaki gibidir:</p>
                                                    <p>Ödeme Şekli ve Planı: Çevirimiçi sanal POS uygulaması üzerinden ..........Bankası kredi kartı ile .... ay .... (yazıyla ..............................................) TL aylık ödeme / peşin ........... TL ödeme</p>
                                                </div>
                                            </div>
                                            <div id="mCSB_1_scrollbar_vertical" class="mCSB_scrollTools mCSB_1_scrollbar mCS-custom mCSB_scrollTools_vertical" style="display: none;">
                                                <div class="mCSB_draggerContainer">
                                                    <div id="mCSB_1_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 50px; top: 0px;">
                                                        <div class="mCSB_dragger_bar" style="line-height: 50px;"></div>
                                                    </div>
                                                    <div class="mCSB_draggerRail"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-header"><button class="modal-close"><i class="icon-close"></i></button></div>
                        <div class="section login-content">
                            <div class="login-right">
                                <div id="member-login" class="login-form login clickshow-subject noanim grid-container narrow-vertical inputform enable show">
                                    <div class="grid-row">
                                        <div class="grid-col nogap-top form-alternatives">
                                            <div class="col-xs-12 padding-reset clickshow notoggle" data-subject="member-register" data-clickshow-group="member-sections">
                                                <div class="col-xs-6 xs-pl0 xs-pb0"><span class="btn btnFaceBook flexRow xs-textleft" style="background-color: blue; color: white;"><img src="../img/facebook.svg" alt="">
                                                    Facebook ile  giriş yap.
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-row" style="display: none;">
                                        <div class="grid-col">
                                            <div class="form-seperator"><span>veya</span></div>
                                        </div>
                                    </div>
                                    <div class="grid-row">
                                        <div class="grid-col nogap-t">  </div>
                                    </div>
                                    <div class="grid-row">
                                        <div class="grid-col">
                                            <div class="inputwrap type-text"><input type="text" name="phone" autocomplete="tel-national" maxlength="11" placeholder="Cep Telefonu"></div>
                                        </div>
                                    </div>
                                    <div class="grid-row">
                                        <div class="grid-col">
                                            <div class="inputwrap type-password"><input type="password" name="password" autocomplete="current-password" placeholder="Parola"><button type="button" class="password-peek"></button></div>
                                        </div>
                                    </div>
                                    <div class="grid-row">
                                        <div class="grid-col gap-top-high">
                                            <div class="checkwrap type-checkbox"><input type="checkbox" id="input_dummy_5"> <label for="input_dummy_5"><span></span> Beni hatırla</label></div>
                                            <a onclick="checkRegisterModalEnabled()" data-modal="modal_passwordrecovery" class="form-innerlink fright modaltrigger">Şifrenizi unuttunuz mu?</a>
                                        </div>
                                    </div>
                                    <div class="grid-row">
                                        <div class="grid-col gap-top-high"><button class="btn green block">
                                            Giriş yap
                                            </button>
                                        </div>
                                    </div>
                                    <div class="grid-row">
                                        <div class="grid-col">
                                            <div class="form-seperator"></div>
                                        </div>
                                    </div>
                                    <div class="grid-row">
                                        <div class="grid-col nogap-top form-alternatives"><span class="alternatives-title">Hesabınız yok mu?</span><button data-subject="member-register" data-clickshow-group="member-sections" class="clickshow notoggle">Şimdi Kayıt Ol</button></div>
                                    </div>
                                </div>
                                <div id="member-register" class="login-form register clickshow-subject noanim grid-container narrow-vertical inputform">
                                    <div class="col-xs-12 padding-reset">
                                        <div class="col-xs-6 xs-pl0 xs-pb0"><span class="btn btnFaceBook flexRow xs-textleft" style="background-color: blue; color: white;"><img src="../img/facebook.svg" alt="">
                                            Facebook ile  giriş yap.
                                            </span>
                                        </div>
                                    </div>
                                    <div class="grid-row" style="display: none;">
                                        <div class="grid-col">
                                            <div class="form-seperator"><span>veya</span></div>
                                        </div>
                                    </div>
                                    <div class="grid-row">
                                        <div class="grid-col">
                                            <div class="inputwrap type-text"><input type="text" name="email" autocomplete="email" placeholder="E-Posta Adresi"></div>
                                        </div>
                                    </div>
                                    <div class="grid-row">
                                        <div class="grid-col">
                                            <div class="inputwrap type-text"><input type="text" name="phone" autocomplete="tel-national" maxlength="11" placeholder="Cep Telefonu"></div>
                                        </div>
                                    </div>
                                    <div class="grid-row">
                                        <div class="grid-col">
                                            <div class="inputwrap type-text"><input type="text" name="name" autocomplete="name" placeholder="Ad Soyad"></div>
                                        </div>
                                    </div>
                                    <div class="grid-row">
                                        <div class="grid-col">
                                            <div class="inputwrap type-password"><input type="password" name="password" autocomplete="new-password" placeholder="Parola"><button type="button" class="password-peek"></button></div>
                                        </div>
                                    </div>
                                    <div class="grid-row">
                                        <div class="grid-col gap-top-high">
                                            <div class="checkwrap type-checkbox"><input type="checkbox" id="register_agreement11"> <label for="register_agreement11"><span></span> <button onclick="checkRegisterModalEnabled()" data-modal="modal_registerterms" class="form-innerlink modaltrigger">Kullanım koşulları</button>'nı okudum,<br>onaylıyorum</label></div>
                                        </div>
                                    </div>
                                    <div class="grid-row">
                                        <div class="grid-col">
                                            <div class="checkwrap type-checkbox"><input type="checkbox" id="register_notification11"> <label for="register_notification11"><span></span> Bana özel kampanyalardan haberdar olmak istiyorum</label></div>
                                        </div>
                                    </div>
                                    <div class="grid-row">
                                        <div class="grid-col gap-top-high"><button class="btn green block"><span>Kayıt ol</span></button></div>
                                    </div>
                                    <div class="grid-row">
                                        <div class="grid-col">
                                            <div class="form-seperator"></div>
                                        </div>
                                    </div>
                                    <div class="grid-row">
                                        <div class="grid-col nogap-top form-alternatives"><span class="alternatives-title">Hesabınız var mı?</span> <button data-subject="member-login" data-clickshow-group="member-sections" class="clickshow notoggle">Giriş Yap</button></div>
                                    </div>
                                    <div id="modal_sms_confirmation" class="modal modal-mini password-recovery">
                                        <div class="modal-element">
                                            <div class="modal-content">
                                                <div class="modal-body passwordrecovery-body-form">
                                                    <div class="modal-header">
                                                        <button class="modal-close"><i class="icon-close"></i></button> 
                                                        <h3 class="header-title">
                                                            Cep telefonu doğrula
                                                        </h3>
                                                    </div>
                                                    <div class="modal-inner">
                                                        <form class="passwordrecovery-form grid-container inputform">
                                                            <div class="grid-row">
                                                                <div class="grid-col nogap-t">
                                                                    <p class="validation-hideonerror">Hesabınızla bağlantılı cep telefonunuza hesabınızı aktif etmek için bir sms gönderdik.</p>
                                                                </div>
                                                            </div>
                                                            <div class="grid-row">
                                                                <div class="grid-col">
                                                                    <div class="inputwrap type-text"><input type="text" placeholder="Aktivasyon Kodu"></div>
                                                                </div>
                                                            </div>
                                                            <div class="grid-row">
                                                                <div class="grid-col"><button type="button" class="btn green block">Hesabımı doğrula</button></div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                                <div class="modal-body passwordrecovery-body-complete">
                                                    <div class="modal-inner">
                                                        <img src="../img/member-passwordreset-complete.svg" class="passwordrecovery-complete-image"> 
                                                        <h3 class="passwordrecovery-complete-title">Hesabınız aktif edilmiştir.</h3>
                                                        <button class="btn green wide modal-closetrigger">Kapat</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="login-left"><a href="https://www.ceptesok.com/hazir-listeler"><img src="../img/login-banner.jpg" class="login-banner"></a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div>
            <div id="mobilemenu">
                <div class="mobilemenu-head inputform">
                    <div class="head-wrap wrapper">
                        <button class="mobilemenu-close"><i class="icon-close"></i></button> 
                        <div class="head-search inputwrap"><button type="button" class="search-submit"><i class="icon-search"></i></button> <input type="text" placeholder="Ürün, Marka Ara" class="search-input"></div>
                    </div>
                </div>
                <div class="mobilemenu-menu">
                    <div class="menu-container">
                        <div class="menu-wrap wrapper">
                            <h3 class="menu-title">Kategoriler</h3>
                            <ul class="menu-list">
                                <li class="list-item has-sub">
                                    <button class="list-button">Et &amp;&nbsp;Tavuk &amp;&nbsp;Hindi &amp;&nbsp;Balık</button> 
                                    <div class="menu-submenu">
                                        <button class="submenu-back">Et &amp;&nbsp;Tavuk &amp;&nbsp;Hindi &amp;&nbsp;Balık</button> 
                                        <div class="menu-wrap wrapper">
                                            <ul class="menu-list">
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Kırmızı Et</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Kırmızı Et</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kirmizi-et/dana-salam" class="list-button">Dana Salam</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kirmizi-et/dana-sucuk" class="list-button">Dana Sucuk</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kirmizi-et/dana-paket" class="list-button">Dana Paket</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kirmizi-et/kiyma" class="list-button">Kıyma</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kirmizi-et/dana-sosis" class="list-button">Dana Sosis</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kirmizi-et/doner-dana-et" class="list-button">Döner Dana Et</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kirmizi-et/kiymalik-dana-et" class="list-button">Kıymalık Dana Et</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kirmizi-et/et-kofte" class="list-button">Et Köfte</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kirmizi-et/kusbasilik-dana-et" class="list-button">Kuşbaşılık Dana Et</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kirmizi-et/dana-kavurma" class="list-button">Dana Kavurma</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kirmizi-et/sakatat" class="list-button">Sakatat</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kirmizi-et/dana-pastirma" class="list-button">Dana Pastırma</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kirmizi-et/dondurulmus-kofte" class="list-button">Dondurulmuş Köfte</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Tavuk Eti</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Tavuk Eti</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/tavuk-eti/pilic-sosis" class="list-button">Piliç Sosis</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/tavuk-eti/pilic-salam" class="list-button">Piliç Salam</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/tavuk-eti/pilic-sucuk" class="list-button">Piliç Sucuk</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/tavuk-eti/parca-pilic-kanat-but-gogus-ciger" class="list-button">Parça Piliç - Kanat, But, Göğüs, Ciğer</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/tavuk-eti/hazir-schnitzel-nugget-doner-kofte" class="list-button">Hazır - Schnitzel, Nugget, Döner, Köfte</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/tavuk-eti/pilic-jambon" class="list-button">Piliç Jambon</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/tavuk-eti/butun-pilic" class="list-button">Bütün Piliç</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Hindi Eti</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Hindi Eti</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hindi-eti/hindi-salam" class="list-button">Hindi Salam</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hindi-eti/hindi-fume" class="list-button">Hindi Füme</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hindi-eti/hindi-sosis" class="list-button">Hindi Sosis</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hindi-eti/butun-hindi" class="list-button">Bütün Hindi</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/ton-baligi" class="list-button">Ton Balığı</a> <!---->
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/yumurta" class="list-button">Yumurta</a> <!---->
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-item has-sub">
                                    <button class="list-button">Süt, Yoğurt ve&nbsp;Süt Ürünleri</button> 
                                    <div class="menu-submenu">
                                        <button class="submenu-back">Süt, Yoğurt ve&nbsp;Süt Ürünleri</button> 
                                        <div class="menu-wrap wrapper">
                                            <ul class="menu-list">
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/sut" class="list-button">Süt</a> <!---->
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Yoğurtlar</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Yoğurtlar</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/yogurtlar/light-biotik-yogurt" class="list-button">Light &amp; Biotik Yoğurt</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/yogurtlar/yogurt" class="list-button">Yoğurt</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/yogurtlar/meyveli-yogurt" class="list-button">Meyveli Yoğurt</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Peynirler</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Peynirler</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/peynirler/diger-peynirler" class="list-button">Diğer Peynirler</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/peynirler/ucgen-peynir" class="list-button">Üçgen Peynir</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/peynirler/kasar-peynir" class="list-button">Kaşar Peynir</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/peynirler/krem-peynir" class="list-button">Krem Peynir</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/peynirler/tulum-peynir" class="list-button">Tulum Peynir</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/peynirler/beyaz-peynir" class="list-button">Beyaz Peynir</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Tereyağ &amp; Margarin</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Tereyağ &amp; Margarin</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/tereyag-margarin/tereyag" class="list-button">Tereyağ</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/tereyag-margarin/margarin" class="list-button">Margarin</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Kaymak &amp; Krema</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Kaymak &amp; Krema</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kaymak-krema/krema" class="list-button">Krema</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kaymak-krema/kaymak" class="list-button">Kaymak</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Ayran &amp; Kefir</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Ayran &amp; Kefir</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ayran-kefir/kefir" class="list-button">Kefir</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ayran-kefir/ayran" class="list-button">Ayran</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/dondurma" class="list-button">Dondurma</a> <!---->
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/sut-tozu-ve-krema" class="list-button">Süt Tozu ve Krema</a> <!---->
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/sutlu-tatlilar" class="list-button">Sütlü Tatlılar</a> <!---->
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-item has-sub">
                                    <button class="list-button">Yemeklik Malzemeler</button> 
                                    <div class="menu-submenu">
                                        <button class="submenu-back">Yemeklik Malzemeler</button> 
                                        <div class="menu-wrap wrapper">
                                            <ul class="menu-list">
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Tuz, Baharat, Harç</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Tuz, Baharat, Harç</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/tuz-baharat-harc/harc" class="list-button">Harç</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/tuz-baharat-harc/baharat" class="list-button">Baharat</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/tuz-baharat-harc/tuz" class="list-button">Tuz</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/tuz-baharat-harc/bulyon" class="list-button">Bulyon</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Hazır Tatlılar</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Hazır Tatlılar</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hazir-tatlilar/serbetli-tatlilar" class="list-button">Şerbetli Tatlılar</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hazir-tatlilar/pastane-tatlilari" class="list-button">Pastane Tatlıları</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Sıvı Yağlar</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Sıvı Yağlar</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sivi-yaglar/kizartma-yagi" class="list-button">Kızartma Yağı</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sivi-yaglar/misirozu-yagi" class="list-button">Mısırözü Yağı</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sivi-yaglar/susuz-yag" class="list-button">Susuz Yağ</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sivi-yaglar/aycicek-yagi" class="list-button">Ayçiçek Yağı</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sivi-yaglar/kanola-yag" class="list-button">Kanola Yağ</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sivi-yaglar/zeytinyagi" class="list-button">Zeytinyağı</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Tereyağ &amp; Margarin</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Tereyağ &amp; Margarin</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/tereyag-margarin/margarin" class="list-button">Margarin</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/tereyag-margarin/tereyag" class="list-button">Tereyağ</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Makarna</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Makarna</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/makarna/makarna" class="list-button">Makarna</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/makarna/kuskus" class="list-button">Kuskus</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/makarna/eriste" class="list-button">Erişte</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/un" class="list-button">Un</a> <!---->
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Şeker</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Şeker</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/seker/kup-seker" class="list-button">Küp Şeker</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/seker/toz-seker" class="list-button">Toz Şeker</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Bakliyat - Bulgur - Pirinç</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Bakliyat - Bulgur - Pirinç</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/sari-mercimek" class="list-button">Sarı Mercimek</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/pilavlik-bulgur" class="list-button">Pilavlık Bulgur</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/pirinc" class="list-button">Pirinç</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/kirmizi-mercimek" class="list-button">Kırmızı Mercimek</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/muhtelif" class="list-button">Muhtelif</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/yesil-mercimek" class="list-button">Yeşil Mercimek</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/koftelik-bulgur" class="list-button">Köftelik Bulgur</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/nohut" class="list-button">Nohut</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/fasulye" class="list-button">Fasulye</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/borulce" class="list-button">Börülce</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/misir" class="list-button">Mısır</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/bugday" class="list-button">Buğday</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/bakliyat-bulgur-pirinc/barbunya" class="list-button">Barbunya</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Hazır Yemek &amp; Çorba &amp; Meze</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Hazır Yemek &amp; Çorba &amp; Meze</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hazir-yemek-corba-meze/dolma" class="list-button">Dolma</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hazir-yemek-corba-meze/sandvic" class="list-button">Sandviç</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hazir-yemek-corba-meze/bulyon" class="list-button">Bulyon</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hazir-yemek-corba-meze/pogaca-borek-unlu-mamuller" class="list-button">Poğaça / Börek / Unlu Mamüller</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hazir-yemek-corba-meze/meze" class="list-button">Meze</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hazir-yemek-corba-meze/corba" class="list-button">Çorba</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hazir-yemek-corba-meze/cig-kofte" class="list-button">Çiğ Köfte</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hazir-yemek-corba-meze/manti" class="list-button">Mantı</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hazir-yemek-corba-meze/dondurulmus-pizza" class="list-button">Dondurulmuş Pizza</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Hamur ve Pasta Malzemeleri</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Hamur ve Pasta Malzemeleri</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/maya" class="list-button">Maya</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/pirinc-unu" class="list-button">Pirinç Unu</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/kabartma-tozu" class="list-button">Kabartma Tozu</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/krema-ve-sos" class="list-button">Krema ve Sos</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/yufka" class="list-button">Yufka</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/toz-tatli" class="list-button">Toz Tatlı</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/krem-santi" class="list-button">Krem Şanti</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/kakao" class="list-button">Kakao</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/nisasta" class="list-button">Nişasta</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/pasta-yardimcilari" class="list-button">Pasta Yardımcıları</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/kek-ve-pasta-un-karisimlari" class="list-button">Kek ve Pasta Un Karışımları</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hamur-ve-pasta-malzemeleri/pudra-sekeri" class="list-button">Pudra Şekeri</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Konserve - Salça</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Konserve - Salça</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/konserve-salca/konserve" class="list-button">Konserve</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/konserve-salca/salca" class="list-button">Salça</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/konserve-salca/tursu" class="list-button">Turşu</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Ketçap - Mayonez - Soslar</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Ketçap - Mayonez - Soslar</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/sirke" class="list-button">Sirke</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/diger-salata-soslari" class="list-button">Diğer Salata Sosları</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/hardal" class="list-button">Hardal</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/kahvaltilik-sos" class="list-button">Kahvaltılık Sos</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/ketcap" class="list-button">Ketçap</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/soya-sosu" class="list-button">Soya Sosu</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/ton-baligi" class="list-button">Ton Balığı</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/limon-sosu" class="list-button">Limon sosu</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/nar-eksisi" class="list-button">Nar Ekşisi</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ketcap-mayonez-soslar/mayonez" class="list-button">Mayonez</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-item has-sub">
                                    <button class="list-button">Kahvaltılık</button> 
                                    <div class="menu-submenu">
                                        <button class="submenu-back">Kahvaltılık</button> 
                                        <div class="menu-wrap wrapper">
                                            <ul class="menu-list">
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/sut" class="list-button">Süt</a> <!---->
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Peynir</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Peynir</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/peynir/krem-peynir" class="list-button">Krem Peynir</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/peynir/kasar-peynir" class="list-button">Kaşar Peynir</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/peynir/ucgen-peynir" class="list-button">Üçgen Peynir</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/peynir/diger-peynirler" class="list-button">Diğer Peynirler</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/peynir/beyaz-peynir" class="list-button">Beyaz Peynir</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/peynir/tulum-peynir" class="list-button">Tulum Peynir</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/yumurta" class="list-button">Yumurta</a> <!---->
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Ekmek</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Ekmek</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ekmek/paket-ekmek-kapali-ekmek" class="list-button">Paket Ekmek / Kapalı Ekmek</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ekmek/galeta-grissini" class="list-button">Galeta Grissini</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ekmek/lavas-ekmek" class="list-button">Lavaş Ekmek</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ekmek/gunluk-ekmek" class="list-button">Günlük Ekmek</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Zeytin</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Zeytin</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/zeytin/zeytin-ezmesi" class="list-button">Zeytin Ezmesi</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/zeytin/yesil-zeytin" class="list-button">Yeşil Zeytin</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/zeytin/siyah-zeytin" class="list-button">Siyah Zeytin</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Tereyağ &amp; Margarin</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Tereyağ &amp; Margarin</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/tereyag-margarin/margarin" class="list-button">Margarin</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/tereyag-margarin/tereyag" class="list-button">Tereyağ</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Bal &amp; Reçel</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Bal &amp; Reçel</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/bal-recel/recel" class="list-button">Reçel</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/bal-recel/bal" class="list-button">Bal</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Kaymak &amp; Krema &amp; Sos</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Kaymak &amp; Krema &amp; Sos</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kaymak-krema-sos/kahvaltilik-sos" class="list-button">Kahvaltılık Sos</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kaymak-krema-sos/krema" class="list-button">Krema</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kaymak-krema-sos/kaymak" class="list-button">Kaymak</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Çay &amp; Kahve</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Çay &amp; Kahve</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/cay-kahve/seker" class="list-button">Şeker</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/cay-kahve/cay" class="list-button">Çay</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/cay-kahve/kahve" class="list-button">Kahve</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Şarküteri</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Şarküteri</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sarkuteri/dana-salam" class="list-button">Dana Salam</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sarkuteri/pilic-jambon" class="list-button">Piliç Jambon</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sarkuteri/dana-sosis" class="list-button">Dana Sosis</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sarkuteri/pilic-sosis" class="list-button">Piliç Sosis</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sarkuteri/hindi-salam" class="list-button">Hindi Salam</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sarkuteri/dana-kavurma" class="list-button">Dana Kavurma</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sarkuteri/hindi-sosis" class="list-button">Hindi Sosis</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sarkuteri/dana-pastirma" class="list-button">Dana Pastırma</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sarkuteri/dana-sucuk" class="list-button">Dana Sucuk</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sarkuteri/pilic-sucuk" class="list-button">Piliç Sucuk</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sarkuteri/pilic-salam" class="list-button">Piliç Salam</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/krem-cikolata-ve-ezmeler" class="list-button">Krem Çikolata ve Ezmeler</a> <!---->
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Helva Tahin Pekmez</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Helva Tahin Pekmez</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/helva-tahin-pekmez/tahin" class="list-button">Tahin</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/helva-tahin-pekmez/helva" class="list-button">Helva</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/helva-tahin-pekmez/pekmez" class="list-button">Pekmez</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Mısır Gevreği &amp; Yulaf</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Mısır Gevreği &amp; Yulaf</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/misir-gevregi-yulaf/yulaf-ezmesi" class="list-button">Yulaf Ezmesi</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/misir-gevregi-yulaf/misir-gevregi" class="list-button">Mısır Gevreği</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Pastane ve Fırın Ürünleri</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Pastane ve Fırın Ürünleri</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/pastane-ve-firin-urunleri/pogaca-borek-unlu-mamuller" class="list-button">Poğaca / Börek / Unlu Mamüller</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/pastane-ve-firin-urunleri/kurabiye" class="list-button">Kurabiye</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">İçecekler</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">İçecekler</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/icecekler/meyve-suyu" class="list-button">Meyve Suyu</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/icecekler/toz-icecekler" class="list-button">Toz İçecekler</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-item has-sub">
                                    <button class="list-button">İçecek</button> 
                                    <div class="menu-submenu">
                                        <button class="submenu-back">İçecek</button> 
                                        <div class="menu-wrap wrapper">
                                            <ul class="menu-list">
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Gazlı İçecekler</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Gazlı İçecekler</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/gazli-icecekler/enerji-icecekleri" class="list-button">Enerji İçecekleri</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/gazli-icecekler/gazoz" class="list-button">Gazoz</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/gazli-icecekler/kola" class="list-button">Kola</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/gazli-icecekler/malt-icecekler" class="list-button">Malt İçecekler</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Gazsız İçecekler</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Gazsız İçecekler</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/gazsiz-icecekler/serbetler" class="list-button">Şerbetler</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/gazsiz-icecekler/buzlu-cay-buzlu-kahve" class="list-button">Buzlu Çay &amp; Buzlu Kahve</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/gazsiz-icecekler/meyve-suyu" class="list-button">Meyve Suyu</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/gazsiz-icecekler/salgam" class="list-button">Şalgam</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/gazsiz-icecekler/limonata" class="list-button">Limonata</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Su ve Maden Suları</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Su ve Maden Suları</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/su-ve-maden-sulari/maden-suyu" class="list-button">Maden Suyu</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/su-ve-maden-sulari/su" class="list-button">Su</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Çay &amp; Kahve</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Çay &amp; Kahve</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/cay-kahve/cay" class="list-button">Çay</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/cay-kahve/sut-tozu-ve-krema" class="list-button">Süt Tozu ve Krema</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/cay-kahve/kahve" class="list-button">Kahve</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Süt ve Süt Ürünleri</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Süt ve Süt Ürünleri</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sut-ve-sut-urunleri/salep" class="list-button">Salep</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sut-ve-sut-urunleri/kefir" class="list-button">Kefir</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sut-ve-sut-urunleri/sut" class="list-button">Süt</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sut-ve-sut-urunleri/boza" class="list-button">Boza</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sut-ve-sut-urunleri/ayran" class="list-button">Ayran</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/toz-icecekler" class="list-button">Toz İçecekler</a> <!---->
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-item has-sub">
                                    <button class="list-button">Dondurulmuş Gıda</button> 
                                    <div class="menu-submenu">
                                        <button class="submenu-back">Dondurulmuş Gıda</button> 
                                        <div class="menu-wrap wrapper">
                                            <ul class="menu-list">
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/dondurulmus-borek" class="list-button">Dondurulmuş Börek</a> <!---->
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/dondurulmus-pizza" class="list-button">Dondurulmuş Pizza</a> <!---->
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/dondurulmus-tatli" class="list-button">Dondurulmuş Tatlı</a> <!---->
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/dondurulmus-kofte" class="list-button">Dondurulmuş Köfte</a> <!---->
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/dondurma" class="list-button">Dondurma</a> <!---->
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/dondurulmus-kroket" class="list-button">Dondurulmuş Kroket</a> <!---->
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/dondurulmus-patates-kizartmasi" class="list-button">Dondurulmuş Patates Kızartması</a> <!---->
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/dondurulmus-misir" class="list-button">Dondurulmuş Mısır</a> <!---->
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/dondurulmus-milfoy" class="list-button">Dondurulmuş Milföy</a> <!---->
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/dondurulmus-bezelye" class="list-button">Dondurulmuş Bezelye</a> <!---->
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/dondurulmus-pide" class="list-button">Dondurulmuş Pide</a> <!---->
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/dondurulmus-manti" class="list-button">Dondurulmuş Mantı</a> <!---->
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-item has-sub">
                                    <button class="list-button">Bisküvi &amp;&nbsp;Çikolata &amp;&nbsp;Kuruyemiş</button> 
                                    <div class="menu-submenu">
                                        <button class="submenu-back">Bisküvi &amp;&nbsp;Çikolata &amp;&nbsp;Kuruyemiş</button> 
                                        <div class="menu-wrap wrapper">
                                            <ul class="menu-list">
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Bisküvi - Çikolata</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Bisküvi - Çikolata</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/biskuvi-cikolata/cikolata" class="list-button">Çikolata</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/biskuvi-cikolata/biskuvi" class="list-button">Bisküvi</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/biskuvi-cikolata/kek" class="list-button">Kek</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/biskuvi-cikolata/draje" class="list-button">Draje</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/biskuvi-cikolata/gofret" class="list-button">Gofret</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/biskuvi-cikolata/krem-cikolata-ve-ezmeler" class="list-button">Krem Çikolata ve Ezmeler</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/biskuvi-cikolata/kraker" class="list-button">Kraker</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Kuruyemiş ve Cips</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Kuruyemiş ve Cips</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kuruyemis-ve-cips/kuruyemis" class="list-button">Kuruyemiş</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kuruyemis-ve-cips/cips" class="list-button">Cips</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kuruyemis-ve-cips/patlamis-misir" class="list-button">Patlamış Mısır</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kuruyemis-ve-cips/kuru-meyve" class="list-button">Kuru Meyve</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Sakız &amp; Şekerleme</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Sakız &amp; Şekerleme</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sakiz-sekerleme/sakiz" class="list-button">Sakız</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sakiz-sekerleme/seker" class="list-button">Şeker</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sakiz-sekerleme/sekerleme" class="list-button">Şekerleme</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-item has-sub">
                                    <button class="list-button">Unlu Mamüller &amp;&nbsp;Pastane</button> 
                                    <div class="menu-submenu">
                                        <button class="submenu-back">Unlu Mamüller &amp;&nbsp;Pastane</button> 
                                        <div class="menu-wrap wrapper">
                                            <ul class="menu-list">
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Ekmek</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Ekmek</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ekmek/bazlama-lavas-ekmek" class="list-button">Bazlama &amp; Lavaş Ekmek</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ekmek/galeta-ve-grissini" class="list-button">Galeta ve Grissini</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ekmek/paket-ekmek-kapali-ekmek" class="list-button">Paket Ekmek / Kapalı ekmek</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ekmek/gunluk-ekmek" class="list-button">Günlük Ekmek</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Pastane ve Fırın Ürünleri</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Pastane ve Fırın Ürünleri</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/pastane-ve-firin-urunleri/pogaca-borek-unlu-mamul" class="list-button">Poğaça / Börek / Unlu Mamül</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/pastane-ve-firin-urunleri/kurabiye" class="list-button">Kurabiye</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Hamur &amp; Kek &amp; Pasta Malzemeleri</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Hamur &amp; Kek &amp; Pasta Malzemeleri</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/kabartma-tozu" class="list-button">Kabartma Tozu</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/kakao" class="list-button">Kakao</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/un" class="list-button">Un</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/toz-tatli" class="list-button">Toz Tatlı</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/krema-ve-sos" class="list-button">Krema ve Sos</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/yufka" class="list-button">Yufka</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/kek-ve-pasta-un-karisimlari" class="list-button">Kek ve Pasta Un Karışımları</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/pasta-yardimcilari" class="list-button">Pasta Yardımcıları</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/nisasta" class="list-button">Nişasta</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/krem-santi" class="list-button">Krem Şanti</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/maya" class="list-button">Maya</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hamur-kek-pasta-malzemeleri/pirinc-unu" class="list-button">Pirinç Unu</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Tatlılar</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Tatlılar</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/tatlilar/toz-tatlilar" class="list-button">Toz Tatlılar</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/tatlilar/puding" class="list-button">Puding</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/tatlilar/hazir-tatli" class="list-button">Hazır Tatlı</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-item has-sub">
                                    <button class="list-button">Meyve - Sebze</button> 
                                    <div class="menu-submenu">
                                        <button class="submenu-back">Meyve - Sebze</button> 
                                        <div class="menu-wrap wrapper">
                                            <ul class="menu-list">
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Sebze</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Sebze</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sebze/yesillik-ve-ot" class="list-button">Yeşillik ve Ot</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sebze/mevsim-sebzeleri" class="list-button">Mevsim Sebzeleri</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sebze/salata-malzemeleri" class="list-button">Salata Malzemeleri</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sebze/patates-sogan-sarimsak" class="list-button">Patates, Soğan, Sarımsak</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sebze/paket-sebze" class="list-button">Paket Sebze</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Meyve</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Meyve</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/meyve/paket-meyve" class="list-button">Paket Meyve</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/meyve/kuru-meyve" class="list-button">Kuru Meyve</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/meyve/narenciye" class="list-button">Narenciye</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/meyve/mevsim-meyveleri" class="list-button">Mevsim Meyveleri</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/meyve/egzotik-meyve" class="list-button">Egzotik Meyve</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-item has-sub">
                                    <button class="list-button">Kişisel Bakım</button> 
                                    <div class="menu-submenu">
                                        <button class="submenu-back">Kişisel Bakım</button> 
                                        <div class="menu-wrap wrapper">
                                            <ul class="menu-list">
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Kadın Bakım &amp; Kozmetik</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Kadın Bakım &amp; Kozmetik</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/sac-boyalari" class="list-button">Saç Boyaları</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/makyaj-pamuk-ve-pedleri" class="list-button">Makyaj Pamuk ve Pedleri</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/oje" class="list-button">Oje</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/tuy-dokucu" class="list-button">Tüy Dökücü</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/bb-kremler" class="list-button">BB Kremler</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/maskara" class="list-button">Maskara</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/ruj" class="list-button">Ruj</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/goz-kalemi-eyeliner" class="list-button">Göz Kalemi / Eyeliner</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/agda" class="list-button">Ağda</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/hijyenik-ped" class="list-button">Hijyenik Ped</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/kadin-roll-on-deodorant" class="list-button">Kadın Roll On Deodorant</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/kadin-parfum" class="list-button">Kadın Parfüm</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/yuz-temizleme" class="list-button">Yüz Temizleme</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/aseton" class="list-button">Aseton</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/kadin-sprey-deodorant" class="list-button">Kadın Sprey Deodorant</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/kadin-tiras-bicagi" class="list-button">Kadın Tıraş Bıçağı</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kadin-bakim-kozmetik/aksesuar" class="list-button">Aksesuar</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Erkek Bakım &amp; Kozmetik</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Erkek Bakım &amp; Kozmetik</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/erkek-bakim-kozmetik/tiras-kopugu" class="list-button">Tıraş Köpüğü</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/erkek-bakim-kozmetik/erkek-sprey-deodorant" class="list-button">Erkek Sprey Deodorant</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/erkek-bakim-kozmetik/tiras-kolonyasi" class="list-button">Tıraş Kolonyası</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/erkek-bakim-kozmetik/parfum" class="list-button">Parfüm</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/erkek-bakim-kozmetik/tiras-bicagi" class="list-button">Tıraş Bıçağı</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/erkek-bakim-kozmetik/erkek-roll-on-deodorant" class="list-button">Erkek Roll On Deodorant</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Banyo &amp; Duş &amp; Şampuan</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Banyo &amp; Duş &amp; Şampuan</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/banyo-dus-sampuan/sabun" class="list-button">Sabun</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/banyo-dus-sampuan/vucut-sampuani" class="list-button">Vücut Şampuanı</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/banyo-dus-sampuan/sac-kremi" class="list-button">Saç Kremi</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/banyo-dus-sampuan/kulak-cubugu" class="list-button">Kulak Çubuğu</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/banyo-dus-sampuan/sampuan" class="list-button">Şampuan</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/banyo-dus-sampuan/lif-sungerler" class="list-button">Lif &amp; Süngerler</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Ağız Bakım Ürünleri</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Ağız Bakım Ürünleri</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/agiz-bakim-urunleri/agiz-bakim" class="list-button">Ağız Bakım</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/agiz-bakim-urunleri/kurdan" class="list-button">Kürdan</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/agiz-bakim-urunleri/dis-ipi" class="list-button">Diş İpi</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/agiz-bakim-urunleri/dis-fircasi" class="list-button">Diş Fırçası</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/agiz-bakim-urunleri/dis-macunu" class="list-button">Diş Macunu</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Yüz Bakım</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Yüz Bakım</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/yuz-bakim/temizleme-urunleri" class="list-button">Temizleme Ürünleri</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/yuz-bakim/ozel-kremler-kirisiklik" class="list-button">Özel Kremler (Kırışıklık)</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/yuz-bakim/dudak-koruyucular" class="list-button">Dudak Koruyucular</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/yuz-bakim/yuz-maskeleri" class="list-button">Yüz Maskeleri</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/yuz-bakim/gunluk-bakim-kremleri" class="list-button">Günlük Bakım Kremleri </a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Vücut &amp; El &amp; Ayak Bakım</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Vücut &amp; El &amp; Ayak Bakım</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/vucut-el-ayak-bakim/vucut-yagi" class="list-button">Vücut Yağı</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/vucut-el-ayak-bakim/vucut-el-kremi" class="list-button">Vücut El Kremi</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/vucut-el-ayak-bakim/ayak-bakim-kremi" class="list-button">Ayak Bakım Kremi</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/vucut-el-ayak-bakim/pedikur-manikur" class="list-button">Pedikür &amp; Manikür</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Saç Bakım</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Saç Bakım</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sac-bakim/sac-kremi" class="list-button">Saç Kremi</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sac-bakim/tarak-toka" class="list-button">Tarak &amp; Toka</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sac-bakim/sac-bakimi" class="list-button">Saç Bakımı</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sac-bakim/sac-sekillendirici" class="list-button">Saç Şekillendirici</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/sac-bakim/sac-boyasi" class="list-button">Saç Boyası</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Kağıt &amp; Peçete &amp; Mendil &amp; Pamuk &amp; Ped</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Kağıt &amp; Peçete &amp; Mendil &amp; Pamuk &amp; Ped</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil-pamuk-ped/hijyenik-ped" class="list-button">Hijyenik Ped</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil-pamuk-ped/islak-mendil-havlu" class="list-button">Islak Mendil &amp; Havlu</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil-pamuk-ped/kagit-havlu" class="list-button">Kağıt Havlu</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil-pamuk-ped/pamukkulak-cubugu" class="list-button">Pamuk&amp;Kulak Çubuğu</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil-pamuk-ped/tuvalet-kagidi" class="list-button">Tuvalet Kağıdı</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil-pamuk-ped/kagit-mendil" class="list-button">Kağıt Mendil</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil-pamuk-ped/kagit-pecete" class="list-button">Kağıt Peçete</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Sağlık &amp; Hasta Bakım</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Sağlık &amp; Hasta Bakım</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/saglik-hasta-bakim/yara-bandi" class="list-button">Yara Bandı</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/saglik-hasta-bakim/prezervatif" class="list-button">Prezervatif</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/saglik-hasta-bakim/medikal-urunler" class="list-button">Medikal Ürünler </a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/saglik-hasta-bakim/hasta-bezi" class="list-button">Hasta Bezi</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/saglik-hasta-bakim/agri-bandi" class="list-button">Ağrı Bandı</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Güneş Bakım Ürünleri</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Güneş Bakım Ürünleri</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/gunes-bakim-urunleri/gunes-yaglari-losyonlar-sut" class="list-button">Güneş Yağları &amp; Losyonlar &amp; Süt</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/gunes-bakim-urunleri/bakim-sutu" class="list-button">Bakım Sütü</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Kolonya</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Kolonya</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kolonya/kolonyalar" class="list-button">Kolonyalar</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-item has-sub">
                                    <button class="list-button">Temizlik</button> 
                                    <div class="menu-submenu">
                                        <button class="submenu-back">Temizlik</button> 
                                        <div class="menu-wrap wrapper">
                                            <ul class="menu-list">
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Bulaşık</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Bulaşık</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/bulasik/makine-temizleyicisi" class="list-button">Makine Temizleyicisi</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/bulasik/makine-tuzu" class="list-button">Makine Tuzu</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/bulasik/parlatici" class="list-button">Parlatıcı</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/bulasik/eldiven" class="list-button">Eldiven</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/bulasik/makine-kokusu" class="list-button">Makine Kokusu</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/bulasik/bulasik-tabletdeterjani" class="list-button">Bulaşık Tablet/Deterjanı</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/bulasik/bulasik-bezi" class="list-button">Bulaşık Bezi</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/bulasik/bulasik-sungeri-ve-teli" class="list-button">Bulaşık Süngeri ve Teli</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Mutfak Yardımcıları</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Mutfak Yardımcıları</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/mutfak-yardimcilari/aluminyum-folyo" class="list-button">Alüminyum Folyo</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/mutfak-yardimcilari/buzdolabi-poseti" class="list-button">Buzdolabı Poşeti</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/mutfak-yardimcilari/firin-torbasi" class="list-button">Fırın Torbası</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/mutfak-yardimcilari/cop-torbalari" class="list-button">Çöp Torbaları</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/mutfak-yardimcilari/strec-film" class="list-button">Streç Film</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/mutfak-yardimcilari/pisirme-kagidi" class="list-button">Pişirme Kağıdı</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Çamaşır</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Çamaşır</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/camasir/camasir-deterjani" class="list-button">Çamaşır Deterjanı</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/camasir/renk-koruyucu" class="list-button">Renk Koruyucu</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/camasir/camasir-yumusaticisi" class="list-button">Çamaşır Yumuşatıcısı</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/camasir/camasir-suyu" class="list-button">Çamaşır Suyu</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/camasir/leke-cikarici" class="list-button">Leke Çıkarıcı</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/camasir/kirec-onleyici" class="list-button">Kireç Önleyici</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/camasir/bebek-deterjani" class="list-button">Bebek Deterjanı</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Ev Temizleyicileri</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Ev Temizleyicileri</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/tuvalet-kokusu-giderici" class="list-button">Tuvalet Kokusu Giderici</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/kirec-sokucu" class="list-button">Kireç Sökücü</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/cop-torbasi" class="list-button">Çöp Torbası</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/lavabo-acici" class="list-button">Lavabo Açıcı</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/camasir-suyu" class="list-button">Çamaşır Suyu</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/oda-kokusu" class="list-button">Oda Kokusu</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/cam-temizleyici" class="list-button">Cam Temizleyici</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/firca-ve-paspaslar" class="list-button">Fırça ve Paspaslar</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/fiber-bezler" class="list-button">Fiber Bezler</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/banyo-mutfak-yuzey-temizleyici" class="list-button">Banyo / Mutfak / Yüzey Temizleyici</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/bulasik-sungeri" class="list-button">Bulaşık Süngeri</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/ahsap-temizleyici" class="list-button">Ahşap Temizleyici</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/eldiven" class="list-button">Eldiven</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/temizlik-setleri" class="list-button">Temizlik Setleri</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/hali-sampuani" class="list-button">Halı Şampuanı</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ev-temizleyicileri/temizlik-bezleri" class="list-button">Temizlik Bezleri</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/sabun" class="list-button">Sabun</a> <!---->
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Kağıt &amp; Peçete &amp; Mendil</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Kağıt &amp; Peçete &amp; Mendil</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil/kagit-mendil" class="list-button">Kağıt Mendil</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil/islak-mendil-havlu" class="list-button">Islak Mendil &amp; Havlu</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil/kagit-pecete" class="list-button">Kağıt Peçete</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil/kagit-havlu" class="list-button">Kağıt Havlu</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/kagit-pecete-mendil/tuvalet-kagidi" class="list-button">Tuvalet Kağıdı</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-item has-sub">
                                    <button class="list-button">Elektronik &amp;&nbsp;Giyim &amp;&nbsp;Diğer</button> 
                                    <div class="menu-submenu">
                                        <button class="submenu-back">Elektronik &amp;&nbsp;Giyim &amp;&nbsp;Diğer</button> 
                                        <div class="menu-wrap wrapper">
                                            <ul class="menu-list">
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Elektrikli ve Elektronik Ev Aletleri</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Elektrikli ve Elektronik Ev Aletleri</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/telefonlar" class="list-button">Telefonlar </a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/goruntu-ve-ses-sistemleri" class="list-button">Görüntü ve Ses Sistemleri</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/pil" class="list-button">Pil</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/fotograf-makinalari-ve-kamera" class="list-button">Fotoğraf Makinaları ve Kamera</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/aydinlatma-cihazlar" class="list-button">Aydınlatma Cihazlar</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/kablo-priz-adaptor" class="list-button">Kablo &amp; Priz &amp; Adaptör</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/monitor" class="list-button">Monitör</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/ampul" class="list-button">Ampul</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/bilgisayar-tablet-ve-aksesuarlari" class="list-button">Bilgisayar &amp; Tablet ve Aksesuarları</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/telefon-aksesuarlari" class="list-button">Telefon Aksesuarları</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/televizyonlar" class="list-button">Televizyonlar</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/elektrikli-kisisel-bakim-saglik" class="list-button">Elektrikli Kişisel Bakım &amp; Sağlık</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/kucuk-ev-aletleri" class="list-button">Küçük Ev Aletleri</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/beyaz-esyalar" class="list-button">Beyaz Eşyalar</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/elektrikli-ve-elektronik-ev-aletleri/isitma-sogutma-sistemleri" class="list-button">Isıtma &amp; Soğutma Sistemleri</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Giyim &amp; Ayakkabı &amp; Aksesuar</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Giyim &amp; Ayakkabı &amp; Aksesuar</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/ic-camasiri" class="list-button">İç Çamaşırı</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/dis-giyim" class="list-button">Dış Giyim</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/canta" class="list-button">Çanta</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/ayakkabi-bot-sandalet" class="list-button">Ayakkabı &amp; Bot &amp; Sandalet</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/pijama" class="list-button">Pijama</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/semsiye" class="list-button">Şemsiye</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/ayakkabi-boyasi" class="list-button">Ayakkabı Boyası</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/aksesuar" class="list-button">Aksesuar</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/terlik" class="list-button">Terlik</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/plaj-kiyafetleri" class="list-button">Plaj Kıyafetleri</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/corap" class="list-button">Çorap</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/giyim-ayakkabi-aksesuar/ayakkabi-sungeri" class="list-button">Ayakkabı Süngeri</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Züccaciye ve Ev Eşyaları</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Züccaciye ve Ev Eşyaları</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/camasir-kurutma" class="list-button">Çamaşır Kurutma</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/aski" class="list-button">Askı</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/mangal-aksesuar" class="list-button">Mangal &amp; Aksesuar</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/kullan-at-mutfak-esyalari" class="list-button">Kullan At Mutfak Eşyaları</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/ev-mobilyalari" class="list-button">Ev Mobilyaları</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/mutfak-saklama-gerecleri" class="list-button">Mutfak Saklama Gereçleri</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/mutfak-pisirici-gerecler" class="list-button">Mutfak Pişirici Gereçler</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/bardaklar" class="list-button">Bardaklar</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/sofra-servis" class="list-button">Sofra-Servis</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/dekoratif-urunler" class="list-button">Dekoratif Ürünler</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/tabak-kase" class="list-button">Tabak / Kase</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/mutfak-plastik-urunleri" class="list-button">Mutfak Plastik Ürünleri</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/cay-bardagi" class="list-button">Çay Bardağı</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/mutfak-el-aletleri" class="list-button">Mutfak El Aletleri</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/banyo-mutfak-oda-duzenleme" class="list-button">Banyo &amp; Mutfak &amp; Oda Düzenleme</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/banyo-setleri" class="list-button">Banyo Setleri</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/surahiler" class="list-button">Sürahiler</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/porselen-seramik-urunler" class="list-button">Porselen Seramik Ürünler</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/zuccaciye-ve-ev-esyalari/cakmak-kibrit" class="list-button">Çakmak / Kibrit</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Haşare Öldürücüleri</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Haşare Öldürücüleri</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hasare-olduruculeri/yemler" class="list-button">Yemler</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hasare-olduruculeri/spreyler" class="list-button">Spreyler</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hasare-olduruculeri/makineler" class="list-button">Makineler</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hasare-olduruculeri/matlar" class="list-button">Matlar</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/hasare-olduruculeri/likitler" class="list-button">Likitler</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Ev Tekstili</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Ev Tekstili</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ev-tekstili/ev-tekstili" class="list-button">Ev Tekstili</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ev-tekstili/yatak-urunleri" class="list-button">Yatak Ürünleri</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ev-tekstili/duzenleme" class="list-button">Düzenleme</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/ev-tekstili/havlu-urunleri" class="list-button">Havlu Ürünleri</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Fırsat Ürünleri</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Fırsat Ürünleri</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/firsat-urunleri/seyahat-gerecleri" class="list-button">Seyahat Gereçleri</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/firsat-urunleri/bahce-urunleri" class="list-button">Bahçe Ürünleri</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/firsat-urunleri/hobi" class="list-button">Hobi</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/firsat-urunleri/parti-ve-sus-urunleri" class="list-button">Parti ve Süs Ürünleri</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/firsat-urunleri/deniz-tatili-urunleri" class="list-button">Deniz Tatili Ürünleri</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/firsat-urunleri/spor-urunleri" class="list-button">Spor Ürünleri</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/firsat-urunleri/oto-bakim-ve-aksesuarlari" class="list-button">Oto Bakım ve Aksesuarları</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/firsat-urunleri/nalburiye-hirdavat-urunleri" class="list-button">Nalburiye - Hırdavat Ürünleri</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/firsat-urunleri/bebek-bakim-araclari" class="list-button">Bebek Bakım Araçları</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/firsat-urunleri/muzik" class="list-button">Müzik</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/firsat-urunleri/tekne-ve-balikcilik-urunleri" class="list-button">Tekne ve Balıkçılık Ürünleri</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/firsat-urunleri/kamp-urunleri" class="list-button">Kamp Ürünleri</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Oyuncaklar</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Oyuncaklar</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/oyuncaklar/oyuncaklar" class="list-button">Oyuncaklar</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-item has-sub">
                                                    <button class="list-button">Medya &amp; Kırtasiye</button> 
                                                    <div class="menu-submenu">
                                                        <button class="submenu-back">Medya &amp; Kırtasiye</button> 
                                                        <div class="menu-wrap wrapper">
                                                            <ul class="menu-list">
                                                                <li class="list-item"><a href="https://www.ceptesok.com/medya-kirtasiye/kirtasiye-urunleri" class="list-button">Kırtasiye Ürünleri</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/medya-kirtasiye/defterler" class="list-button">Defterler</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/medya-kirtasiye/kitaplar" class="list-button">Kitaplar</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/medya-kirtasiye/gazeteler" class="list-button">Gazeteler</a></li>
                                                                <li class="list-item"><a href="https://www.ceptesok.com/medya-kirtasiye/dergiler" class="list-button">Dergiler</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-item has-sub">
                                    <button class="list-button">Bebek Ürünleri</button> 
                                    <div class="menu-submenu">
                                        <button class="submenu-back">Bebek Ürünleri</button> 
                                        <div class="menu-wrap wrapper">
                                            <ul class="menu-list">
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/bebek-mamasi" class="list-button">Bebek Maması</a> <!---->
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/bebek-esyalari" class="list-button">Bebek Eşyaları</a> <!---->
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/bebek-bezi" class="list-button">Bebek Bezi</a> <!---->
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/islak-havlu-mendil" class="list-button">Islak Havlu &amp; Mendil</a> <!---->
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/bebek-sac-sampuani" class="list-button">Bebek Saç Şampuanı</a> <!---->
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/bebek-kolonyalari" class="list-button">Bebek Kolonyaları</a> <!---->
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/bebek-yaglari" class="list-button">Bebek Yağları</a> <!---->
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/bebek-deterjani" class="list-button">Bebek Deterjanı</a> <!---->
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/bebek-yumusaticisi" class="list-button">Bebek Yumuşatıcısı</a> <!---->
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/bebek-bakim-setleri" class="list-button">Bebek Bakım Setleri</a> <!---->
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/bebek-kremleri" class="list-button">Bebek Kremleri</a> <!---->
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-item has-sub">
                                    <button class="list-button">Light Ürünler</button> 
                                    <div class="menu-submenu">
                                        <button class="submenu-back">Light Ürünler</button> 
                                        <div class="menu-wrap wrapper">
                                            <ul class="menu-list">
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/light-urunler" class="list-button">Light Ürünler</a> <!---->
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-item has-sub">
                                    <button class="list-button">Evcil Hayvan Ürünleri</button> 
                                    <div class="menu-submenu">
                                        <button class="submenu-back">Evcil Hayvan Ürünleri</button> 
                                        <div class="menu-wrap wrapper">
                                            <ul class="menu-list">
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/kus-yemi" class="list-button">Kuş Yemi</a> <!---->
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/evcil-hayvan-urunleri" class="list-button">Evcil Hayvan Ürünleri</a> <!---->
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/kopek-mamasi" class="list-button">Köpek Maması</a> <!---->
                                                </li>
                                                <li class="list-item">
                                                    <a href="https://www.ceptesok.com/kedi-mamasi" class="list-button">Kedi Maması</a> <!---->
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>
</template>
<script src="../assets/js/b.js"></script>
<script>
import Sepet from './Sepet.vue'
export default {
     name: 'Headers',
     components:{
     Sepet,
   },
     data() {
       return {
        data:"",
        subdata:[],
        gor:false,
        hideBar:true,
        active:false
       }
    },
    methods:{
     activeChange:function(e)
     {
        if(e.path[0].dataset.menu =="menu-mobile" || e.path[0].className=="icon-menu"){
            if(this.active==true){
                this.active=false;
            }else{
                this.active=true;
            }
        }
     },
     hideOne:function(e){
          if(this.hideBar==true)
         this.hideBar=false;
         else
            {
            if(e.target.name !== "namername"){
                this.hideBar=true;
            }
            }
     },
     getCategories:function(parent){
         var result=[];
         
         for(var i = 0 ; i< this.data.payload.categories.length;i++)
         {
             for(var j = 0; j<this.data.payload.categories[i].children.length;j++){
             
                    if(this.data.payload.categories[i].children[j].parentid==parent){
                    result.push(this.data.payload.categories[i].children[j]);
                }
             }
         }
         return result;
     },

     getSubCategories:function(parentidd){
        var result=[];
        for(var i = 0 ; i< this.data.payload.categories.length;i++){
            for(var j = 0; j<this.data.payload.categories[i].children.length;j++){
                for(var k = 0; k<this.data.payload.categories[i].children[j].children.length;k++){
                        if(this.data.payload.categories[i].children[j].children[k].parentid==parentidd){
                          result.push(this.data.payload.categories[i].children[j].children[k]); 
                         
                        }
                }
            }
        }
        return result;
     }
    },
    created() {
        fetch('https://www.ceptesok.com/api/v1/categories')
        .then(response => response.json())
        .then(data => {
         this.data = data;
         setTimeout(() => (this.gor = true), 3000);
       
         this.gor=true;
          });
        
          
        }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');
@import url('https://fonts.googleapis.com/css?family=Andada|Permanent+Marker|Raleway:300');
* {
 box-sizing: border-box;
}

#namer input {
 border: 0;
 border-bottom: 2px solid rgb(0, 0, 0);
 width: 100%;
 font-size: 30px;
 line-height: 35px;
 height: 70px;
 text-align: center;
 padding: 10px;
 background: transparent;
	color: #BBDEFB;
}

#namer input.shake {
 animation-name: shaker;
 animation-duration: 200ms;
 animation-timing-function: ease-in-out;
 animation-delay: 0s;
}

#namer input:focus {
 outline: 0;
	color: rgb(7, 7, 7);
}

#namer input::placeholder {
 color: rgb(0, 0, 0);
}

.namer-controls {
 position: relative;
 display: block;
 height: 55px;
 margin: 20px 0;
 text-align: center;
 opacity: 0.3;
 cursor: not-allowed;
}

.namer-controls.active {
 opacity: 1;
 cursor: pointer;
}

.namer-controls div {
 float: left;
 width: 33.33%;
}

.namer-controls div span {
 box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.25);
 padding: 10px 5px;
 width: 95%;
 display: inline-block;
 margin-right: 5%;
 border-radius: 30px;
 font-size: 16px;
 font-weight: bold;
 letter-spacing: 0.3px;
}

.namer-controls div span:last-child {
 margin-right: 0;
}

.namer-controls div span.active {
 box-shadow: none;
 background-color: rgb(0, 0, 0);
 color: #fff;
}

#namer-input.serious input {
 letter-spacing: 2px;
 font-family: 'Andada', serif;
 font-weight: 500;
}

#namer-input.modern input {
 font-family: 'Raleway', sans-serif;
 text-transform: lowercase;
 font-weight: 300;
 letter-spacing: 10px;
}

#namer-input.cheeky input {
 font-family: 'Permanent Marker', cursive;
 font-size: 40px;
}

@keyframes shaker {
 0% {
  transform: translate(0px, 0px) rotate(0deg);
  opacity: 0.8;
 }
 10% {
  transform: translate(10px, 7px) rotate(-9deg);
  opacity: 0.6;
 }
 20% {
  transform: translate(13px, -19px) rotate(-3deg);
  opacity: 0.3;
 }
 30% {
  transform: translate(-6px, -6px) rotate(2deg);
  opacity: 0.4;
 }
 40% {
  transform: translate(-9px, -18px) rotate(-5deg);
  opacity: 0.4;
 }
 50% {
  transform: translate(10px, -8px) rotate(5deg);
  opacity: 0.7;
 }
 60% {
  transform: translate(-10px, 14px) rotate(-6deg);
  opacity: 1;
 }
 70% {
  transform: translate(10px, 3px) rotate(6deg);
  opacity: 0.1;
 }
 80% {
  transform: translate(-2px, 20px) rotate(-6deg);
  opacity: 1;
 }
 90% {
  transform: translate(-7px, -19px) rotate(2deg);
  opacity: 0.5;
 }
}
</style>