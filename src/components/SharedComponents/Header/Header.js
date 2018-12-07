export default {
  name: "HeaderComponent",
  data: function() {
    return {
      activeBtn: 1,
      showNav: true
    };
  },
  methods: {
    changeLang(lang) {
      this.$store.state.language = lang;
      localStorage.setItem("lang", lang);
      
      this.$backend.$fetchFilters().then(responseDate => {
        this.$store.state.filters = responseDate;
      });
      
    },
    changeCurrency(currency){
      this.$store.state.currency = currency;
      localStorage.setItem("currency", currency);
    },
    toggleDrawer(){
      this.$store.state.drawer = !this.$store.state.drawer
    }
  },
  computed: {
    lang() {
      return this.$store.getters.lang;
    },
    languages(){
      return this.$store.state.languages;
    },
    currencies(){
      return this.$store.state.currencies;
    }
  }
};