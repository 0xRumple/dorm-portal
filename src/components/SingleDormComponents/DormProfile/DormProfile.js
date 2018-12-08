import { swiper, swiperSlide } from 'vue-awesome-swiper'
import DormMap from '../../SharedComponents/DormMap/DormMap.vue';
import RoomCard from '../RoomCard/RoomCard.vue'
import DormInfo from '../DormInfo/DormInfo.vue'
export default {
  name: "DormProfile",
  components: {
    swiper,
    swiperSlide,
    DormMap,
    RoomCard,
    DormInfo
  },
  data: function () {
    return {
      lightboxPhotoUrl: '',
      iframe: false,
      lightbox: false,
      mapModel: false,
      model: true,
      swiperOption: {
        slidesPerView: 10,
        centeredSlides: false,
        spaceBetween: 8,
        grabCursor: true,
        preventClicks: false,
        clickable: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }},
        dorm:[],
      "name": "Alfam dorm",
      "cover": "https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "photos": [
        {
          "is_3d": false,
          "src": "https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        },
        {
          "is_3d": false,
          "src": "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        },
        {
          "is_3d": false,
          "src": "https://images.pexels.com/photos/261045/pexels-photo-261045.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        },
        {
          "is_3d": true,
          "src": "https://momento360.com/e/u/a9b53aa8f8b0403ba7a4e18243aabc66"
        },
        {
          "is_3d": true,
          "src": "https://momento360.com/e/u/a9b53aa8f8b0403ba7a4e18243aabc66"
        },
        {
          "is_3d": false,
          "src": "https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        },
        {
          "is_3d": true,
          "src": "https://momento360.com/e/u/a9b53aa8f8b0403ba7a4e18243aabc66"
        },
        {
          "is_3d": false,
          "src": "https://images.pexels.com/photos/518244/pexels-photo-518244.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        },
        {
          "is_3d": false,
          "src": "https://images.pexels.com/photos/1089570/pexels-photo-1089570.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        },
        {
          "is_3d": false,
          "src": "https://images.pexels.com/photos/417273/pexels-photo-417273.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        },
        {
          "is_3d": false,
          "src": "https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        },
        {
          "is_3d": false,
          "src": "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        },
        {
          "is_3d": false,
          "src": "https://images.pexels.com/photos/77931/pexels-photo-77931.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        }
        
      ],
      "geo_longitude": 35.1501,
      "geo_latitude": 33.90111,
      "address": "Kaleland street bla bla",
      "history": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
      "contact_email": "alhakeem.prof@gmail.com",
      "contact_number": "00905338524788",
      "facilities": [
        {
          "name": "free Wifi",
          "icon": "fa-wifi"
        },
        {
          "name": "free Wifi",
          "icon": "fa-wifi"
        }
      ],
      "activities": [
        {
          "name": "free Wifi",
          "icon": "fa-wifi"
        },
        {
          "name": "free Wifi",
          "icon": "fa-wifi"
        }
      ],
      "number_of_reviews": 26,
      "reviews_average": 4.5,
      "review": [
        {
          "student_name": "Mohammed Alhakem",
          "stars": 5,
          "description": "I liked the dorm, it is very nice"
        },
        {
          "student_name": "yaser alnajjar",
          "stars": 2,
          "description": "very bad dorm"
        }
      ],
      "rooms": [
        {
          "id": 15225,
          "room_type": "single room",
          "photos": [
            "https://images.pexels.com/photos/279719/pexels-photo-279719.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            "https://images.pexels.com/photos/1082355/pexels-photo-1082355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          ],
          "rooms_left": 5,
          "price": 1500,
          "people_number": 2,
          "facilities": [
            {
              "name": "free Wifi",
              "icon": "fa-wifi"
            },
            {
              "name": "free Wifi",
              "icon": "fa-wifi"
            }
          ]
        }
      ]
    }
  },
  computed: {
    lang() {
      return this.$store.getters.lang;
    }
  },
  methods:{
    sendPhotoUrl(url,is_3d){
      this.lightboxPhotoUrl = url
      this.iframe = is_3d
      this.lightbox = !this.lightbox
    },
    showMap() {
      this.mapModel = !this.mapModel;
    },
    fetchDorm() {
      this.$backend.$fetchDorm(this.$route.params.id).then(responseDate => {
        this.dorm = responseDate;
      });
    }
  },
  created(){
    this.fetchDorm();
  }
};