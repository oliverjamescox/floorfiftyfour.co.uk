<template>
    <div v-if="entries" class="book font-primary">
        <div class="py-10 md:py-20" v-for="(book,index) in entries" :key="book.id">
            <div class="flex items-center flex-col-reverse justify-between container mx-auto max-w-4xl" :class="index % 2 == 0 ? 'md:flex-row-reverse text-black' : 'md:flex-row text-white'">
                <div class="max-w-md px-4 md:px-0">
                    <!-- <div class="text-base">{{ book.hero[0].heading }}</div> -->
                    <h2 class="text-2xl md:text-4xl font-display mb-4">{{ book.title }}</h2>
                    <div class="text-lg md:text-xl" v-html="book.hero[0].description"></div>
                    <div v-if="book.hero[0].buttonUrl" class="text-left my-10">
                        <a target="_blank" class="btn font-display py-4 px-24 bg-brand-black text-white hover:bg-white hover:text-black cursor-pointer w-full md:w-auto" :href="book.hero[0].buttonUrl">{{book.hero[0].buttonText}}</a>
                    </div>
                </div>
                <div v-if="disabled" class="max-w-xs mb-4 md:mb-0">
                    <v-img class="w-full h-full" v-if="book.hero[0].image[0]" :src="book.hero[0].image[0].filename" :alt="book.hero[0].image[0].title" :sizes="imageSizes" imgClass="w-full" />
                </div>
                <nuxt-link v-else class="max-w-xs mb-4 md:mb-0" :to="'books/' + book.slug">
                    <v-img class="w-full h-full" v-if="book.hero[0].image[0]" :src="book.hero[0].image[0].filename" :alt="book.hero[0].image[0].title" :sizes="imageSizes" imgClass="w-full" />
                </nuxt-link>
                <!-- <nuxt-link :event="disabled ? '' : 'click'" class="max-w-xs mb-4 md:mb-0 cursor-default" :to="'books/' + book.slug">
                    <v-img class="w-full h-full" v-if="book.hero[0].image[0]" :src="book.hero[0].image[0].filename" :alt="book.hero[0].image[0].title" />
                </nuxt-link> -->
            </div>
        </div>
    </div>
</template>
<script>


// GraphQL Queries
import books from '~/apollo/queries/structures/books'

export default {
    apollo: {
        entries: {
            prefetch: true,
            query: books,
        },
    },
    data() {
        return {
            disabled: true,
            imageSizes: {
                // iphone 5
                320: {
                    tr: 'w-280'
                },
                // ipad
                768: {
                    tr: 'w-320'
                },
            },
        }
    },
    components: {
    }
}
</script>

<style lang="scss">

.book {
    & > div {
        
        &:nth-child(odd) {
            background: $brand-grey;
        }

        &:nth-child(even) {
            background: $grey--darker;
        }
    }
}


</style>