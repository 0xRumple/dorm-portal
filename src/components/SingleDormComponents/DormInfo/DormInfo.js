import DormReviews from "../../DormsComponents/DormReviews/DormReviews.vue";

export default {
  name: "DormInfo",
  components: {
    DormReviews
  },
  props:{
    "dorm" : Object,
  },
  data: function () {
    return {
      reviewsModel: false,
      dormReviews: []
    };
  },
  methods: {
    getRandomIndex(min, max) {
      return Math.floor(Math.random() * (max - min + 1) ) + min;
    },
    showReviews(dormId) {
      this.$backend.$fetchDormReviews(dormId).then((response)=>{
        this.dormReviews = response
      })
      this.reviewsModel = true;
    },
    maskName(name){
      return name.toLowerCase().split(' ')
      .map((s) => s.charAt(0).toUpperCase() + Array(s.length-1).fill("*").join(''))
      .join(' ');
    }
  },
  computed: {
    lang() {
      return this.$store.getters.lang;
    },
    review(){
      if(this.dorm.reviews){
        let index 
        if(this.isReviewed>2){
          index = this.getRandomIndex(0, 2)
        }
        index = 0
        return this.dorm.reviews[index]
      }
    },
    isReviewed(){
      if(this.dorm.reviews){
        return this.dorm.reviews.length
      }
    }
  }
};