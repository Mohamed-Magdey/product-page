Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        },
        cart: {
            type: Number,
            required: true,
            default: 0
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
                <img :src="image" alt="socks" />
            </div>
            <div class="product-info">
                <h1>{{title}}</h1>
                <p v-if="inStock">In Stock</p>
                <p v-else :class="{outOfStock: !inStock}">Out of Stock</p>
                <p>Shipping: {{shipping}}</p>

                <ul>
                    <li v-for="detail in details">{{detail}}</li>
                </ul>

                <div v-for="(varient, index) in varients" 
                    :key="varient.varientId"
                    class="color-box"
                    :style="{backgroundColor: varient.varientColor}"
                    @mouseover="updateProduct(index)"
                >
                </div>

                <button @click="addToCart"
                    :disabled="!inStock"
                    :class="{disabledButton: !inStock}"
                >Add To Cart</button>
                <button @click="removeFromCart" 
                    :disabled="!Boolean(cart)"
                    :class="{disabledButton: !Boolean(cart)}"
                >
                    Remove From Cart
                </button>
            </div>
        </div>
    `,
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            selectedVarient: 0,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],

            varients: [
                {
                    varientId: 2234,
                    varientColor: "green",
                    varientImage: "https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg",
                    varientQuantity: 10
                },
                {
                    varientId: 2235,
                    varientColor: "blue",
                    varientImage: "https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg",
                    varientQuantity: 0
                }
            ],
        }
    },

    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.varients[this.selectedVarient].varientId);
        },

        updateProduct(index) {
            this.selectedVarient = index;
        },

        removeFromCart() {
            this.$emit('remove-from-cart', this.varients[this.selectedVarient].varientId);
        }
    },

    computed: {
        title() {
            return `${this.brand} ${this.product}`;
        },
        image() {
            return this.varients[this.selectedVarient].varientImage;
        },
        inStock() {
            return this.varients[this.selectedVarient].varientQuantity;
        },
        shipping() {
            if(this.premium) {
                return 'Free'
            }
            return 2.99
        }
    }
});

let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        decreaseCart(id) {
            if(this.cart !== 0) {
                const index = this.cart.indexOf(id);
                if (index > -1) {
                    this.cart.splice(index, 1);
                }
            }
        }
    }
})