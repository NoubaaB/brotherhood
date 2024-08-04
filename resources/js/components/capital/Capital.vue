<template>
    <div :id="capital.id" class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <v-card
                class="mx-auto"
                :class="{ on_delete: on_delete }"
                >
                    <template v-slot:loader>
                        <v-progress-linear
                            :active="loading"
                            indeterminate
                            height="3"
                            color="red"
                        ></v-progress-linear>
                    </template>
                    <template v-slot:subtitle>
                        {{capital.date_start}} <v-icon>mdi-arrow-right</v-icon> {{capital.date_end??"Now"}}
                    </template>
                    <template v-slot:title>
                        {{capital.amount}} MAD
                    </template>
                    <template v-slot:append>
                        <v-btn size="x-small" color="orange" icon="mdi-pencil" variant="tonal" @click="editCapital" class="mr-2">
                        </v-btn>
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
                    </template>
                    <template v-slot:prepend>
                        <v-avatar
                          size="50"
                        >
                          <v-img
                          src="/storage/line-chart.gif"
                          >
                          </v-img>
                        </v-avatar>
                    </template>
                </v-card>
            </div>
        </div>
    </div>
</template>
<script>
import { useCapital } from '@/stores/Capital';
export default {
    props: {
        capital:Object
    },
    data: function () {
        return {
            loading : false,
            on_delete:false,
            pause:false,
            setTimeout:null,
            setInterval:null,
            counter:1,
            color:"white",
        }  
    },
    mounted: function(){
        this.$nextTick(() => {
            const el = '#' + this.capital.id;
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
                    this.deleteCapital().then(res => {
                        swiper.destroy();
                    });
                }, 3000);
                this.setInterval = setInterval(() => {
                    ++this.counter;
                }, 1000);
                // Destroy slider instance and detach all events listeners
            })
        });  
    },
    computed: {
        _capital: function () {
            return useCapital();
        },
        get_date: function(){
            return moment(this.capital.created_at).format("YYYY/MM/DD")
        }
    },
    methods: {
        editCapital: function () {
            this.$emit("editCapital",true,this.capital.id)
        },
        deleteCapital: async function () {
            await this._capital.deleteCapital(this.capital.id)
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