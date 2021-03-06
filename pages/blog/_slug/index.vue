<template>
    <!-- <div v-if="entry" class="h-full bg-grey article-view">
        <div class="bg-black h-full text-white text-center px-4 py-12 md:py-32 font-primary">
            <h1 class="font-bold text-lg md:text-4xl">{{ entry.hero[0].heading }}</h1>
            <div class="text-md md:text-2xl mx-auto w-64 md:w-auto md:max-w-xl">{{ entry.title }}</div>
        </div>
        <div class="bg-grey-darker px-4 py-12 md:py-24">
            <div class="article-view__copy text-white text-md md:text-lg max-w-3xl mx-auto font-bold" v-html="entry.contentField"></div>
        </div>
    </div> -->
    <div v-if="entry" class="h-full bg-grey-darker">
        <div class="hero relative overflow-hidden bg-black h-full text-white text-center px-4 py-12 md:py-32 font-primary">
            <h1 class="relative z-10 font-display text-2xl md:text-3xl lg:text-5xl">{{ entry.hero[0].heading }}</h1>
            <div class="relative z-10 text-md md:text-2xl mx-auto w-64 md:w-auto md:max-w-xl">{{ entry.title }}</div>
            <v-img v-if="entry.hero[0].featuredImage" :src="entry.hero[0].featuredImage[0].filename" :alt="entry.hero[0].featuredImage[0].title" :sizes="heroSizes" imgClass="absolute h-full w-full left-0 right-0 top-0 bottom-0" />
        </div>
        <div class="container mx-auto bg-grey-darker px-5 my-12 md:my-20 ">
            <div class="article-view__copy font-primary text-white text-md md:text-lg max-w-3xl mx-auto" v-html="entry.contentField"></div>
        </div>
        <div class="bg-grey" v-for="item in entries" :key="item.id">
            <div class="container mx-auto px-4 lg:px-0 py-10 flex flex-row items-center justify-between" v-if="item.slug === routeID" :key="item.id">
                <!-- PREV BLOG POST -->
                <nuxt-link :class=" { 'opacity-50 pointer-events-none' : !item.next }" class="entry-navigation bg-white flex flex-row items-center justify-between rounded-lg" :to="item.next ? '/blog/' + item.next.slug + '/' : '/'" :key="item.id">
                    <div class="entry-navigation__button entry-navigation__button--left flex items-center bg-black h-full p-3">
                        <font-awesome-icon class="text-xl text-white" :icon="['fas', 'long-arrow-alt-left']" />
                    </div>
                    <span class="text-sm lg:text-base py-3 px-6 font-typewriter hidden md:block" v-if="item.next">{{ item.next.title }}</span>
                </nuxt-link>
                <nuxt-link to="/blog/" class="bg-black rounded lg:rounded-lg p-2">
                    <font-awesome-icon class="text-2xl text-white" :icon="['fas', 'th']" />
                </nuxt-link>
                <!-- NEXT BLOG POST -->
                <nuxt-link :class="!item.prev ? 'opacity-50 pointer-events-none justify-end' : 'justify-between'" class="entry-navigation bg-white flex flex-row items-center rounded-lg" :to="item.prev ? '/blog/' + item.prev.slug + '/' : '/'" :key="item.id">
                    <span class="hidden md:block text-sm lg:text-base py-3 px-6 font-typewriter" v-if="item.prev">{{ item.prev.title }}</span>
                    <div class="entry-navigation__button entry-navigation__button--right flex items-center bg-black h-full p-3">
                        <font-awesome-icon class="text-xl text-white" :icon="['fas', 'long-arrow-alt-right']" />
                    </div>
                </nuxt-link>
            </div>
        </div>
        <div class="bg-grey-darker py-5 md:py-10">
            <div class="max-w-3xl mx-auto px-4 md:px-0">
                <newsletter-general :message="articleMessage" class="relative z-10"></newsletter-general>
            </div>
        </div>
    </div>
</template>
<script>
import NewsletterGeneral from "~/components/Globals/NewsletterGeneral.vue";

// GraphQL Queries
import article from '~/apollo/queries/channels/article'
import articles from '~/apollo/queries/channels/articles'
import globals from '~/apollo/queries/globals'

