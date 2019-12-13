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
                <a href="#"><img alt="Sepet Kapat" class="sepet-close" src="../img/icon_close.jpg" width="100" height="100" @click="go($event)"></a>
                <div class="content-wrap">
                    <div class="basket-items">
                        <div class="items-empty">
                            Sepetinde şu anda<br> ürün bulunmuyor.
                        </div>
                    </div>
                    <div class="basket-controls empty grid-container narrow-vertical">
                        <div class="controls-buttons grid-row">
                            <div class="grid-col"><a href="https://www.ceptesok.com/html/index.php?id=checkout-1" class="btn yellow block">Sepete Git</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
   </div>
</template>


<script>
export default {
    name:'Sepet',
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
    background-color: rgb(145, 145, 146);
    border: 2px solid #ffe000;
    border-radius: 1rem;
    margin-left: 275px;
    position: absolute;
    z-index: 2;
    width: 70px;
    height: 70px;
}
</style>