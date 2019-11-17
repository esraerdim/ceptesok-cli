<template>
<div>
<section class="kısım page-whitebg home-kısıms gird-alanı">
    <div class="wrapper">
        <ul class="sections-list grid-row">
            <li class="grid-col x3 xl-x6"  v-for="item in items" :key="item.baslik">
                <div class="list-item imagefit al-bottom al-right">
                    <div class="item-text">
                        <h3 class="item-title">{{item.baslik}}</h3>
                        <a :href="item.link" class="item-link btn white">Fırsatları Gör</a>
                    </div>
                    <img :src="item.resim" class="item-image imagefit-img abs">
                </div>
            </li>
        </ul>
    </div>
</section>
</div>
</template>
<script>
export default {
    name: 'Dortlu',
    data() {
        return {
            items:[{
                        baslik:"Haftanın Fırsatları",
                        link:"https://www.ceptesok.com/kampanyalar",
                        resim:require("../img/5244715d14cde646a6083ef107f65e5b.jpg")
                    },
                    {
                        baslik:"Stoklarla Sınırlı",
                        link:"https://www.ceptesok.com/stoklarla-sinirli",
                        resim:require('../img/e6bbd20780d79e9bcf169b96ac759868.jpg')
                    },
                    {
                        baslik:"Şok'a Özel Fırsatlar",
                        link:"https://www.ceptesok.com/sok-a-ozel-firsatlar",
                        resim:require("../img/a4002e58c5e778693dabc2dc7d4841d9.jpg")
                    },
                    {
                        baslik:"Çok Satanlar",
                        link:"https://www.ceptesok.com/cok-satanlar",
                        resim:require("../img/9d4957e0cbb735a0292af5fcc2ecaba5.jpg")
                    }
                ]
            };
        }
    }
</script>