let app = new Vue({
    el: '#app',
    data: {
        brand: 'Vue Mastery',
        product: 'Socks',
        image: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
        inStock: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],

        varients: [
            {
                varientId: 2234,
                varientColor: "green",
                varientImage: "https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg"
            },
            {
                varientId: 2235,
                varientColor: "blue",
                varientImage: "https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg"
            }
        ],

        cart: 0
    },

    methods: {
        addToCart() {
            this.cart++;
        },

        updateProduct(image) {
            this.image = image;
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
        }
    }
})