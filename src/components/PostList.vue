  <template>

  <div v-if="posts.length > 0">
    <h3>список постов</h3>
    <transition-group name="post-list">
      <PostItem v-for="post in posts" :post='post' :key='post.id' @remove="$emit('remove', post)" />
    </transition-group>
  </div>
  <h2 style="color: red" v-else>список пуст</h2>

</template>
  
  <script>
import PostItem from './PostItem.vue';
export default {
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  components: { PostItem }
}
</script>
  
  <style scoped>
  .post-list-item {
    display: inline-block;
    margin-right: 10px;
  }
  
  .post-list-enter-active,
  .post-list-leave-active {
    transition: all 0.4s ease;
  }
  
  .post-list-enter-from,
  .post-list-leave-to {
    opacity: 0;
    transform: translateX(130px);
  }
  
  .post-list-move {
    transition: transform 0.4s ease;
  }
  </style>