<template>
   <div>
        <button class="right-cartinfo basketbar-trigger">
            <div class="cartinfo-basket icon-cart-2"><i class="cartinfo-quantity">0</i></div>
            <div class="cartinfo-total">
                <div class="pricebox plain">
                    <div class="pricebox-content"><span class="currency pricebox-currency"></span><span class="pricebox-main">0</span><span class="pricebox-decimal">00</span></div>
                    </div>
                </div>
            <span class="cartinfo-text">Sepet</span>
        </button>

        <aside id="basket-bar">
            <div class="basket-content">
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

        <!-- <aside id="basket-bar" class="active show">
            <div class="basket-content">
                <div class="content-wrap"> 
                    <div class="basket-items">
                        <div class="items-empty">
                            Sepetinde şu anda<br> ürün bulunmuyor.
                        </div>
                    </div>
                    <div class="basket-controls empty grid-container narrow-vertical">
                        <div class="controls-buttons grid-row">
                            <div class="grid-col">
                                <a href="/html/index.php?id=checkout-1" class="btn yellow block">Sepete Git</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside> -->

   </div>
</template>


<script>
export default {
    name:'Sepet',
     data() {
       return {}
     }
}
</script>