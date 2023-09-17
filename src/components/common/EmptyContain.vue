<script setup>
const props = defineProps({
  description: {
    type: String,
    default: "Il semble que votre écran soit vide.",
  },
});
</script>
<template>
  <div
    class="flex w-full justify-center items-center flex-col gap-3 py-20 bg-white rounded-lg"
  >
    <!-- <svg
      width="189"
      height="176"
      viewBox="0 0 189 176"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class=""
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M99.0519 149.787C135.246 149.787 164.588 120.445 164.588 84.1219C164.588 47.799 135.116 18.4563 99.0519 18.4563C62.8583 18.4563 33.5156 47.799 33.5156 84.1219C33.5156 120.445 62.8583 149.787 99.0519 149.787Z"
        fill="white"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M184.143 119.506C186.466 119.506 188.349 117.613 188.349 115.3C188.349 112.971 186.466 111.094 184.143 111.094C181.82 111.094 179.938 112.971 179.938 115.3C179.938 117.613 181.82 119.506 184.143 119.506Z"
        fill="#DAE1EB"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M25.0418 22.7514C27.3641 22.7514 29.2477 20.8587 29.2477 18.5455C29.2477 16.2172 27.3641 14.3396 25.0418 14.3396C22.7181 14.3396 20.8359 16.2172 20.8359 18.5455C20.8359 20.8587 22.7181 22.7514 25.0418 22.7514Z"
        fill="#DAE1EB"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.31291 112.939C12.627 112.939 16.1239 109.439 16.1239 105.128C16.1239 100.817 12.627 97.3169 8.31291 97.3169C3.99886 97.3169 0.501953 100.817 0.501953 105.128C0.501953 109.439 3.99886 112.939 8.31291 112.939Z"
        fill="#DAE1EB"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M158.973 17.4765C158.251 17.4765 157.674 16.8946 157.674 16.1724V1.66641C157.674 0.944124 158.251 0.372314 158.973 0.372314C159.694 0.372314 160.271 0.944124 160.271 1.66641V16.1724C160.271 16.8946 159.694 17.4765 158.973 17.4765Z"
        fill="#989FB0"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M169.508 28.5819C169.508 27.8597 170.086 27.2878 170.807 27.2878H185.311C186.032 27.2878 186.609 27.8597 186.609 28.5819C186.609 29.3042 186.032 29.8861 185.311 29.8861H170.807C170.086 29.8861 169.508 29.3042 169.508 28.5819Z"
        fill="#989FB0"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M168.357 19.202C167.852 18.7005 167.852 17.8377 168.357 17.3261L178.676 7.08367C179.181 6.57205 180.047 6.57205 180.552 7.08367C181.057 7.58526 181.057 8.44799 180.552 8.95961L170.305 19.202C169.728 19.7137 168.863 19.7137 168.357 19.202Z"
        fill="#989FB0"
      ></path>
      <g filter="url(#filter0_d_10697_6855)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M155.556 31.0478V137.172C155.556 140.292 153.857 142.89 151.82 142.89H46.2848C44.2462 143.016 42.5488 140.419 42.5488 137.298V31.0478C42.5488 27.8193 44.2462 25.3484 46.2848 25.3484H151.82C153.942 25.3484 155.556 27.9456 155.556 31.0478Z"
          fill="url(#paint0_linear_10697_6855)"
        ></path>
      </g>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M155.556 30.095V36.9146H42.5488V30.095C42.5488 27.4063 44.2462 25.3484 46.2848 25.3484H151.82C153.942 25.3484 155.556 27.5114 155.556 30.095Z"
        fill="url(#paint1_linear_10697_6855)"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M48.9235 33.1296C49.8173 33.1296 50.5428 32.4085 50.5428 31.5073C50.5428 30.606 49.8173 29.885 48.9235 29.885C48.0283 29.885 47.3027 30.606 47.3027 31.5073C47.3027 32.4085 48.0282 33.1296 48.9235 33.1296Z"
        fill="#F9FAFB"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M54.0016 33.1296C54.8969 33.1296 55.6224 32.4085 55.6224 31.5073C55.6224 30.606 54.8969 29.885 54.0016 29.885C53.1064 29.885 52.3809 30.606 52.3809 31.5073C52.3809 32.4085 53.1064 33.1296 54.0016 33.1296Z"
        fill="#F9FAFB"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M59.1872 33.1296C60.0824 33.1296 60.808 32.4085 60.808 31.5073C60.808 30.606 60.0824 29.885 59.1872 29.885C58.2919 29.885 57.5664 30.606 57.5664 31.5073C57.5664 32.4085 58.2919 33.1296 59.1872 33.1296Z"
        fill="#F9FAFB"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M66.5195 100.231C66.5195 99.324 67.2546 98.5889 68.1615 98.5889H129.944C130.851 98.5889 131.586 99.324 131.586 100.231C131.586 101.138 130.851 101.873 129.944 101.873H68.1615C67.2546 101.873 66.5195 101.138 66.5195 100.231Z"
        fill="#D5DDEA"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M66.5195 110.514C66.5195 109.608 67.2546 108.873 68.1615 108.873H129.944C130.851 108.873 131.586 109.608 131.586 110.514C131.586 111.421 130.851 112.156 129.944 112.156H68.1615C67.2546 112.156 66.5195 111.421 66.5195 110.514Z"
        fill="#D5DDEA"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M66.5195 120.799C66.5195 119.892 67.2546 119.157 68.1615 119.157H129.944C130.851 119.157 131.586 119.892 131.586 120.799C131.586 121.705 130.851 122.441 129.944 122.441H68.1615C67.2546 122.441 66.5195 121.705 66.5195 120.799Z"
        fill="#D5DDEA"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M82.7083 60.385C84.5238 60.385 85.996 58.9153 85.996 57.0998C85.996 55.2843 84.5238 53.8022 82.7083 53.8022C80.894 53.8022 79.4219 55.2843 79.4219 57.0998C79.4219 58.9153 80.894 60.385 82.7083 60.385Z"
        fill="#989FB0"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M115.4 60.385C117.215 60.385 118.686 58.9153 118.686 57.0998C118.686 55.2843 117.215 53.8022 115.4 53.8022C113.584 53.8022 112.113 55.2843 112.113 57.0998C112.113 58.9153 113.584 60.385 115.4 60.385Z"
        fill="#989FB0"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M104.384 81.9734H94.0792C92.481 81.9734 91.1484 80.6395 91.1484 79.034C91.1484 77.4408 92.481 76.1069 94.0792 76.1069H104.295C105.895 76.1069 107.227 77.4408 107.227 79.034C107.316 80.6395 105.984 81.9734 104.384 81.9734Z"
        fill="#989FB0"
      ></path>
      <defs>
        <filter
          id="filter0_d_10697_6855"
          x="20.5488"
          y="14.3484"
          width="157.006"
          height="161.546"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          ></feColorMatrix>
          <feOffset dy="11"></feOffset>
          <feGaussianBlur stdDeviation="11"></feGaussianBlur>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.396078 0 0 0 0 0.478431 0 0 0 0 0.576471 0 0 0 0.270588 0"
          ></feColorMatrix>
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_10697_6855"
          ></feBlend>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_10697_6855"
            result="shape"
          ></feBlend>
        </filter>
        <linearGradient
          id="paint0_linear_10697_6855"
          x1="99.0165"
          y1="22.6255"
          x2="99.0165"
          y2="144.159"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FDFEFF"></stop>
          <stop offset="0.9964" stop-color="#ECF0F5"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear_10697_6855"
          x1="43.6352"
          y1="31.0472"
          x2="156.229"
          y2="31.0472"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#00A0FF"></stop>
          <stop offset="1" stop-color="#46BAFF"></stop>
        </linearGradient>
      </defs>
    </svg> -->
    <img src="/empty.svg" width="189" height="176" alt="empty contain image" />
    <div class="flex flex-col items-center">
      <span class="text-darkblue text-base">Oups !</span
      ><span class="text-darkblue text-base">{{ description }}</span>
    </div>
  </div>
</template>
