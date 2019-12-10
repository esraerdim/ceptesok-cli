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
            <button data-modal="modal_stores" class="product-controlbutton btn gray small modaltrigger" >Market Seç
            </button>
            <!---->
        </div>
    </div>
    <div class="product-content">
        <!---->
        <div class="product-image-wrap">
            <a :href="'https://www.ceptesok.com/'+ product.link_name" class="product-image imagefit fit"><img class="imagefit-img abs" :src="'https://cdnd.ceptesok.com/product/420x420/'+ getPicture(product.files[0])"></a>
        </div>
        <div class="product-price">
            <div class="pricebox">
                <div class="pricebox-content"><span class="currency pricebox-currency"></span><span class="pricebox-main">{{product.serial_market_price}}</span></div>
            </div>
        </div>
        <div class="product-description">
        <h3 class="product-title"><router-link :to="{name: 'Urun',path: '/urun/'+product.link_name, params:{id:product.serial_productid}}"> <h3 class="product-title">{{product.warranty_description}}</h3></router-link></h3>
            <p class="product-subtitle">1 {{gettype(product.unit)}}</p>
            <!---->
            <!---->
        </div>
        <button v-on:click="goo(product.serial_productid)" id="storeTriggerEvent" data-modal="modal_stores" class="product-controlbutton btn gray small modaltrigger modalStoreTriggerEvent">Market Seç
        </button>
        <!---->
    </div>
</div>
</li>
</div>
</template>
<script>
export default {
    name: 'Endusuk',
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
        goo:function(id){
            pageId= id;
            console.log(pageId)
        },
        getPicture(images){
            var imgurl;
            try{
                if(images.document_href.includes(""))
                {
                    imgurl=images.document_href
                }else
                {
                    imgurl="product-default.png"
                }
            }catch(err){
                imgurl="product-default.png"
            }
            return imgurl;
            
        },
        getanyp:function(){
            if(this.$route.fullPath.includes('et')){
                fetch('https://www.ceptesok.com/api/v1/products?limit=52&order=opa&page='+this.$route.query.page +'&categoryId=1242')
                .then(response => response.json())
                .then(data => {
                    this.data=data;
                    this.gor=true;
                });
            }
            if(this.$route.fullPath.includes('sut')){
                fetch('https://www.ceptesok.com/api/v1/products?limit=52&order=opa&page='+this.$route.query.page +'&categoryId=1244')
                .then(response => response.json())
                .then(data => {
                    this.data=data;
                    this.gor=true;
                });
            }
            if(this.$route.fullPath.includes('kahvaltilik')){
                fetch('https://www.ceptesok.com/api/v1/products?limit=52&order=opa&page='+this.$route.query.page +'&categoryId=1245')
                .then(response => response.json())
                .then(data => {
                    this.data=data;
                    this.gor=true;
                });
            }
            if(this.$route.fullPath.includes('temizlik')){
                fetch('https://www.ceptesok.com/api/v1/products?limit=52&order=opa&page='+this.$route.query.page +'&categoryId=1248')
                .then(response => response.json())
                .then(data => {
                    this.data=data;
                    this.gor=true;
                });
            }
        }
    },
    watch:{
        '$route.query.page'(){
            this.getanyp();
        }
     },
     mounted() {
            this.getanyp();
    },
    created() {
        if(this.$route.fullPath.includes('et')){
        fetch('https://www.ceptesok.com/api/v1/products?limit=52&order=opa&page=1&categoryId=1242')
        .then(response => response.json())
        .then(data => {
            this.data=data;
            this.gor=true;
          });
        }
        if(this.$route.fullPath.includes('sut')){
        fetch('https://www.ceptesok.com/api/v1/products?limit=52&order=opa&page=1&categoryId=1244')
        .then(response => response.json())
        .then(data => {
            this.data=data;
            this.gor=true;
          });
        }
        if(this.$route.fullPath.includes('kahvaltilik')){
        fetch('https://www.ceptesok.com/api/v1/products?limit=52&order=opa&page=1&categoryId=1245')
        .then(response => response.json())
        .then(data => {
            this.data=data;
            this.gor=true;
          });
        }
        if(this.$route.fullPath.includes('temizlik')){
        fetch('https://www.ceptesok.com/api/v1/products?limit=52&order=opa&page=1&categoryId=1248')
        .then(response => response.json())
        .then(data => {
            this.data=data;
            this.gor=true;
          });
        }
    
    }
    
}
</script>