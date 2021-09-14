let app = new Vue({
    el: '#app',
    data: {
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

        cart: 0
    },

    methods: {
        addToCart() {
            this.cart++;
        },

        updateProduct(index) {
            this.selectedVarient = index;
        },

        removeFromCart() {
            if(this.cart !== 0) {
                this.cart--;
            }
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
        }
    }
})