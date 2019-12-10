<template>
    <div v-if="gor">
         <div v-if="!list">
            <div class="wrappers" v-for="product in data.payload.products" :key="product.data">
                <div class="productC-img">
              <router-link :to="{name: 'Urun',path: '/urun/'+product.link_name, params:{id:product.serial_productid}}">  <img :src="'https://cdnd.ceptesok.com/product/420x420/'+ getPicture(product.files[0])" height="420" width="327"></router-link>
                </div>
                <div class="productC-info">
                <div class="productC-text">
                     <router-link :to="{name: 'Urun',path: '/urun/'+product.link_name, params:{id:product.serial_productid}}"><h1>{{product.warranty_description}}</h1></router-link>
                    <h2>Stokta</h2>
                </div>
                <div class="productC-price-btn">
                    <p><spanC>{{product.serial_market_price}}</spanC><span class="currency"></span></p>
                    <button type="button">Sepete Ekle</button>
                </div>
                </div>
            </div>
        </div>
    <div v-if="list">
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
</div>
</template>
<script>
export default {
    data(){
        return {
         data:"",
         url:this.$route.params.id,
         gor:false,
         list:this.$store.getters.getGridState
        }
     },
     methods:{
        gettype:function(miktar){
           return miktar == 1 ? "Adet" : "Kg"
        },
        getanyp:function(){
            if(this.$route.fullPath.includes('et')){
                fetch('https://www.ceptesok.com/api/v1/products?limit=52&order=ocd&page='+this.$route.query.page +'&categoryId=1242')
                .then(response => response.json())
                .then(data => {
                    this.data=data;
                    this.gor=true;
                });
            }
            if(this.$route.fullPath.includes('sut')){
                fetch('https://www.ceptesok.com/api/v1/products?limit=52&order=ocd&page='+this.$route.query.page +'&categoryId=1244')
                .then(response => response.json())
                .then(data => {
                    this.data=data;
                    this.gor=true;
                });
            }
            if(this.$route.fullPath.includes('kahvaltilik')){
            fetch('https://www.ceptesok.com/api/v1/products?limit=52&order=ocd&page='+this.$route.query.page +'&categoryId=1245')
                .then(response => response.json())
                .then(data => {
                    this.data=data;
                    this.gor=true;
                });
            }
            if(this.$route.fullPath.includes('temizlik')){
                fetch('https://www.ceptesok.com/api/v1/products?limit=52&order=ocd&page='+this.$route.query.page +'&categoryId=1248')
                .then(response => response.json())
                .then(data => {
                    this.data=data;
                    this.gor=true;
                });
            }
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
    },
    watch: {
        '$route.query.page'(){
            this.getanyp();
        },
        '$store.getters.getGridState'(){
          this.list=this.$store.getters.getGridState
        }
     },
     mounted() {
            this.getanyp();
    },
     computed(){
       this.list=this.$store.getters.getGridState
       return this.$store.getters.getGridState
    },
    created() {
        if(this.$route.fullPath.includes('et')){
        fetch('https://www.ceptesok.com/api/v1/products?limit=52&order=ocd&page=1&categoryId=1242')
        .then(response => response.json())
        .then(data => {
            this.data=data;
            this.gor=true;
          });
        }
        if(this.$route.fullPath.includes('sut')){
        fetch('https://www.ceptesok.com/api/v1/products?limit=52&order=ocd&page=1&categoryId=1244')
        .then(response => response.json())
        .then(data => {
            this.data=data;
            this.gor=true;
          });
        }
        if(this.$route.fullPath.includes('kahvaltilik')){
        fetch('https://www.ceptesok.com/api/v1/products?limit=52&order=ocd&page=1&categoryId=1245')
        .then(response => response.json())
        .then(data => {
            this.data=data;
            this.gor=true;
          });
        }
        if(this.$route.fullPath.includes('temizlik')){
        fetch('https://www.ceptesok.com/api/v1/products?limit=52&order=ocd&page=1&categoryId=1248')
        .then(response => response.json())
        .then(data => {
            this.data=data;
            this.gor=true;
          });
        }
    }
}
</script>
<style>
div {
    display: block;
}
.wrappers {
  height: 420px;
  width: 654px;
  margin: 50px auto;
  border-radius: 7px 7px 7px 7px;
  /* VIA CSS MATIC https://goo.gl/cIbnS */
  -webkit-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
}

.productC-img {
  float: left;
  height: 420px;
  width: 327px;
}

.productC-img img {
  border-radius: 7px 0 0 7px;
}

.productC-info {
  float: left;
  height: 420px;
  width: 327px;
  border-radius: 0 7px 10px 7px;
  background-color: #ffffff;
}

.productC-text {
  height: 300px;
  width: 327px;
}

.productC-text h1 {
  font-family: 'Raleway', sans-serif;
  margin: 0 0 0 38px;
  padding-top: 52px;
  font-size: 34px;
  color: #474747;
}

.productC-text h1,
.productC-price-btn p {
  font-family: 'Raleway', sans-serif;
}

.productC-text h2 {
  margin: 0 0 47px 38px;
  font-size: 13px;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  color: #d2d2d2;
  letter-spacing: 0.2em;
}

.productC-text p {
  height: 125px;
  margin: 0 0 0 38px;
  font-family: 'Playfair Display', serif;
  color: #8d8d8d;
  line-height: 1.7em;
  font-size: 15px;
  font-weight: lighter;
  overflow: hidden;
}

.productC-price-btn {
  height: 103px;
  width: 327px;
  margin-top: 17px;
  position: relative;
}

.productC-price-btn p {
  display: inline-block;
  position: absolute;
  top: 11px;
  height: 50px;
  font-family: 'Trocchi', serif;
  margin: 0 0 0 38px;
  font-size: 28px;
  font-weight: lighter;
  color: #474747;
}

spanC {
  margin-right:auto;
  display: inline-block;
  height: 50px;
  font-family: 'Suranna', serif;
  font-size: 34px;
}

.productC-price-btn button {
  float: right;
  display: inline-block;
  height: 50px;
  width: 150px;
  margin: 0 30px 0 16px;
  box-sizing: border-box;
  border: transparent;
  border-radius: 60px;
  font-family: 'Raleway', sans-serif;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #ffffff;
  background-color: #9cebd5;
  cursor: pointer;
  outline: none;
}

.productC-price-btn button:hover {
  background-color: #79b0a1;
}
</style>