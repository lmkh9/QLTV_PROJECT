<template>
    <nav aria-label="Page navigation example" class="page-navigation" :key="paginationStore.idxCurNode" v-if="paginationStore.quantityNodes > 1">
        <ul class="pagination">
            <li class="page-item">
                <div class="page-link" aria-label="Previous"  @click="paginationStore.indexPrevPage()">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                </div>
            </li>
            <li class="page-item"  v-for="(node) in paginationStore.quantityNodes">
                <div class="page-link page-link-number"  @click="() => paginationStore.idxCurNode = node - 1">{{ node }}</div>
            </li>
            <li class="page-item">
                <div class="page-link" aria-label="Next" @click="paginationStore.indexNextPage()">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                </div>
            </li>
        </ul>
    </nav>
</template>

<script>
import { usePaginationStore } from '../stores/pagination.js';
export default {
    setup() {
        const paginationStore = usePaginationStore();
        return {
            paginationStore
        }
    },
    methods: {
        activeNode() {
            const nodes = document.getElementsByClassName('page-link-number');
            for (let i = 0; i < nodes.length; i++) {
                if (i === this.paginationStore.idxCurNode) {
                    nodes[i].classList.add('active')
                } else {
                    nodes[i].classList.remove('active')
                }
            }
        }
    },
    async mounted() {
        this.activeNode();
    },
    async updated() {
        this.activeNode();
    }
}
</script>

<style scoped>
.page-navigation {
    display: flex;
    justify-content: center;
}

.page-item {
    font-size: 1.3rem;
}

.page-link {
    padding: 1rem 1.5rem;
}

.page-link-number.active {
    background-color: blue;
    color: white;
}
</style>