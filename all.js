var app = new Vue({
  el: '#app',
  data: {
    data: [],
    currentPage: 0,
    locations: [],
    currentLocation: ''
  },
  methods: {
    getSite(){
      const vm = this;
      const locations = new Set();
      vm.data.forEach((el, i) => {
        locations.add(el.Zone);
      });
      vm.locations = Array.from(locations)
    }
  },
  computed: {
    filterData(){
      const vm = this;
      const newData = [];
      let items = [];
      if(vm.currentLocation !== ''){
        items = vm.data.filter((el, i)=>{
          return el.Zone == vm.currentLocation
        })
      }else {
        items = vm.data
      }

      items.forEach((el, i)=>{
        if(i % 10 === 0){
          newData.push([]);
        }
        const page = parseInt(i / 10);
        newData[page].push(el);
      });
      return newData
    },
  },
  created() {
    const vm = this;
    const api = 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97';
    axios.get(api).then((res)=>{
      vm.data = res.data.result.records
      vm.getSite();
    })
  },
})