<template>
<div v-if="gor">
    <header><headers/></header>
    <nav class="section breadcrumbs">
                        <div class="wrapper breadcrumbs-wrap">
                            <div class="breadcrumbs-container">
                                <ul class="breadcrumbs-list">
                                    <li><a href="https://www.ceptesok.com">Ana Sayfa</a></li>
                                    <li><span>{{data.payload.product.category.parent.name}}</span></li>
                                    <li><a :href="data.payload.product.category.parent.slug+'/'+data.payload.product.category.slug">{{data.payload.product.category.name}}</a></li>
                                    <li><span>{{data.payload.product.warranty_description}}</span></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
    <main class="section product-detail grid-container">
    <div class="wrapper narrow">
        <div class="grid-row detail-wrap">
            <div class="grid-col section detail-gallery">
                <div class="gallery-slider-wrap">
                    <div class="gallery-slider owl-carousel owl-loaded owl-drag">
                        <div class="owl-stage-outer">
                            <div class="owl-stage" style="transform: translate3d(-882px, 0px, 0px); transition: all 0s ease 0s; width: 2205px;">
                                <div class="owl-item active" style="width: 441px;"><img class="slider-image" data-nth="0" :src="'https://cdnd.ceptesok.com/product/420x420/'+data.payload.product.files[0].document_href"></div>
                                <div class="owl-item cloned" style="width: 441px;"><img class="slider-image" data-nth="0"  :src="'https://cdnd.ceptesok.com/product/420x420/'+data.payload.product.files[0].document_href"></div>
                                <div class="owl-item cloned" style="width: 441px;"><img class="slider-image" data-nth="0"  :src="'https://cdnd.ceptesok.com/product/420x420/'+data.payload.product.files[0].document_href"></div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
            <div class="grid-col section detail-content">
                <div class="content-meta">
                    <div class="pricebox">
                        <div class="pricebox-content"><span class="currency pricebox-currency"></span><span class="pricebox-decimal">{{data.payload.product.min_price}}</span></div>
                    </div>
                    <div class="meta-controls">
                        <div class="controls-share">
                            <h3 class="share-title">Paylaş:</h3>
                            <ul class="share-icons">
                                <li class="icons-icon">
                                    <a href="https://www.facebook.com/sharer/sharer.php?u=https://www.ceptesok.com/" target="_blank" class="icon-link icon-facebook"></a>
                                </li>
                                <li class="icons-icon">
                                    <a href="https://twitter.com/share?https://www.ceptesok.com/" target="_blank" class="icon-link icon-twitter"></a>
                                </li>
                                <li class="icons-icon">
                                    <a href="https://plus.google.com/share?url=https://www.ceptesok.com/" target="_blank" class="icon-link icon-google-plus"></a>
                                </li>
                            </ul>
                        </div>
                        <button class="controls-like"><i class="icon-heart-empty"></i> <i class="icon-heart-full active"></i></button>
                    </div>
                </div>
                <div class="content-description">
                    <h1 class="description-title">{{data.payload.product.name}}</h1>
                    <p class="description-subtitle">1 {{gettype(data.payload.product.unit)}}</p>
                    <!---->
                    <!---->
                </div>
                <div>
                    <div class="content-controls">
                        <div class="controls-quantity">
                            <!---->
                            <div class="quantity-amount numberbox">
                                <button class="numberbox-button number-increase"></button>
                                <button class="numberbox-button number-decrease"></button>
                                <input type="text" max="10" min="1" id="amount" data-after="adet" data-step="1" disabled="disabled">
                            </div>
                        </div>
                    </div>
                    <div class="content-controls">
                        <button v-on:click="go()" data-modal="modal_stores" class="controls-addtocart btn green text-big modaltrigger"><i class="icon-basket"></i> <span>Sepete Ekle</span></button>
                        <!---->
                        <!---->
                        <!---->
                    </div>
                </div>
                <div class="description-text"> </div>
            </div>
        </div>
        <!---->
    </div>
</main>
<altkisim/>
</div>
</template>
<script>
import headers from './Headers.vue'
import Altkisim  from './Altkisim.vue'


export default {
    
    name: 'Urun',
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
    mounted () {
            this.init()
           },
    methods :{
         init () {
           fetch('https://www.ceptesok.com/api/v1/products/'+this.$route.params.id+'/null')
           .then(response => response.json())
           .then(data => {
               this.data=data;
               this.gor=true;
               document.title=data.payload.product.name
             });
           },
           gettype:function(miktar){
            return miktar == 1 ? "Adet" : "Kg"
         }
        }
}
</script>
<style>
footer{
    display: block;
    margin-top:0;
}
</style>