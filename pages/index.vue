<template>
  <div id="home">
    <div class="banner">
      <div class="banner-caption">
        <h1>
          {{ questionIndex > polls.length ? "Completed" : "Today's Poll" }}
        </h1>

        <div v-for="(poll, index) in polls" :key="index">
          <div v-if="questionIndex === poll.id">
            <h2>{{ `${poll.id}.${poll.title}` }}</h2>
            <h2>
              {{ `(${poll.answer.type}) ${formatDate(poll.publishedDate)}` }}
            </h2>

            <div>
              <el-progress
                class="mb-5"
                type="circle"
                :percentage="percentage"
              ></el-progress>
            </div>
            <div v-if="poll.answer.type === 'Single'">
              <button
                v-for="(option, index2) in poll.answer.options"
                :key="index2"
                class="banner-btn"
                @click="submit([option.label])"
              >
                {{
                  `${option.label}(${result[option.label] ? result[option.label].length : 0})`
                }}
              </button>
            </div>
            <div v-else-if="poll.answer.type === 'Multi'">
              <button
                v-for="(option, index2) in poll.answer.options"
                :key="index2"
                class="banner-btn"
                :style="
                  selected.includes(option.label) ? 'border: 1px solid blue' : ''
                "
                @click="selectOption(option.label)"
              >
                {{ `${option.label}` }}
              </button>

              <br />

              <button
                class="banner-btn"
                style="color: red; border: 1px solid red"
                @click="submit(selected)"
                :disabled="selected.length === 0"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <div v-if="questionIndex > polls.length">
          <button class="banner-btn" @click="reload()">Again</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questionIndex: 1,
      polls: [],
      selected: [],
      percentage: 0,
      result: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      await this.$axios.get(`/polly`).then((response) => {
        this.polls = response.data.data;

        this.$axios
          .post(`/polly/result`, { id: this.questionIndex })
          .then((response) => {
            let data = response.data.data;
            this.result = this.category(data);
            this.percentage = data.length;
          });
      });
    },
    category(data) {
      return data.reduce((group, item) => {
        const { answer } = item;
        group[answer] = group[answer] ?? [];
        group[answer].push(item);
        return group;
      }, {});
    },
    submit(option) {
      this.$axios
        .post(`/polly`, { id: this.questionIndex, answer: option })
        .then((response) => {
          // console.warn(response.data);
        });

      this.$axios
        .post(`/polly/result`, { id: this.questionIndex + 1 })
        .then((response) => {
          let data = response.data.data;
          this.result = this.category(data);
          console.warn(this.result)
        });

      this.questionIndex += 1;
    },
    selectOption(label) {
      const index = this.selected.indexOf(label);
      console.warn(index);
      if (index > -1) {
        this.selected.splice(index, 1);
      } else {
        this.selected.push(label);
      }
    },
    formatDate(d) {
      let dateFormat = new Date(d * 1000);
      return (
        dateFormat.getFullYear() +
        "/" +
        (dateFormat.getMonth() + 1) +
        "/" +
        dateFormat.getDate() +
        " " +
        dateFormat.getHours() +
        ":" +
        dateFormat.getMinutes() +
        ":" +
        dateFormat.getSeconds()
      );
    },
    reload() {
      window.location.reload();
    },
  },
};
</script>

<style lang="scss">
.banner {
  position: relative;
  height: 100vh;
  overflow: hidden;

  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    // background-image: url('https://i.imgur.com/p0P107f.gif');
    -webkit-filter: blur(8px);
    filter: blur(8px);
    background-repeat: no-repeat;
    background-size: cover;
    transform: scale(1.05);
  }

  .banner-caption {
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    width: 100%;
    text-align: center;
    transform: translateY(-50%);
    padding: 2rem;

    h1,
    h2 {
      margin-bottom: 2rem;
      color: #fff;
      letter-spacing: 3%;
    }
  }

  .banner-btn {
    position: relative;
    display: inline-block;
    padding: 1rem 1.25rem;
    color: #fff;
    text-decoration: none;
    border: 0.125rem solid #fff;
    border-radius: 1rem;
    margin: 0.5rem;

    &:hover {
      border-color: #065fd4;
      box-shadow: 0 0 2.5em #fff;
    }
  }
}

h1 {
  font-size: 3.6rem;
}
h2 {
  font-size: 1.44rem;
}
a {
  color: #00c8ed;
}

.wrapper {
  color: #fff;
  background-color: #011534;
  font-size: 1.4rem;
}

