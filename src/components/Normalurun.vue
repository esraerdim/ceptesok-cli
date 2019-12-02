<template>
    <div v-if="gor">
    <li class="list-result" v-for="product in data.payload.products" :key="product.data">
    <div class="productbox">
    <div class="product-cartcontrols">
        <button class="cartcontrols-close"><i class="icon-close"></i></button>
        <div class="cartcontrols-price">
            <div class="pricebox">
                <div class="pricebox-content"><span class="currency pricebox-currency"></span><span class="pricebox-main">9</span><span class="pricebox-decimal">95</span></div>
            </div>
        </div>
        <div class="product-description cartcontrols-description">
            <h3 class="product-title"><a href="/soslu-biftek-sefin-spesiyali-150-gr">salla</a></h3>
            <p class="product-subtitle">1 adet</p>
        </div>
        <div class="cartcontrols-controls">
            <!---->
            <div class="controls-amount numberbox white numberbox-min">
                <button class="numberbox-button number-increase"></button>
                <button class="numberbox-button number-decrease"></button>
                <input type="text" id="product_control_box_50" max="10" min="1" data-after="adet" data-step="1">
            </div>
            <button data-modal="modal_stores" class="product-controlbutton btn gray small modaltrigger">Market Seç
            </button>
            <!---->
        </div>
    </div>
    <div class="product-content">
        <!---->
        <div class="product-image-wrap">
            <a :href="'https://www.ceptesok.com/'+ product.link_name" class="product-image imagefit fit"><div v-if="product.files[0]"><img class="imagefit-img abs" :src="'https://cdnd.ceptesok.com/product/420x420/'+ getPicture(product.files[0])"></div></a>
        </div>
        <div class="product-price">
            <div class="pricebox">
                <div class="pricebox-content"><span class="currency pricebox-currency"></span><span class="pricebox-main">{{product.serial_market_price}}</span></div>
            </div>
        </div>
        <div class="product-description">
       <router-link :to="{name: 'Urun',path: '/urun/'+product.link_name, params:{id:product.serial_productid}}"> <h3 @click="attrdegis(product.serial_productid)" class="product-title">{{product.warranty_description}}</h3></router-link>
            <p class="product-subtitle">1 {{gettype(product.unit)}}</p>
            <!---->
            <!---->
        </div>
        <button v-on:click="goo()" id="storeTriggerEvent" data-modal="modal_stores" class="product-controlbutton btn gray small modaltrigger modalStoreTriggerEvent">Market Seç
        </button>
        <!---->
    </div>
</div>
</li>
</div>
</template>
<script>
export default {
    data() {
        return {
         data:"",
         gor:false
        }
     },
     methods:{
        gettype:function(miktar){
           return miktar == 1 ? "Adet" : "Kg"
        },
        getPicture(images){
            var imgurl;
            if(images.document_href=="undefined")
            {
                imgurl= images.document_href   
            }else{
                imgurl= images.document_href
            }
            return  imgurl;
            
        },
         getanyp:function(){
             console.log(this.$route.query)
        if(this.$route.fullPath.includes('et')){
        fetch('https://www.ceptesok.com/api/v1/products?limit=52&order=rank&page='+this.$route.query.page +'&categoryId=1242')
        .then(response => response.json())
        .then(data => {
            this.data=data;
            this.gor=true;
            document.title="Kırmızı Et";
          });
        }
        if(this.$route.fullPath.includes('kahvaltilik')){
        fetch('https://www.ceptesok.com/api/v1/products?limit=52&order=rank&page='+this.$route.query.page +'&categoryId=1245')
        .then(response => response.json())
        .then(data => {
            this.data=data;
            this.gor=true;
            document.title="Kahvaltılık";
          });
        }
         if(this.$route.fullPath.includes('sut')){ 
        fetch('https://www.ceptesok.com/api/v1/products?limit=52&order=rank&page='+this.$route.query.page +'&categoryId=1244')
        .then(response => response.json())
        .then(data => {
            this.data=data;
            this.gor=true;
            document.title="Süt ve Peynirler";
          });
        }
        }
    },
     watch: {
        '$route.query.page'(){
            this.getanyp();
        }
     },
     mounted() {
            this.getanyp();
    },
    created() {
        console.log(this.$route.query)
        if(this.$route.fullPath.includes('et')){
        fetch('https://www.ceptesok.com/api/v1/products?limit=52&order=rank&page='+this.$route.query.page +'&categoryId=1242')
        .then(response => response.json())
        .then(data => {
            this.data=data;
            this.gor=true;
            document.title="Kırmızı Et";
          });
        }
        if(this.$route.fullPath.includes('kahvaltilik')){
        fetch('https://www.ceptesok.com/api/v1/products?limit=52&order=rank&page='+this.$route.query.page +'&categoryId=1245')
        .then(response => response.json())
        .then(data => {
            this.data=data;
            this.gor=true;
            document.title="Kahvaltılık";
          });
        }
         if(this.$route.fullPath.includes('sut')){ 
        fetch('https://www.ceptesok.com/api/v1/products?limit=52&order=rank&page='+this.$route.query.page +'&categoryId=1244')
        .then(response => response.json())
        .then(data => {
            this.data=data;
            this.gor=true;
            document.title="Süt ve Peynirler";
          });
        }
    }
}
</script>