<template id="modal">
 <div class="modal">
	<div class="modal-window">
	  <p>¿Desea eliminar el cliente?</p>
	  <div class="actions">
		 <button class="cancel" @click="onCancel">Cancelar</button>
		 <button class="confirm" @click="onConfirm">Confirmar</button>
	  </div>
	</div>
 </div>
</template>

<script>
export default {
    name: 'cliente-confirmation-modal',
    props: ["open", "clienteId"],
    methods: {
		onConfirm() {
			this.$emit("confirm");
		},
		onCancel() {
			this.$emit("cancel");
		}
	}
}
</script>

<style >
        *,
    *::before,
    *::after {
     box-sizing: border-box;
    }
    
    
    [v-cloak] {
     display: none;
    }
    
    button {
     cursor: pointer;
    }
    
    .users {
     list-style: none;
     margin: 0;
     padding: 0;
     margin: 1em 0;
     line-height: 2;
    }
    
    .users li {
     padding: 4px 2em;
     display: flex;
     justify-content: space-between;
     background: rgba(0, 0, 0, .2);
     margin-bottom: 6px;
    }
    
    .users li:nth-of-type(even) {
     background: rgba(0, 0, 0, .2);
    }
    
    .users li:nth-of-type(odd) {
     background: rgba(0, 0, 0, .4);
    }
    
    .deleteBtn {
     all: unset;
     cursor: pointer;
    }
    
    .newuser-input {
     font-size: inherit;
     padding: 4px;
     display: block;
     width: 100%;
     margin: 0 auto;
    }
    
    .user-enter {
     opacity: 0;
     transform: translateY(-5px);
    }
    
    .user-enter-active {
     transition: .3s;
    }
    
    .user-leave-active {
     opacity: 0;
     transform: translateX(50px);
     transition: .3s;
    }
    
    .user-move {
     transition: .5s;
    }

    .modal {
     position: fixed;
     top: 0;
     left: 0;
     bottom: 0;
     right: 0;
     background: rgba(0, 0, 0, .5);
    }
    
    .modal-window {
     position: absolute;
     top: 50%;
     left: 50%;
     transition: .5s;
     width: 100%;
     min-width: 400px;
     max-width: 600px;
     background: white;
     box-shadow: 0 0 10px rgba(0, 0, 0, .5);
     transform: translate(-50%, -50%);
     padding: 1em;
     color: black;
     text-align: center;
    }
    
    .modal-window .actions {
     display: flex;
     justify-content: flex-end;
    }
    
    .actions button {
     font-size: inherit;
     margin: 4px;
     border: none;
     padding: 6px 8px;
     cursor: pointer;
    }
    
    .actions .cancel {
     background: darkred;
     color: white;
    }
    
    .actions .confirm {
     background: darkcyan;
     color: white;
    }
    
    .appear-enter {
     opacity: 0;
    }
    
    .appear-enter .modal-window {
     transform: translate(-75%, -50%);
    }
    
    .appear-enter-active {
     transition: .5s;
    }
    
    .appear-leave-active .modal-window {
     transform: translate(0, -50%);
    }
    
    .appear-leave-active {
     opacity: 0;
     transition: .5s;
    }
</style>