.container {
  min-height: 100vh;
  background-color: #033570;
}

.reset {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  cursor: pointer;
}

.reset svg {
  font-size: 2rem;
}

.divider {
  border-bottom: 1px solid #263570;
}
.border {
  width: 100%;
  border: 1px solid white;
}

.preparing {
  padding: 2rem;
  text-align: center;
  background-color: #011534;
  border-radius: 2rem;
}

.change-control {
  display: flex;
  margin-top: 1rem;
  input[type="file"] {
    display: none;
  }
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.back {
  margin: 16px 0 !important;
}
.upload {
  position: relative;
  padding: 2rem;
  margin: 2rem 0;
  text-align: center;
  background-color: #111a30;
  border: 2px dashed #4a5ef6;
  border-radius: 2rem;

  button {
    min-width: 12em;
  }

  input {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 0;
    cursor: pointer;
    opacity: 0;
  }
}
.progress {
  padding: 2rem;
  margin: 2rem 0;
  text-align: center;
  background-color: #111a30;
  border-radius: 2rem;
}
.break-word {
  word-break: break-word;
}
.zoom {
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > .zoom-control {
    flex-grow: 1;
    margin: 0 16px;
  }

  & + * {
    margin-left: 16px;
  }
}
.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.subtitle {
  width: 100%;
  height: 47rem;
  border: 1px solid #033570;
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 2;
  padding: 0.5rem 0;
}
.subtitle-item {
  padding: 0 0.5rem;
  &:hover {
    background-color: #725f00;
  }
  input {
    background-color: transparent;
    width: 95%;
    color: white;
    font-size: 13px;
    border: none;
    padding: 0.5rem;
    &:hover,
    &:active,
    &:focus {
      outline: none;
      background-color: #725f00;
    }
  }
}
.subtitle-click {
  background-color: #725f00;
}

.subtitle-timeline {
  overflow-x: auto;
  width: 100%;
  height: 5rem;
  white-space: nowrap;
}
.subtitle-timeline-item {
  border: 1px solid white;
  background-color: #033570;
  padding: 0 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    background-color: #725f00;
  }
}

.video-wrapper,
.video-preview-wrapper {
  position: relative;
  padding-top: 56.25%;

  & video {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: inline-block;
    width: 100%;
    height: 100%;
    background-color: #000;
  }
}

video::cue {
  background-color: transparent;
  color: white;
  font-size: 20px;
  line-height: 100px;
}
video::cue(v[voice="aa"]) {
  color: green;
}
video::cue(v[voice="bb"]) {
  color: rgb(0, 26, 128);
}

.wave-size {
  transform: rotate(180deg);
}

.actions {
  padding-top: 0.25rem;
  user-select: none;
}

.actions svg {
  margin: 0.25rem;
  font-size: 3rem;
  cursor: pointer;
}

.actions .disabled {
  color: #555;
}

// .subtitle-wave {
//   width: 100%;
//   height: 25px;
//   vertical-align: bottom;
// }

.audio-wave {
  width: 100%;
  height: 150px;
  vertical-align: bottom;
}

.video-timeline {
  position: relative;
  margin-top: -150px;
  overflow: auto;
}

.timeline-blank {
  height: 150px;
}

.video-timeline::-webkit-scrollbar {
  width: 10px;
}

.video-timeline::-webkit-scrollbar-track {
  background-color: #28387c;
  border-radius: 10px;
}

.video-timeline::-webkit-scrollbar-thumb {
  background: #4a5ef6;
  border-radius: 10px;
}

.timeline-current {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 2px;
  height: 100%;
  background-color: #4a5ef6;
}

.timeline-current:after {
  position: absolute;
  top: 0;
  left: -4px;
  content: "";
  border-color: #4a5ef6 transparent;
  border-style: solid;
  border-width: 10px 5px 0;
}

.spectrum-CSSComponent {
  max-width: 80% !important;
}

html {
  box-sizing: border-box;
  font-size: 10px;
  height: 100vh;
  width: 100%;
}
body {
  background-color: #011534;
  font-family: Roboto, Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Arial, sans-serif;
  padding: 0;
  margin: 0;
  height: 100%;
  overflow: hidden;
}

.btn {
  width: 18rem;
  height: 6rem;
  font-size: 2.4rem;
}

*,
:after,
:before {
  box-sizing: border-box;
}

* {
  color: #fff;
}

.site-logo {
  width: 50%;
  padding: 5%;
}

footer {
  padding: 20px 0;
  text-align: center;
}
</style>
