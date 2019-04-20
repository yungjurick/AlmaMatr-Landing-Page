<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="body">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'modal'
}

</script>

<style lang="scss" scoped>
@import '../assets/theme.scss';

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .3);
  display: table;
  transition: opacity .3s ease;

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 600px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;

    .header {
      padding-bottom: 10px;
      border-bottom: 0.5px solid #919191;
    }

    .body {
      overflow: scroll;
      margin: 20px 0;
      flex: 1;
    }

    .footer {
      padding-top: 10px;
      border-top: 0.5px solid #919191;
    }

    .modal-default-button {
      float: right;
    }
  }
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
