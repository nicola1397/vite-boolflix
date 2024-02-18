<script>
import { store } from "../store.js";
import { data } from "../data.js";
import { lang } from "../lang.js";

import axios from "axios";
export default {
  data() {
    return {
      store,
      data,
      isDown: false,
      startX: "",
      scrollLeft: "",
      ref1: "target1",
    };
  },
  methods: {
    getFlag(code) {
      const isoCode = lang[code];
      if (isoCode) {
        return `https://flagsapi.com/${isoCode.toUpperCase()}/shiny/64.png`;
      } else {
        return code;
      }
    },
    starRating(rating) {
      const stars = Math.round(rating / 2);
      return stars;
    },
    closeWindow() {
      data.isShown = false;
    },
    mousedown(event, ref) {
      console.log("ciao");
      this.isDown = true;
      this.startX = event.pageX;
      this.scrollLeft = this.$refs[ref].scrollLeft;
    },
    mousemove(event, ref) {
      if (!this.isDown) return;
      console.log("addio");
      event.preventDefault();
      const x = event.pageX;
      const walk = x - this.startX;
      this.$refs[ref].scrollLeft -= walk * 0.03;
    },
  },

  created() {
    if (data.isShown) {
      window.addEventListener("scroll", this.closeWindow);
    }
  },
};
</script>

<template>
  <div class="pageWrapper" @scroll="closeWindow()">
    <div class="container-md" id="popupWindow">
      <button
        class="btn btn-outline-secondary"
        id="close"
        @click="closeWindow()"
      >
        <i class="bi bi-x-lg"></i>
      </button>
      <div class="contentWrapper">
        <div class="col-auto p-5">
          <!-- IMMAGINE DI COPERTINA -->
          <img
            v-if="data.details.poster_path"
            class="coverImg"
            :src="`${data.imgStr}${data.details.poster_path}`"
            alt="..."
          />

          <div v-else class="titleBackdrop">
            <h3 class="coverTitle">
              {{ data.details.title || data.details.name }}
            </h3>
          </div>
        </div>

        <div class="col-6 p-5" id="details">
          <h4 v-if="data.details.title || data.details.name">Titolo</h4>
          <h5>{{ data.details.title || data.details.name }}</h5>
          <h4 v-if="data.mediaType == `movie`">Titolo Originale</h4>
          <h4 v-else>Stato</h4>
          <h5>{{ data.details.original_title || data.details.status }}</h5>

          <div class="d-flex justify-content-between">
            <div>
              <h4 v-if="data.details.original_language">Lingua</h4>
              <div>
                <img :src="getFlag(data.details.original_language)" alt="" />
              </div>
            </div>
            <div>
              <h4
                v-if="data.details.release_date || data.details.first_air_date"
              >
                Data di uscita
              </h4>
              <h5 class="mt-4">
                {{ data.details.release_date || data.details.first_air_date }}
              </h5>
            </div>
            <div v-if="data.details.adult">
              <h4>Contenuti per adulti:</h4>
              <h5 class="mt-4" v-if="data.details.adult">Si</h5>
              <h5 class="mt-4" v-else>No</h5>
            </div>
          </div>
          <h4>Generi</h4>
          <div v-if="data.details.genres">
            <span
              v-for="genres in data.details.genres"
              class="badge rounded-pill text-bg-light me-2"
              >{{ genres.name }}</span
            >
          </div>
          <h4 v-if="data.credits.cast">Cast</h4>
          <div
            class="castContainer"
            :ref="ref1"
            @mousedown="mousedown($event, ref1)"
            @mouseleave="this.isDown = false"
            @mouseup="this.isDown = false"
            @mousemove="mousemove($event, ref1)"
          >
            <div v-for="actor in data.credits.cast" class="actorProfile">
              <div class="ppContainer">
                <div v-if="actor.profile_path">
                  <img
                    :src="`${data.prStr}${actor.profile_path}`"
                    class="d-block"
                    alt=""
                  />
                </div>
                <span class="fw-light text-wrap">{{ actor.name }}</span>
              </div>
            </div>
          </div>

          <h4 v-if="data.details.overview">Trama</h4>
          <div class="overviewWrap">
            <span class="fw-light">{{ data.details.overview }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#close {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 3;
  * {
    background-color: transparent;
  }
}
#popupWindow {
  overflow: hidden;
  height: 90vh;
  z-index: 2;
  position: relative;
}
.pageWrapper {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.contentWrapper {
  display: flex;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.coverContainer {
  display: flex;
  justify-content: center;

  background-color: black;
}

.titleBackdrop {
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 800px;
  padding: 20px;
}

.coverTitle {
  color: white;
  background-color: transparent;
  text-align: center;
}

#details {
  overflow: hidden;
  color: white;
  display: flex;
  flex-direction: column;
}

.castContainer {
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  .actorProfile {
    display: inline-block;
    margin-right: 20px;
  }

  .ppContainer {
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    justify-content: baseline;

    img {
      width: 45px;
    }
    span {
      display: block;
    }
  }
}
.overviewWrap {
  height: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
