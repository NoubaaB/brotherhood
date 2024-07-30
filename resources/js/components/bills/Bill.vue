<template>
    <div :id="bill.id" class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <v-card hover class="mx-auto" :class="{ on_delete:on_delete }">
                    <template v-slot:loader>
                        <v-progress-linear
                            :active="loading_bill"
                            indeterminate
                            height="3"
                            color="blue"
                        ></v-progress-linear>
                    </template>
                    <template v-slot:subtitle>
                        {{ bill.date}} | 
                        Created :
                        <v-chip size="x-small" v-if="auth.getAuth.id == bill.user_id" color="green">Me</v-chip>
                        <v-chip size="x-small" v-else color="blue">{{ bill.user.name }}</v-chip>
                    </template>
                    <template v-slot:title>
                        Bill N° : {{ bill.id }}
                    </template>

                    <v-card-text>
                        <v-icon color="green" class="mx-3 pb-2">mdi-cash-multiple</v-icon> 
                        <strong>{{bill.amount }}</strong>
                        MAD
                    </v-card-text>
                
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
                            :model-value="!!bill.selected"
                            hide-details
                            @click="toggleBill"
                            color="primary"
                            v-if="!$route.params.id && auth.getAuth.id == bill.user_id"
                            ></v-checkbox>
                        </div>
                    </template>
                    <template v-slot:prepend>
                        <v-avatar rounded="0">
                        <v-img
                            alt="receipt"
                            class="img_border_radius"
                            src="/storage/receipt.gif"
                        ></v-img>
                        </v-avatar>
                    </template>
                    <v-spacer></v-spacer>
                    <v-card-actions class="bg-blue-lighten-5">
                        <v-spacer></v-spacer>
                        <v-btn class="mr-2" color="deep-purple-darken-1" size="x-small" variant="tonal" :icon="expand_invoices ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="expand_invoices = !expand_invoices"></v-btn>
                        <v-btn class="mr-2" color="blue-darken-1" size="x-small" variant="tonal" :icon="expand_articles ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="expand_articles = !expand_articles"></v-btn>
                        <v-btn class="mr-2" color="green-darken-1" size="x-small" variant="tonal" icon="mdi-text-box" @click="viewBill" v-if="!$route.params.id" ></v-btn>
                    </v-card-actions>
                    <v-expand-transition>
                            <v-table v-if="expand_invoices">
                                <thead>
                                <tr>
                                    <th class="text-left">
                                    Name
                                    </th>
                                    <th class="text-left">
                                    Amount
                                    </th>
                                    <th class="text-left">
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr
                                    v-for="invoice in bill.invoices"
                                    :key="invoice.id"
                                >
                                    <td class="text-left">{{ invoice.user.name }}</td>
                                    <td class="text-left">
                                        <v-chip variant="tonal" color="green" v-if="invoice.price>0">{{ invoice.price}} MAD</v-chip>
                                        <v-chip variant="tonal" color="gray" v-else-if="invoice.price == 0">{{ invoice.price}} MAD</v-chip>
                                        <v-chip variant="tonal" color="red" v-else>{{ invoice.price}} MAD</v-chip>
                                    </td>
                                    <td class="text-left">
                                        <v-checkbox
                                        :model-value="!!invoice.checked"
                                        hide-details
                                        @click="toggleInvoice(invoice)"
                                        color="primary"
                                        :disabled="auth.getAuth.id != invoice.user_id"
                                        ></v-checkbox>
                                    </td>
                                </tr>
                                </tbody>
                            </v-table>
                    </v-expand-transition>
                    <v-expand-transition>
                        <div v-if="expand_articles" class="bg-blue-lighten-5">
                            <v-list lines="two" class="bg-blue-lighten-5">
                                <v-list-item
                                    v-for="article in bill.articles"
                                    :key="article.id"
                                    @click="goTo(article.id)"
                                >
                                    <template v-slot:title>
                                        <strong>
                                            {{ article.product.name }}
                                        </strong>
                                    </template>
                                    <template v-slot:subtitle>
                                        <div class="d-inline">
                                            {{article.date}}
                                        </div>
                                        |
                                        <strong class="d-inline text-green">
                                            {{ formatFloatNumber(article.price) }} MAD
                                        </strong>
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

                                    <template v-slot:append>
                                        <v-btn
                                            v-if="bill.user_id == auth.getAuth.id"
                                            color="red-lighten-1"
                                            icon="mdi-trash-can"
                                            variant="tonal"
                                            size="x-small"
                                            @click="unBillArticle(article.id,bill.id)"
                                        ></v-btn>
                                    </template>
                                </v-list-item>
                            </v-list>
                        </div>
                    </v-expand-transition>
                </v-card>
            </div>
        </div>
    </div>
</template>
<script>
import { useAuth } from '@/stores/Auth';
import { useBill } from '@/stores/Bill';

export default {
    props: {
        bill : Object
    },
    data: function () {
        return {
            expand_articles:false,
            expand_invoices:false,
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
        if (this.bill.user_id == this.auth.getAuth.id) {
            this.$nextTick(() => {
                const el = '#' + this.bill.id;
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
                        this.deleteBill().then(res => {
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
        _bill: function () {
            return useBill();
        },
        dashboard: function () {
            return useDashboard();
        },
        auth: function () {
            return useAuth();
        }
    },
    methods: {
        deleteBill: async function () {
            return await this._bill.deleteBill(this.bill.id).then(res => {
                if (this.$route.params.id) {
                    this.$router.push({
                        name: "bills.list",
                    })
                }
            })
        },
        aditBill: function () {
            this.$router.push({
                name: "bills.update",
                params:{id:this.bill.id}
            })
        },
        viewBill: function () {
            this.$router.push({
                name: "bills.view",
                params:{id:this.bill.id}
            })
        },
        cancelBill: async function () {
            this.loading_bill = true;
            return await this._bill.cancelBill(this.bill).then(res => {
                this.loading_bill = false;
                return res;
            })
        },
        toggleBill: function () {
            this._bill.toggleBill(this.bill.id)
        },
        unBillArticle: async function (article_id , bill_id) {
            await this._bill.unBillArticle(article_id, bill_id).then(res => {
                if (res) {
                    this.bill.articles = this.bill.articles.filter(article => article.id != article_id)
                }
            })
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
        },
        toggleInvoice: function (invoice) {
            this._bill.toggleInvoice(invoice.id, !invoice.checked);
            invoice.checked = !invoice.checked;
        },
        goTo: function (id) {
            this.$router.push(`/articles/view/${id}`)
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