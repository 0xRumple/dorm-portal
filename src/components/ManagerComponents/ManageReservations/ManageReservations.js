
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
      status: this.$store.getters.lang.manageResrevations.status,
      currentStatus: '',
      followUpMessage: '',
      reservationID: null,
      statusIndex: null,
      statusFilter: null,
      requiredRules:[
        v => !!v || 'This field is required'
      ],
      statusRules:[
        v => !!v || 'Status is required',
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
        this.$store.state.snackbar.message = 'Can\'t load dorm'
        this.$store.state.snackbar.color = 'error'
      })
    },
    setStatusIndex(){
      this.statusIndex = this.status.indexOf(this.currentStatus)
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
        this.$store.dispatch("updateReservationStatus", data).then(()=>{
          let snackbar = {
            message: 'Status has been Updeated, successfully',
            color: 'success'
          }
          this.$refs.form.reset()
          this.close()
          this.$store.dispatch("fetchManagerReservation", data.dormID)
          this.$store.commit('updateSnackbar', snackbar)
        }).catch(()=>{
          let snackbar = {
            message: 'Something went Wrong! Try again',
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
      this.$store.dispatch('askForReview', {dormID,reservationId}).then(()=>{
        this.isReviewRequestSent = true
      })
    }
  },
  mounted(){
    this.fetchManagerReservation()
    this.setHeaderText()
  }
};