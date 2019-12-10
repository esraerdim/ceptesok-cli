<template>
<div>
    <nav class="section listing-pagination">
        <ul class="pagination-elements">
            <li class="pagination-element active" v-on:click="changeActiveP($event)"><router-link :to="{ path: `${this.$route.fullPath}`, query: { page:1 }}" class="pagination-link">1</router-link></li>
            <li class="pagination-element" v-on:click="changeActiveP($event)"><router-link :to="{ path: `${this.$route.fullPath}`, query: { page:2 }}" class="pagination-link">2</router-link></li>
                <li class="pagination-element" v-on:click="changeActiveP($event)"><router-link :to="{ path: `${this.$route.fullPath}`, query: { page:3 }}" class="pagination-link">3</router-link></li>
                <li class="pagination-element" v-on:click="changeActiveP($event)"><router-link :to="{ path: `${this.$route.fullPath}`, query: { page:4 }}" class="pagination-link">4</router-link></li>
                <li class="pagination-element" v-on:click="changeActiveP($event)"><router-link :to="{ path: `${this.$route.fullPath}`, query: { page:5 }}" class="pagination-link">5</router-link></li>
        </ul>
    </nav>
</div>
</template>

<script>
export default {
    name:'Sayfalar',
    data (){
        return{
            isActive:false,
        }
    },
    methods: {
        changeActiveP(e){
            var list = document.querySelectorAll("#app > div > div > main > div:nth-child(2) > nav > ul")[0].children;
            for(var i=0;i<list.length;i++){
                list[i].className="pagination-element"
            }
            e.path[1].className="pagination-element active"
        },
        getanyw:function(){
            console.log(this.$route.query)
        }
    },
    watch: {
        '$route.query.page'(){
            this.getanyw();
        }
    },
    mounted() {
            this.getanyw();
    }
}
</script>

<style>
.section.listing-pagination .pagination-elements {
    display: inline-block;
    vertical-align: middle;
    line-height: 1.28571429rem;
}

</style>