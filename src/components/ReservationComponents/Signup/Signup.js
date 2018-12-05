export default {
  name: 'Signup',
  data: function(){
    return{
      show: false,
      showSignup: false
    }
  },
  methods:{
    submit(){
      this.$store.state.reservationStep++;
    }
  },
  computed: {
    lang() {
      return this.$store.getters.lang;
    }
  }
};