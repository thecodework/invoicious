<template>
  <div>
    <client-only>
      <quill-editor
        ref="editor"
        v-model="data"
        :options="{
          modules: {
            toolbar: '#editor-' + uniqueID,
          },
        }"
      >
        <div :id="'editor-' + uniqueID" slot="toolbar">
          <!-- Add a bold button -->
          <button class="ql-bold">Bold</button>
          <button class="ql-italic">Italic</button>
          <!-- Add font size dropdown -->
          <select class="ql-size">
            <option value="small"></option>
            <option selected></option>
            <option value="large"></option>
            <option value="huge"></option>
          </select>
        </div>
      </quill-editor>
    </client-only>
  </div>
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  props: {
    content: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      data: "",
      uniqueID: this._uid,
    };
  },
  mounted() {
    setTimeout(() => {
      if (this.content) {
        this.data = this.content;
      }
    }, 500);
  },
});
</script>