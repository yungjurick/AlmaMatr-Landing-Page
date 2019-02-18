<template>
	<div class="main-form-container">
	    <form id="" class="" method="post" v-on:submit.prevent="onSearch">
	    	<input
	    		v-model="filter"
	    		type="text"
	    		class="main-input main-name"
	    		placeholder="Enter search term" />
	      	<button v-on:click="toggle = !toggle" type="button" class="main-btn">
	      		<p class="search-small">SEARCH BY</p>
	      		<p class="search-large"> {{ searchBy }} </p>
	  		</button>
			<transition name="slide">
			  <ul v-if="toggle" class="search-description">
			    <li v-for="option in searchByOptions"
			    	:key="option.index"
			    	@click="updateSearchBy(option)">
			      {{ option }}
			    </li>
			  </ul>
			</transition>
			<input id="main-submit" type="submit" value="Search" />
	    </form>
	</div>
</template>

<script>
export default {
	name: 'SearchBar',
	props: ['searchOptions'],
	data() {
		return {
			filter: '',
			searchByOptions: [
				'Name',
				'Location',
				'Company'
			],
			searchBy: 'Name',
			toggle: false
		};
	},
	methods: {
		onSearch() {
			// Add filtering here
			console.log("Start searching");

		},
		updateSearchBy(option) {
			this.searchBy = option;
			this.toggle = false;
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/theme.scss';

.main-form-container {
    height: 42px;
    position: relative;
    display: inline-block;

    .main-input {
      background: #fff;
      height: 42px;
      width: 500px;
      color: #545454;
      border: 1px solid #cccccc;
      margin-bottom: 0px;
      -webkit-appearance: none;
      border-radius: 4px 0px 0px 4px;
      -moz-border-radius: 4px 0px 0px 4px;
      -webkit-border-radius: 4px 0px 0px 4px;
      display: inline-block;
      text-align: left;
      font-size: 15px;
      font-weight: 500;
      padding: 0px 0px 0px 45px;
      font-size: 16px;
      border-right: 0px;
      background: #ffffff url('../assets/magnifying-glass.png') 16px 13px no-repeat;
      background-size: 15px 15px;
      float: left;
    }

    .main-btn {
      display: inline-block;
      width: 150px;
      height: 42px;
      border: 1px solid #cccccc;
      padding: 0px;
      position: relative;
      float: left;
      border-right: 0px;
      background: #ffffff url("http://seodesigns.com/projects/TD/images/main-bullet.png") 122px 23px no-repeat;
      background-size: 6px 6px;
      cursor: pointer;
    }

    .search-small {
        font-size: 10px;
        margin: 0px;
        color:#9B9B9B;
        position: absolute;
        top: 4px;
        left: 16px;
        display: inline-block;
        width: 80px;
        height: 16px;
        text-align: left;
    }
     .search-large {
        font-size: 14px;
        margin: 0px;
        color: #4A4A4A;
        position: absolute;
        top: 17px;
        left: 16px;
        display: inline-block;
        width: 105px;
        height: 20px;
        font-weight: 700;
        text-align: left;
    }

    ul.search-description {
      z-index: 1001;
      width: 150px;
      position: absolute;
      background: #fff;
      right: 141px;
      top: 45px;
      border-radius: 2px;
      -moz-border-radius: 2px;
      -webkit-border-radius: 2px;
      border: 1px solid #E5E5E5;
      -webkit-box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.3);
      -moz-box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.3);
      box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.3);
      text-align: left;

      li {
        font-size:14px;
        color: #4A4A4A;
        // font-weight: 700;
        padding: 6px 0px;
        display: block;
        padding-left: 16px;
        cursor: pointer;

        &:hover {
          background:#f8f8f8;
        }
      }
    }

    #main-submit {
      background: #8f8f8f;
      color: #fff;
      display: inline-block;
      font-size: 16px;
      text-align: center;
      cursor: pointer;
      margin-bottom: 0px;
      -webkit-appearance: none;
      border-radius: 0px 4px 4px 0px;
      -moz-border-radius: 0px 4px 4px 0px;
      -webkit-border-radius: 0px 4px 4px 0px;
      width: 141px;
      height: 42px;
      border: 0px;
      padding-top: 0px;
      float: left;

      &:hover {
        background: #676767;
        color: #fff !important;
        -webkit-appearance: none;
      }
    }

    .slide-enter-active, .slide-leave-active  {
		transition: all .3s ease;
	}
	.slide-enter, .slide-leave-to {
		transform: translateY(-30%);
		opacity: 0;
	}

}

</style>