<template>

  <div class="menu-container">

    <div class="menu-background" />

    <!-- root level itens -->
    <ul class="menu">

      <li class="menu__top">
        <a
        href="#"
        class="menu__title"
        >
          New York University
        </a>
        <img src="../assets/nyu-logo.jpg" alt="icon" class="menu__logo">
      </li>

      <li>
        <a
        href="#"
        @click.prevent="updateMenu('home')"
        :class="highlightSection('home')"
        >
            <i class="far fa-home menu__icon" aria-hidden="true"></i>
            Home
        </a>
      </li>

      <li>
        <a
        href="#"
        @click.prevent="updateMenu('profile')"
        :class="highlightSection('profile')"
        >
            <i class="fas fa-home menu__icon" aria-hidden="true"></i>
            Profile
        </a>
      </li>

      <li>
        <a
        href="#"
        @click.prevent="updateMenu('inbox')"
        :class="highlightSection('inbox')"
        >
          <i class="fas fa-users menu__icon" aria-hidden="true"></i>
          Inbox
        </a>
      </li>

      <li>
        <a
        href="#"
        @click.prevent="updateMenu('network')"
        :class="highlightSection('network')"
        >
          <i class="fas fa-tag menu__icon" aria-hidden="true"></i>
          Network
        </a>
      </li>

      <li>
        <a
        href="#"
        @click.prevent="updateMenu('meetups')"
        :class="highlightSection('meetups')"
        >
          <i class="fas fa-user menu__icon" aria-hidden="true"></i>
          Meet Up Events
        </a>
      </li>

      <li class="menu__top">
        <a
        href="#"
        class="menu__title"
        >
          Interests
        </a>
      </li>

    </ul>
  </div>

</template>

<script>
  import database from '@/services/database'
  //import store from '@/store'

  export default {
    name: 'SidePanel',
    data() {
      return {
        contextSection: ''
      }
    },
    computed: {
      currentUser() {
        return this.$store.getters.user;
      }
    },
    methods: {
      updateMenu(context) {
        this.contextSection = context;

        if (context === 'home') {
          this.$router.push('/home');
        } else {
          this.$router.push('/home/' + context);
        }
        

        // if (context === 'home') {
        //   this.$router.push('/');
        //   //window.bus.$emit('menu/closeMobileMenu');
        // }
      },

      highlightSection(section) {
        return {
          'menu__link': true,
          'menu__link--active': section === this.contextSection,
        };
      },

      async googleLogin() {

        let loader = this.$loading.show();

        let result = await database.signIn();
        if (result.message) {
          this.error = result.message;
          console.log(this.error)
        }
        loader.hide();
      },

      async logout() {
        let loader = this.$loading.show();
        await database.signOut();

        setTimeout(() => {
          loader.hide()
        }, 500)
      },

      toggleProfileEdit() {
        this.$store.dispatch('setEditProfile', true)
      }
    }
  };
</script>

<style lang="scss" scoped>
@import '../assets/theme.scss';

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .menu-container {
    font-family: $font_main;
    font-weight: 300;
    z-index: 1000;
    position: fixed;
    left: 290px;
    width: 290px;
    height: 100%;
    margin-left: -290px;
    overflow-y: auto;
    background: #000;
    // top: 0;
    overflow: hidden;
    transition: all .5s ease;
  }

  .menu-background {
    position: absolute;
    height: 100%;
    width: 100%;
    background: url('../assets/menu-background.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    &:before {
      content:'\A';
      position:absolute;
      width:100%; height:100%;
      top:0; left:0;
      background: black;
      opacity: 0.6334867931547619;
    }
  }

  .menu {
    position: fixed;
    width: 290px;
    height: 100%;
  }

  .menu__top {
    padding: 14px 15px 13px 5px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
    border-bottom: 0.5px solid white;

    &:after {
      display: block;
      content: "";
      clear: both;
    }
  }

  .menu__logo {;
    width: 35px;
    height: 35px;
    display: block;
    float: right;
    border: solid 1px white;
  }

  .menu__title {
    display: block;
    float: left;
    margin-left: 10px;
    padding-top: 6px;
    font-weight: 400;
    color: #fff;

    &:hover {
      color: #ccc;
      text-decoration: none;
      transition: all 150ms ease;
    }
  }

  .menu__icon {
    font-size: 16px;
    width: 16px;
    text-align: center;
    margin-right: 10px;
  }

  .menu__arrow-icon {
    float: right;
    margin: 5px 0 0 0;
  }

  .menu__link {
    display: block;
    padding: 10px 15px 10px 15px;
    color: #fff;
    text-decoration: none;

    &:hover {
      color: #fff;
      text-decoration: none;
      background: #a2a3a3;
      opacity: 45%;
      transition: all 500ms ease-out;
    }

    &:visited {
      color: #fff;
      text-decoration: none;
    }
  }

  .menu__link--active {
    background: #a2a3a3;
  }

  // context menu
  .context-menu-container {
    position: absolute;
    left: 40px;
    width: 237px;
    height: 100%;
    background: #000;
  }

  .context-menu {
    position: absolute;
    top: 0;
    width: 100%;
    background: #000;
  }

  .context-menu__title {
    font-size: 1.20rem;
    color: #fff;
    padding: 18px 0 17px 8px;
    border-bottom: 1px solid #ccc;
  }

  .context-menu__title-icon {
    margin: 0 0 0 0;
  }

  .context-menu__btn-close {
    float: right;
    margin-right: 8px;
    color: #fff;

    &:hover {
      color: #fff;
    }
  }

  .context-menu__link {
    display: block;
    padding: 10px;
    color: #fff;
    text-decoration: none;
    background: transparent;

    &:hover {
      color: #fff;
      text-decoration: none;
      background: #3c444b;
      cursor: pointer;
      transition: all 500ms ease-out;
    }

    &:visited {
      color: #fff;
    }
  }

  .context-menu__link--active {
    background: #57636d;
  }

  .slide-fade-enter-active {
    transition: all 0.2s ease;
  }

  .slide-fade-leave-active {
    transition: all 0.2s ease;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translate3d(-30px, 0, 0);
    opacity: 0;
  }

</style>
