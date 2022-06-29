<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input v-model="searchQuery" placeholder='Поиск...' />
        <div class="app__btns">
            <my-button @click="showDialog"> создать пост </my-button>
            <my-select v-model="selectedSort" :options="sortOptions" />
        </div>
        <!-- <my-button @click="fetchPosts">Poluchit' posty</my-button> -->
        <!-- <input type="text" v-model.trim="modificatorValue"> -->
        <my-dialog v-model:show="dialogVisible">
            <post-form @create='createPost' />
        </my-dialog>
        <post-list :posts="sortedAndSearchedPosts" @remove='removePost' v-if="!isPostsLoading" />
        <div v-else>идет загрузка...</div>
        <div ref="observer" class="observer"></div>
        <!-- <div class="page__wrapper">
            <div v-for="pageNumber in totalPages" :key="pageNumber" class="page"
                :class="{ 'current-page': page === pageNumber }" @click="changePage(pageNumber)">{{ pageNumber }} </div>
        </div> -->
    </div>
</template>

<script>
import PostList from '@/components/PostList'
import PostForm from '@/components/PostForm'
import axios from 'axios'
import MyInput from '@/components/UI/MyInput.vue'

export default {
    components: {
        PostForm,
        PostList,
        MyInput
    },
    data() {
        return {
            posts: [],
            dialogVisible: false,
            modificatorValue: '',
            isPostsLoading: false,
            selectedSort: '',
            sortOptions: [{
                value: 'title',
                name: 'По названию'
            },
            {
                value: 'body',
                name: 'По содержимому'
            }
            ],

            searchQuery: '',
            page: 1,
            limit: 10,
            totalPages: 0,

        }
    },
    methods: {
        createPost(post) {
            this.posts.push(post)
            this.dialogVisible = false
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog() {
            this.dialogVisible = true
        },
        async fetchPosts() {
            try {
                // this.isPostsLoading = true;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                })
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = response.data
                this.isPostsLoading = false
            } catch (e) {
                alert('oshibka')
            } finally {
                this.isPostsLoading = false
            }
        },
        async loadMorePosts() {
            try {
                this.page += 1
                // this.isPostsLoading = true;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                })
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = [...this.posts, ...response.data]
                this.isPostsLoading = false
            } catch (e) {
                alert('oshibka')
            } finally {
                this.isPostsLoading = false
            }
        },
        // changePage(pageNumber) {
        //     this.page = pageNumber
        // }

    },
    mounted() {
        this.fetchPosts()
        console.log(this.$refs.observer);
        const options = {
            rootMargin: '0px',
            threshold: 1.0
        }
        const callback = (entries, observer) => {
            if (entries[0].isIntersecting && this.page < this.totalPages) {
                this.loadMorePosts()
            };
            /* Content excerpted, show below */
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer)
    },
    watch: {
        // selectedSort(newValue) {
        //     console.log(newValue);
        //     this.posts.sort((post1, post2) => {
        //         return post1[newValue]?.localeCompare(post2[newValue])
        //     })
        // },
        // page() {
        //     this.fetchPosts()
        // }
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase()?.includes(this.searchQuery.toLowerCase()))
        }
    }

}
</script>

<style>
.app__btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0
}

.page__wrapper {
    display: flex;
    margin-top: 15px;
}

.page {
    border: 1px solid black;
    padding: 10px;
}

.current-page {
    border: 2px solid teal;
    padding: 10px;
}

.observer {
    height: 30px;
    background: green;
}
</style>
