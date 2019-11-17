<template>
    <div>
     <li class="list-item" v-for="marka in data" :key="marka">
        <div class="checkwrap">
            <input type="checkbox" id="brand_filter_0" value="0">
            <label for="brand_filter_0"><span></span>{{marka}}</label>
        </div>
    </li>
    </div>
</template>
<script>
export default {
     data() {
        return {
         data:[],
         gor:false
        }
     },
     methods:{
         
     },
     mounted() {
        if(this.$route.fullPath.includes('et'))
        {
        fetch('https://www.ceptesok.com/api/v1/products?limit=52&order=opa&page=1&categoryId=1242')
        .then(response => response.json())
        .then(data => {
            var result= [];
            data.payload.products.forEach(element => {
                console.log(element.brand.name)
               if(result.includes(element.brand.name))
               {

               }else{
                   result.push(element.brand.name)
               }
            });
            this.data=result;
            this.gor=true;
          });
        }
        if(this.$route.fullPath.includes('kahvaltilik'))
        {
        fetch('https://www.ceptesok.com/api/v1/products?limit=52&order=ocd&page=1&categoryId=1245')
        .then(response => response.json())
        .then(data => {
            var result= [];
            data.payload.products.forEach(element => {
                console.log(element.brand.name)
               if(result.includes(element.brand.name))
               {

               }else{
                   result.push(element.brand.name)
               }
            });
            this.data=result;
            this.gor=true;
          });
        }
        if(this.$route.fullPath.includes('sut'))
        {
        fetch('https://www.ceptesok.com/api/v1/products?limit=52&order=ocd&page=1&categoryId=1244')
        .then(response => response.json())
        .then(data => {
            var result= [];
            data.payload.products.forEach(element => {
                console.log(element.brand.name)
               if(result.includes(element.brand.name))
               {

               }else{
                   result.push(element.brand.name)
               }
            });
            this.data=result;
            this.gor=true;
          });
        }
    }
    
}
</script>