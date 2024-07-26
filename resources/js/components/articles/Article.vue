<template>
    <div :id="article.id" class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <v-card hover class="mx-auto" :class="{ on_delete:on_delete ,'bg-blue-grey-lighten-5': (article.total_id >> 0 && article.total_id !== true  && !on_delete)}">
                    <template v-slot:loader>
                        <v-progress-linear
                            :active="loading_bill"
                            indeterminate
                            height="3"
                            color="blue"
                        ></v-progress-linear>
                    </template>
                    <template v-slot:subtitle>
                        {{ article.date}} | 
                        Created :
                        <v-chip size="x-small" v-if="auth.getAuth.id == article.user_id" color="green">Me</v-chip>
                        <v-chip size="x-small" v-else color="blue">{{ article.user.name }}</v-chip>
                    </template>
                    <template v-slot:title>
                        <v-icon size="small" class="mt-0 mb-1" v-if="article.star" color="yellow">mdi-star</v-icon> {{ article.product.name }}
                    </template>
                
                    <template v-slot:append>
                        <div v-if="loading" class="cursor-pointer" @click="rollback">
                            <v-progress-circular
                            :size="30"
                            :width="1"
                            color="primary"
                            indeterminate
                            >
                                <template v-slot:default> 
                                    <v-icon v-if="pause">
                                        mdi-pause
                                    </v-icon>
                                    <span v-else>
                                        {{counter}} 
                                    </span>
                                </template>
                            </v-progress-circular>
                        </div>
                        <div>
                            <v-checkbox
                            :model-value="!!article.total_id"
                            hide-details
                            @click="toggleBill"
                            color="primary"
                            v-if="!$route.params.id&&(article.total_id === null || article.total_id === true || article.total_id === false)&&(!article.is_private)"
                            ></v-checkbox>
                        </div>
                    </template>
                    <template v-slot:prepend>
                        <v-avatar rounded="0">
                        <v-img
                            alt="charges-timeline"
                            class="img_border_radius"
                            src="/storage/article.gif"
                        ></v-img>
                        </v-avatar>
                    </template>
                    <v-card-text >{{article.description}}</v-card-text>
                    <v-spacer></v-spacer>
                    <v-card-actions class="text-green bg-amber-lighten-5">
                        <v-icon color="green" class="mx-1">mdi-cash</v-icon>{{ formatFloatNumber(article.price) }} MAD
                        <v-spacer></v-spacer>
                        <v-btn class="mr-2" color="deep-purple-darken-1" size="x-small" variant="tonal" icon="mdi-text-box-remove" @click="cancelBill" v-if="article.total_id >> 0 && article.total_id !== true"></v-btn>
                        <v-btn class="mr-2" color="orange" size="x-small" variant="tonal" icon="mdi-pencil" @click="aditArticle" v-if="article.user_id == auth.getAuth.id"></v-btn>
                        <v-tooltip location="top" :text="article.is_private  ? 'Only Me' : 'To All Brotherhood'">
                            <template v-slot:activator="{ props }">
                                <v-chip v-bind="props" variant="tonal" :color="article.is_private  ? 'red' : 'green'">
                                    <v-icon @click="viewArticle">{{ article.is_private  ? "mdi-eye-off" : "mdi-eye"}}</v-icon>
                                </v-chip>
                            </template>
                        </v-tooltip>
                    </v-card-actions>
                </v-card>
            </div>
        </div>
    </div>
</template>
<script>
import { useArticle } from '@/stores/Article';
import { useAuth } from '@/stores/Auth';
import { useDashboard } from '@/stores/Dashboard';
export default {
    props: {
        article : Object
    },
    data: function () {
        return {
            loading:false,
            loading_bill:false,
            on_delete:false,
            pause:false,
            setTimeout:null,
            setInterval:null,
            counter:1,
            color:"white",
        }
    },
    mounted: function () {
        // Initialize Swiper
        if (this.article.user_id == this.auth.getAuth.id) {
            this.$nextTick(() => {
                const el = '#' + this.article.id;
                const swiper = new Swiper(el, {
                    resistanceRatio: 0.85,
                    initialSlide: 0,
                    resistance: true,
                    allowSlideNext: false,
                    momentumBounce: true,
                    speed: 150,
                });
                swiper.on('transitionStart', () => {
                    this.on_delete = true;
                    this.loading = true;
                    this.setTimeout = setTimeout(() => {
                        this.deleteArticle().then(res => {
                            swiper.destroy();
                        });
                    }, 3000);
                    this.setInterval = setInterval(() => {
                        ++this.counter;
                    }, 1000);
                    // Destroy slider instance and detach all events listeners
                })
            });  
        }
    },
    computed: {
        _article: function () {
            return useArticle();
        },
        dashboard: function () {
            return useDashboard();
        },
        auth: function () {
            return useAuth();
        }
    },
    methods: {
        deleteArticle: async function () {
            return await this._article.deleteArticle(this.article.id).then(res => {
                if (this.$route.params.id) {
                    this.$router.push({
                        name: "articles.list",
                    })
                }
            })
        },
        aditArticle: function () {
            this.$router.push({
                name: "articles.update",
                params:{id:this.article.id}
            })
        },
        viewArticle: function () {
            this.$router.push({
                name: "articles.view",
                params:{id:this.article.id}
            })
        },
        cancelBill: async function () {
            this.loading_bill = true;
            return await this._article.cancelBill(this.article).then(res => {
                this.loading_bill = false;
                return res;
            })
        },
        toggleBill: function () {
          this._article.toggleBill(this.article.id)  
        },
        rollback: function () {
            this.pause = true;
            clearTimeout(this.setTimeout);
            clearInterval(this.setInterval);
            this.on_delete = false;
            this.counter = 1;
            setTimeout(() => {
                this.loading = false;
                this.pause = false;
            }, 1000);
        }
    }
}
</script>

<style>
.animation {
    animation: morph 3s linear;
}

@keyframes morph {
    0% {
        background-color: v-bind(color);
    }
    50% {
        background-color: rgb(138, 255, 196);
    }
    100% {
        background-color: v-bind(color);
    }
}

.danger {
    animation: danger_morph 3s linear;
}

@keyframes danger_morph {
    0% {
        background-color: v-bind(color);
    }
    50% {
        background-color: rgb(252, 64, 64);
    }
    100% {
        background-color: v-bind(color);
    }
}
.swiper-container{
    background-color: white !important;
    background-image: url("/storage/trash.gif") !important;
    background-clip: padding-box;
    background-size: contain;
    background-position-x: left;
}
.swiper-wrapper{
    background-color: v-bind(color) !important;
}
.on_delete{
    animation: danger_morph 1s infinite;
}
</style>