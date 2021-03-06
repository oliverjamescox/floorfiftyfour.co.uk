<template>
    <div v-if="entry">
        <div class="hero relative overflow-hidden bg-black h-full text-white text-center px-4 py-12 md:py-32 font-primary">
            <h1 class="relative z-10 font-display text-3xl md:text-6xl">{{ entry.hero[0].heading }}</h1>
            <h2 class="relative z-10 text-md md:text-3xl mx-auto w-64 md:w-auto md:max-w-xl" v-html="entry.hero[0].subHeading"></h2>
            <v-img v-if="entry.hero[0].featuredImage" :sizes="heroSizes" :src="entry.hero[0].featuredImage[0].filename" :alt="entry.hero[0].featuredImage[0].title" imgClass="absolute h-full w-full left-0 right-0 top-0 bottom-0" />
        </div>
        <div class="py-10 px-4 md:px-8 lg:px-0 bg-grey">
            <component v-for="(block,index) in entry.pageBuilder" :key="index" :is="block.typeHandle" :block="block" :class="block.typeHandle" />
        </div>
    </div>
</template>
<script>
// Pagebuilder components
import ContentSimple from '~/components/PageBuilder/ContentSimple.vue';
import Asset from '~/components/PageBuilder/Asset.vue';

// GraphQL Queries
import about from '~/apollo/queries/page/about'
import globals from '~/apollo/queries/globals'

export default {
  apollo: {
    $loadingKey: 'loading',
    entry: {
      prefetch: true,
      query: about,
      result({ data }) {
        // set seo title
        if (data.entry.seoTitle) {
          this.seoTitle = data.entry.seoTitle;
        }

        // sets meta description
        if (data.entry.seoMetaDescription) {
          this.seoMetaDescription = data.entry.seoMetaDescription;
        }

        // sets canonical link
        if (data.entry.seoCanonical) {
          this.seoCanonical = data.entry.seoCanonical;
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
    globalSets: {
      prefetch: true,
      query: globals,
      result({ data }) {

          // // set seo title from global
          if (data.globalSets[0].seoTitle && this.seoTitle == null) {
            this.seoTitle = data.globalSets[0].seoTitle;
          }

          // // sets meta description
          if (data.globalSets[0].seoMetaDescription && this.seoMetaDescription == null) {
            this.seoMetaDescription = data.globalSets[0].seoMetaDescription;
          }

          // // sets canonical link
          if (data.globalSets[0].seoCanonical && this.seoCanonical == null) {
            this.seoCanonical = data.globalSets[0].seoCanonical;
          }

          // // sets SEO image if available
          if (data.globalSets[0].seoImage.length > 0 && this.seoImage == null) {
            this.seoImage = data.globalSets[0].seoImage[0].filename
          }
      }
    }
  },
  data() {
    return {
      loading: 0,
      seoTitle: null,
      seoMetaDescription: null,
      seoCanonical: null,
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
      ContentSimple,
      Asset,
  }
}
</script>