<template>
  <div id="app">

  	<section class="main-view">
	  	<template v-if="!currentUser">
	  		<HomePage />
	  	</template>

	  	<template v-else>
			<SidePanel />
			<router-view />
	  	</template>
  	</section>

  </div>
</template>

<script>
	import HomePage from '@/components/HomePage.vue'
	import SidePanel from '@/components/SidePanel.vue'

	export default {
		components: {
			HomePage,
			SidePanel
		},
		data() {
		    return {
		      loader: null
		    }
		},
		mounted() {
			if(this.isLoading) {
		      this.loader = this.$loading.show()
		    }
		},
		computed: {
			currentUser() {
				return this.$store.getters.user;
			},
			isLoading() {
		      return this.$store.getters.loading;
			}
		},
		watch: {
		    isLoading(val) {
		      if(val === false) {
		        this.loader.hide()
		      } else {
		        this.loader = this.$loading.show()
		      }
		    }
		}
	}

</script>
