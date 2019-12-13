<template>
<div>
    <button class="right-cartinfo basketbar-trigger" @click="go($event)">
        <div class="cartinfo-basket icon-cart-2"><i class="cartinfo-quantity">0</i></div>
        <div class="cartinfo-total">
            <div class="pricebox plain">
                <div class="pricebox-content"><span class="currency pricebox-currency"></span><span class="pricebox-main">0</span><span class="pricebox-decimal">00</span></div>
            </div>
        </div>
        <span class="cartinfo-text">Sepet</span>
    </button>
    <aside id="basket-bar" :class="{active , show}">
        <div class="basket-content">
            <a href="#"><img alt="Sepet Kapat" class="sepet-close" src="../img/icon_close.jpg" width="40" height="40" @click="go($event)"></a>
            <div class="content-wrap">
                <h3 class="basket-title"><i class="title-icon icon-cart-2"></i>Sepet <span class="basket-quantity">0</span></h3>
                <div class="basket-items full scrollbar mCustomScrollbar _mCS_4 mCS_no_scrollbar scrollbar-initialized">
                    <div id="mCSB_4" class="mCustomScrollBox mCS-custom mCSB_vertical mCSB_inside" style="max-height: none;" tabindex="0">
                        <div id="mCSB_4_container" class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style="position:relative; top:0; left:0;" dir="ltr">
                            <ul class="items-list scrollbar mCustomScrollbar _mCS_5 mCS_no_scrollbar scrollbar-initialized">
                                <div id="mCSB_5" class="mCustomScrollBox mCS-custom mCSB_vertical mCSB_inside" style="max-height: none;" tabindex="0">
                                    <div id="mCSB_5_container" class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style="position:relative; top:0; left:0;" dir="ltr">
                                     
                                        <sepette-urunler/>
                                        
                                    </div>
                                    <div id="mCSB_5_scrollbar_vertical" class="mCSB_scrollTools mCSB_5_scrollbar mCS-custom mCSB_scrollTools_vertical" style="display: none;">
                                        <div class="mCSB_draggerContainer">
                                            <div id="mCSB_5_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 50px; top: 0px; height: 0px;">
                                                <div class="mCSB_dragger_bar" style="line-height: 50px;"></div>
                                            </div>
                                            <div class="mCSB_draggerRail"></div>
                                        </div>
                                    </div>
                                </div>
                            </ul>
                        </div>
                        <div id="mCSB_4_scrollbar_vertical" class="mCSB_scrollTools mCSB_4_scrollbar mCS-custom mCSB_scrollTools_vertical" style="display: none;">
                            <div class="mCSB_draggerContainer">
                                <div id="mCSB_4_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 50px; top: 0px; height: 0px;">
                                    <div class="mCSB_dragger_bar" style="line-height: 50px;"></div>
                                </div>
                                <div class="mCSB_draggerRail"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="basket-controls full grid-container narrow-vertical">
                    <div class="controls-prices grid-row">
                        <div class="prices-val grid-col gap-bottom-high highlight"> KDV Dahil Toplam Tutar:
                            <div class="val-price"><span class="currency"></span> 0 </div>
                        </div>
                    </div>
                    <div class="controls-buttons grid-row">
                        <div class="grid-col gap-top-high"><a href="/siparis/#/sepet" class="btn green block">Şimdi Satın Al</a></div>
                    </div>
                </div>
                <div class="basket-controls empty grid-container narrow-vertical">
                    <div class="controls-buttons grid-row">
                        <div class="grid-col"><a href="/html/index.php?id=checkout-1" class="btn yellow block">Sepete Git</a></div>
                    </div>
                </div>
            </div>
        </div>
    </aside>
</div>

</template>


<script>
import SepetteUrunler from './SepetteUrunler.vue'
export default {
        name:'Sepet',
        components:{
     SepetteUrunler,
   },
     data() {
       return {
           active:false,
           show:false
       }
     },
     methods:{
         go:function(e){
            if(this.active == true){
                this.active=false; this.show=false;
            }else{
                 this.active=true; this.show=true;
            }
         }
     }
}
</script>

<style>
.sepet-close{
    padding: 2px 2px 1px 2px;
    background-color: #ffe000;
    border: 2px solid #ffe000;
    border-radius: 1rem;
    margin-left: 275px;
    position: absolute;
    z-index: 2;
    width: 70px;
    height: 70px;
}
</style>