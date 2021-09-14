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

            <div>
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">
                        <p>{{ review.name }}</p>
                        <p>Rating: {{ review.rating }}</p>
                        <p>{{ review.review }}</p>
                    </li>
                </ul>
            </div>

            <product-review @review-submitted="addReview"></product-review>
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
            reviews: []
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
        },

        addReview(productReview) {
            this.reviews.push(productReview);
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

Vue.component('product-review', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>

            <p>
                <label for="name">Name:</label>
                <input id="name" v-model="name" placeholder="name">
            </p>
            
            <p>
                <label for="review">Review:</label>      
                <textarea id="review" v-model="review"></textarea>
            </p>
            
            <p>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>
                
            <p>
                <input type="submit" value="Submit">  
            </p>    
        
        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },

    methods: {
        onSubmit() {
            if(this.name && this.review && this.rating) {
                let productReview = {
                  name: this.name,
                  review: this.review,
                  rating: this.rating
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.errors = []
            } else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
            }
        }
    }
})

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