export default {

    data() {
        return {
            articleMessage: "Get involved. Join the newsletter and get monthly stories, reports and blog posts.",
            routeID: this.$route.params.slug,
            loading: 0,
            seoTitle: null,
            seoMetaDescription: null,
            seoCanonical: 'https://www.floorfiftyfour.co.uk/blog/' + this.$route.params.slug + '/',
            seoRobots: null,
            seoImage: null,
            seoType: null,
            heroSizes: {
                // iphone 5
                320: {
                    tr: 'h-640'
                },
                // ipad
                768: {
                    tr: 'w-1280'
                },
                // ipad pro
                1024: {
                    tr: 'w-1440'
                },
                // desktop
                1280: {
                    tr: 'w-1600'
                }
            },
        }
    },
    apollo: {
        $loadingKey: 'loading',
        entry: {
            prefetch: true,
            query: article,
            variables () {
                return {
                    slug: this.$route.params.slug
                }
            },
            result({ data }) {

                this.seoTitle = data.entry.title;

                // sets meta description
                if (data.entry.seoMetaDescription) {
                    this.seoMetaDescription = data.entry.seoMetaDescription;
                }

                // sets robots.txt
                if (data.entry.seoRobots) {
                    this.seoRobots = data.entry.seoRobots;
                }

                // sets SEO type
                if (data.entry.seoContentType) {
                    this.seoType = data.entry.seoContentType;
                }

                // sets SEO image if available
                if (data.entry.seoImage.length > 0) {
                    this.seoImage = data.entry.seoImage[0].filename
                }
            }
        },
        entries: {
            prefetch: true,
            query: articles,
        },
        globalSets: {
            prefetch: true,
            query: globals,
            result({ data }) {

                // // sets meta description
                if (data.globalSets[0].seoMetaDescription && this.seoMetaDescription == null) {
                    this.seoMetaDescription = data.globalSets[0].seoMetaDescription;
                }

                // // sets SEO image if available
                if (data.globalSets[0].seoImage.length > 0 && this.seoImage == null) {
                    this.seoImage = data.globalSets[0].seoImage[0].filename
                }
            }
        }
    },
    head() {
        return {
            title: this.seoTitle,
            link: [
                { rel: 'canonical', href: this.seoCanonical }
            ],
            meta: [
                { hid: 'description', name: 'description', content: this.seoMetaDescription },
                { hid: 'robots', name: 'robots', content: this.seoRobots },

                // OpenGraph tags
                { hid: 'og:type', property: 'og:type', content: this.seoType, vmid: 'og:type' },
                { hid: 'og:title', property: 'og:title', content: this.seoTitle, vmid: 'og:title' },
                { hid: 'og:description', property: 'og:description', content: this.seoMetaDescription, vmid: 'og:description' },
                { hid: 'og:image', property: 'og:image', content: 'https://ik.imagekit.io/2lyxtm1dps/' + this.seoImage, vmid: 'og:image' },
                { hid: 'og:url', property: 'og:url', content: this.seoCanonical, vmid: 'og:url' },

                // Twitter card
                { hid: 'twitter:title', property: 'twitter:title', content: this.seoTitle, vmid: 'twitter:title' },
                { hid: 'twitter:description', property: 'twitter:description', content: this.seoMetaDescription, vmid: 'twitter:description' },
                { hid: 'twitter:image', property: 'twitter:image', content: 'https://ik.imagekit.io/2lyxtm1dps/' + this.seoImage, vmid: 'twitter:image' },
                
            ],
        }
    },
    components: {
        NewsletterGeneral
    }
}
</script>

<style lang="scss">

.entry-navigation {
    
    max-height: 44px;

    @include min-bp($md) {
        min-width: 240px;
    }

    @include min-bp($lg) {
        min-width: 360px;
    }

    &__button {
        &--left {
            border-radius: 4px;

            @include min-bp($md) {
                border-radius: 8px 0 0 8px;
            }
        }

        &--right {
            border-radius: 4px;

            @include min-bp($md) {
                border-radius: 0 8px 8px 0;
            }
        }
    }
}

.article-view__copy {

    p {
        margin-bottom: 20px;
        line-height: 1.75;
    }

    a {
        color: $red;
        font-weight: $bolder;
    }
}

</style>