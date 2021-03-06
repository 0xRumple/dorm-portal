
export default {
  name: "ManageReservations",
  data: function () {
    return {
      showUpdateStatus: false,
      date: null,
      menu: false,
      loadingBtn: false,
      isReviewRequestSent: false,
      search: '',
      headers: [
        { text: '', value: 'room_price' },
        { text: '', value: 'receipts', sortable: false  },
        { text: '', value: 'status' },
        { text: '', value: 'last_update_date' },
        { text: '', value: 'student_name' },
        { text: '', value: 'student_email' },
        { text: '', value: 'reservation_creation_date' },
        { text: '', value: 'confirmation_deadline_date' },
        { text: '', value: 'id', sortable: false }
      ],
      currentStatus: '',
      followUpMessage: '',
      reservationID: null,
      statusIndex: null,
      statusFilter: null,
      requiredRules:[
        v => !!v || this.lang.rules.fieldRequired
      ],
      statusRules:[
        v => !!v || this.lang.rules.fieldRequired,
      ],
      rowsPerPage: [10, 20, 30, 40],
      pagination: {
        rowsPerPage: 10,
        sortBy: 'reservation_creation_date',
        descending : true
      }

    };
  },
  computed: {
    lang() {
      return this.$store.getters.lang
    },
    reservationData(){
      return this.$store.getters.manageReservation
    },
    reservationCount(){
      const reservationRecords = this.$store.getters.manageReservation.reservations
      if(reservationRecords){
        return reservationRecords.length
      }
    },
    reservations(){
      let reservationRecords = this.$store.getters.manageReservation.reservations
      if(this.statusFilter != null){
        return reservationRecords.filter(res => res.status == this.statusFilter)
      }
      return this.$store.getters.manageReservation.reservations
    },
    status(){
      return this.$store.getters.lang.manageResrevations.status
    }
  },
  methods:{
    setHeaderText(){
      let arrLength = this.lang.manageResrevations.tableHeaders.length
      for(var i=0 ; i <= arrLength ; i++)
        this.headers[i].text = this.lang.manageResrevations.tableHeaders[i]
    },
    updateStatus(item){
      this.showUpdateStatus = true
      //this.date = item.confirmation_deadline_date
      this.reservationID = item.id
    },
    close(){
      this.showUpdateStatus = false
    },
    fetchManagerReservation(){
      let dorm = this.$store.getters.managerDorms
      if(dorm){
        dorm = dorm[0].id
      }
      const dormID = localStorage.getItem('manageDormID') ||  dorm
      this.$store.dispatch("fetchManagerReservation", dormID).then(()=>{
        localStorage.setItem('manageDormID',dormID)
      }).catch(()=>{
        this.$store.state.snackbar.trigger = true
        this.$store.state.snackbar.message = this.lang.snackbar.wrongMsg
        this.$store.state.snackbar.color = 'error'
      })
    },
    setStatusIndex(){
      this.statusIndex = this.status.indexOf(this.currentStatus)
    },
    clean(data) {
      Object.keys(data).forEach((key) => (data[key] == null || data[key].length == 0) && delete data[key]);
    },
    submit(){
      if(this.statusIndex == 0){
        this.statusIndex = 4
      }
      let data = {
        reservationID: this.reservationID,
        dormID: localStorage.getItem('manageDormID'),
        status: this.statusIndex,
        deadline: this.date,
        message: this.followUpMessage
      }
      if(this.$refs.form.validate()){
        this.loadingBtn = true
        this.clean(data)
        this.$backend.$updateReservationStatus(data).then(()=>{
          let snackbar = {
            message: this.lang.snackbar.successStatusUpdate,
            color: 'success'
          }
          this.$refs.form.reset()
          this.close()
          this.$store.dispatch("fetchManagerReservation", data.dormID)
          this.$store.commit('updateSnackbar', snackbar)
        }).catch(()=>{
          let snackbar = {
            message: this.lang.snackbar.wrongMsg,
            color: 'error'
          }
          this.$store.commit('updateSnackbar', snackbar)
        }).then(()=>{
          this.loadingBtn = false
        })
      }
    },
    filterByStatus(statusID){
      this.statusFilter = statusID
    },
    askForReview(reservationId){
      const dormID = localStorage.getItem('manageDormID')
      this.$backend.$askForReview(dormID, reservationId).then(()=>{
        this.isReviewRequestSent = true
      })
    }
  },
  mounted(){
    this.fetchManagerReservation()
    this.setHeaderText()
  }
};